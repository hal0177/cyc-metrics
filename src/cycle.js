
const Web3 = require("web3");
const BigNumber = require("bignumber.js");
const Config = require("./config");
const db = require("./database/query");
const getLatest = db.getLatest;
const postEntry = db.post;

const ZERO = BigNumber("0");

const ZERO_ADDRESS = Config.zeroAddress;
const BLOCK_EXPLORER = Config.blockExplorer;
const CYC_ADDRESS = Config.cycAddress;
const CYC_ABI = Config.cycAbi;
const START_HEIGHT = BigNumber(Config.startHeight);

const web3 = new Web3(BLOCK_EXPLORER);

const CYC = new web3.eth.Contract(CYC_ABI, CYC_ADDRESS);
const yuanPrice = "0.153";

// rebase 1:  3206058   event.returnValues.epoch: 1


const incrementBn = bn => {
  return bn.plus("1");
}

const getRecentEntry = () => {
  var latest;

  var rebaseFactor; // new per share amount / old per share amount
  var epochTime; // miliseconds since last rebase
  var isCycling = false;

  // return values
  var epoch = latest ? incrementBn(latest.epoch) : ZERO; // read db, get latest epoch, add one so that next rebase has correct epoch no.
  var recentBlock = latest ? latest.blockNumber : START_HEIGHT; // read db, latest read block
  var lastTime = latest ? latest.timestamp : ZERO; // read db, get timestamp of latest read block
  var totalSupply = latest ? latest.totalSupply : ZERO; // read db, set to latest rebase total supply
  
  var currentBlock; // block to read now
  var mintVol = ZERO; // reset every rebase, counts the average amount minted every rebase period
  var mintCount = ZERO; // reset every rebase, counts average mints every rebase period
  var marketCap = ZERO; // dependent on supply. marketCap = supply * 0.15


  const cycleBlocks = () => {
    currentBlock = incrementBn(recentBlock).toNumber();
    console.log(currentBlock);
    
    CYC.getPastEvents("allEvents", {
      fromBlock: currentBlock,
      toBlock: currentBlock
    })
    .then(events => {
      events.forEach(event => {
        web3.eth.getBlock(currentBlock)
        .then(block => {
          if(
            event.address === CYC_ADDRESS
            && event.event === "Rebase"
          )
          {
            console.log(block.number, "REBASE", event);
            info.epoch = epoch;

            info.blockNumber = block.number;

            epochTime = BigNumber(block.timestamp.toFixed()).minus(lastTime);
            info.timestamp = BigNumber(block.timestamp);

            lastTime = BigNumber(block.timestamp.toFixed());
            info.date = new Date(lastTime.multipliedBy("1000").toNumber());

            info.newPerShareAmount = BigNumber(event.returnValues.newPerShareAmount);
            info.oldPerShareAmount = BigNumber(event.returnValues.oldPerShareAmount);

            rebaseFactor = info.newPerShareAmount.dividedBy(info.oldPerShareAmount);
            
            totalSupply = totalSupply.multipliedBy(rebaseFactor);
            info.totalSupply = totalSupply;

            marketCap = totalSupply.multipliedBy(yuanPrice);
            info.marketCap = marketCap;

            mintVol = mintVol.dividedBy(epochTime).multipliedBy("3600");
            info.mintVolume = mintVol;
            info.mintCount = mintCount;

            // postEntry(JSON.stringify(info));

            mintVol = ZERO;
            mintCount = ZERO;
            epoch = incrementBn(epoch);
          }
          
          else if(
            event.address === CYC_ADDRESS
            && event.event === "Transfer"
            && event.returnValues.from === ZERO_ADDRESS
          )
          {
            console.log(block.number, "MINT");
            totalSupply = totalSupply.plus(web3.utils.fromWei(event.returnValues.amount));
            mintVol = mintVol.plus(web3.utils.fromWei(event.returnValues.amount));
            mintCount = mintCount.plus("1");
          }

          else {
            console.log(`${block.number}: Unrelated event (${JSON.stringify(event.event)})`);
          }
        })
        .catch(error => console.log(`Error in web3.eth.getBlock: ${error.message}`));
      });
    })
    .catch(error => console.log(`Error in CYC.getPastEvents: ${error.message}`));

    isCycling = false;
  }

  setInterval(() => {
    latest = getLatest()
    .then(() => {
      if(!isCycling) {
        isCycling = true;
        cycleBlocks();
        recentBlock = incrementBn(recentBlock);
      }
    })
    .catch(error => console.log(`Error in getLatest: ${error.message}`));
  }, 200);
}

getRecentEntry();
