const Config = require('../config');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const db = require('./pg_database/postgres.js');
const options = Config.blockchain;

const LowNumber = new BigNumber(0);
const HighNumber = new BigNumber(1000000000000000000);

const web3 = new Web3(options.providerPath);

const tokenAddress = options.tokenAddress;
const cyc = new web3.eth.Contract(options.tokenAbi, options.tokenAddress);
const zeroAddress = '0x0000000000000000000000000000000000000000';
const yuanPrice = 0.153;

const getLatest = async () => {
  await db.getLatest()
  .then(res => {
    var recentEntry = res;
    var recentBlock = Number(recentEntry.block_number); // read db, latest read block
    var rebaseFactor; // new per share amount / old per share amount
    var epochTime; // miliseconds since last rebase
    var date; // date to write to db
    var i = 0;
    var j = 0;

    // return values
    var epoch = Number(recentEntry.epoch) + 1; // read db, get latest epoch, add one so that next rebase has correct epoch no.
    var currentBlock; // block to read now
    var lastTime = Number(recentEntry.timestamp); // timestamp of latest read block
    var newAmount; // new per share amount
    var oldAmount; // old per share amount
    var supply = Number(recentEntry.total_supply); // read db, set to latest rebase total supply
    var mintVol = 0; // reset every rebase, counts the average amount minted every rebase period
    var mintCount = 0; // reset every rebase, counts average mints every rebase period
    var marketCap = 0; // dependent on supply. marketCap = supply * 0.15

    var info = {};

    const checkForEvents = async () => {
      currentBlock = recentBlock + 1;
      currentBlock%10 === 0 ? console.log(`check ${currentBlock}`):'';
      await cyc.getPastEvents('allEvents', {fromBlock: currentBlock, toBlock: currentBlock})
      .then(events => {
        events.forEach(async event => {
          await web3.eth.getBlock(currentBlock)
          .then(block => {
            if(event.address.toLowerCase() === tokenAddress && event.event === 'Rebase'){

              info.epoch = epoch;

              info.block_number = block.number;

              epochTime = (block.timestamp - lastTime);
              info.timestamp = new BigNumber(block.timestamp);

              lastTime = block.timestamp;
              date = new Date(lastTime*1000);
              info.date = date;

              newAmount = Number(event.returnValues.newPerShareAmount);
              info.new_per_share_amount = newAmount;
              oldAmount = Number(event.returnValues.oldPerShareAmount);
              info.old_per_share_amount = oldAmount;

              rebaseFactor = newAmount/oldAmount;
              
              supply = supply * rebaseFactor;
              info.total_supply = supply;

              marketCap = (supply * yuanPrice);
              info.market_cap = marketCap;

              mintVol = mintVol / epochTime * 3600;
              info.mint_volume = mintVol;
              info.mint_count = mintCount;

              db.post(JSON.stringify(info));

              mintCount = 0;
              mintVol = 0;
              epoch++;
            }else if(event.address.toLowerCase() === tokenAddress && event.event === 'Transfer' && event.returnValues.from === zeroAddress){
              supply += event.returnValues.amount/HighNumber;
              mintVol += event.returnValues.amount/HighNumber;
              mintCount++;
            }
          })
          .catch(err => {
            console.log(err.message);
          });
        });
        j++;
      })
      .catch(err => {
        console.log(err.message);
      });
    }

    setInterval(async () => {
      if(i === j){
        i++;
        await checkForEvents()
        .then(() => {
          recentBlock++;
        })
      }
    }, 50);
      })
  .catch(err => console.log(err.message));
}

getLatest();
