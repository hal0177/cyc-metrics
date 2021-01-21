module.exports = {
  blockchain: {
      tokenAbi: require("./abi/CYC.json"),
      providerPath: "https://bsc-dataseed1.binance.org/",
      chainId: 56,
      startHeight: "3195366",
      tokenAddress: "0x4028433877f9c14764eb93d0bb6570573da2726f".toLocaleLowerCase(), // cyc token address
      swapAddress: "0x0df8810714dde679107c01503e200ce300d0dcf6".toLocaleLowerCase(), // cyc swap address
      farmAddress: "0x6a411104ca412c8265bd8e95d91fed72006934fd".toLocaleLowerCase(), // cyc farm address
      rewardAddress: "".toLocaleLowerCase(), // cyc trading reward address
  },
}