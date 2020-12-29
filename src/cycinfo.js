const Config = require('../config');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');

const LowNumber = new BigNumber(0);
const HighNumber = new BigNumber(100000000000000000);

function setProvider(options){
  const provider = new Web3(options.providerPath);
  return provider;
}

const web3 = setProvider(Config.blockchain);

async function latestBlock(){
  return await web3.eth.getBlock('latest')
  .then(block => {
    console.log(block.number);
  })
  .catch(err => {
    console.log('Catch err ' + err.message);
  })
}

var blockHeight = latestBlock();
