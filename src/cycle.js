
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

var rebaseFactor, epochTime, isNotCycling, epoch, recentBlock, lastTime, totalSupply, currentBlock, mintVol, mintCount, marketCap;

// rebase 1:  3206058   event.returnValues.epoch: 1


const incrementBn = bn => {
  return bn.plus("1");
}

const getRecentEntry = () => {
  getLatest()
  .then(latest => {
    rebaseFactor; // new per share amount / old per share amount
    epochTime; // miliseconds since last rebase
    isNotCycling = true; // stops cycleBlocks from being called during cycle

    // return values
    epoch = latest ? incrementBn(latest.epoch) : BigNumber("1"); // read db, get latest epoch, add one so that next rebase has correct epoch no.
    recentBlock = latest ? latest.blockNumber : START_HEIGHT; // read db, latest read block
    lastTime = latest ? latest.timestamp : ZERO; // read db, get timestamp of latest read block
    totalSupply = latest ? latest.totalSupply : ZERO; // read db, set to latest rebase total supply
    
    currentBlock; // block to read now
    mintVol = ZERO; // reset every rebase, counts the average amount minted every rebase period
    mintCount = ZERO; // reset every rebase, counts average mints every rebase period
    marketCap = ZERO; // dependent on supply. marketCap = supply * yuanPrice
  })
  .catch(error => console.log(`Error in getLatest: ${error.message}`));

  


  const cycleBlocks = () => {
    currentBlock = incrementBn(recentBlock).toNumber();
    currentBlock % 10 === 0 ? console.log(currentBlock) : "";
    
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
            console.log(block.number, "REBASE");
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

            postEntry(JSON.stringify(info));

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
            console.log(block.number, "Unrelated Event: ", event.event);
          }
        })
        .catch(error => console.log(`Error in web3.eth.getBlock: ${error.message}`));
      });
    })
    .catch(error => console.log(`Error in CYC.getPastEvents: ${error.message}`));

    isNotCycling = true;
  }

  setInterval(() => {
    if(isNotCycling) {
      isNotCycling = false;
      cycleBlocks();
      recentBlock = incrementBn(recentBlock);
    } else {
      console.log("waiting ...");
    }
  }, 200);
}

getRecentEntry();
