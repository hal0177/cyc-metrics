const Config = require('../config');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const options = Config.blockchain;

const LowNumber = new BigNumber(0);
const HighNumber = new BigNumber(1000000000000000000);

const web3 = new Web3(options.providerPath);

const tokenAddress = options.tokenAddress;
const cyc = new web3.eth.Contract(options.tokenAbi, options.tokenAddress);

var currentBlock = 3900390; // default value is first block of cyc
var recentHour;
var i = 0;
var j = 0;

var newAmount;
var oldAmount;
var rebaseFactor;
var supply = 0;

const checkForEvents = async () => {
  console.log('check block ' + currentBlock);
  await cyc.getPastEvents('allEvents', {fromBlock: currentBlock, toBlock: currentBlock})
  .then(events => {
    events.forEach(async event => {
      await web3.eth.getBlock(currentBlock)
      .then(block => {
        var time = new Date(block.timestamp*1000);
        recentHour = String(time).slice(16, 24);
        console.log(recentHour + ' GMT+0000');
        if(event.address.toLowerCase() === tokenAddress && event.event === 'Rebase'){
          console.log('REBASE: ' + currentBlock);
          newAmount = Number(event.returnValues.newPerShareAmount);
          oldAmount = Number(event.returnValues.oldPerShareAmount);
          rebaseFactor = newAmount/oldAmount;
          console.log(newAmount + ' / ' + oldAmount + ' * ' + supply);
          supply = supply * rebaseFactor;
          console.log('new supply = ' + supply);
        }else if(event.address.toLowerCase() === tokenAddress
        && event.event === 'Transfer'
        && event.returnValues.from === '0x0000000000000000000000000000000000000000'){
          supply += event.returnValues.amount/HighNumber;
          console.log('transfer: ' + currentBlock);
        }
        
        //setTimeout(() => checkForEvents(recentBlock), 200);
      })
      .catch(err => {
        console.log(err.message);
      });
    });
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
      currentBlock++;
      j++;
    })
  }
}, 2000);
