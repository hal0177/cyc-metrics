module.exports = {
  blockchain: {
      tokenAbi: require("./abi/CYC.json"),
      providerPath: "https://bsc-dataseed1.binance.org/",
      chainId: 56,
      startHeight: "start height",
      address: "0x0F61a9c5C2e5af0Fbd3BDbd75300ACf9c657C5AD".toLocaleLowerCase(), // my public address
      tokenAddress: "0x4028433877f9c14764eb93d0bb6570573da2726f".toLocaleLowerCase(), // cyc token address
  },
}