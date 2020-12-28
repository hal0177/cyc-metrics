module.exports = {
    blockchain: {
        tokenAbi: require("./abi/token.json"),
        exchangeAbi: require("./abi/exchange.json"),
        providerType: "http",
        providerPath: "https://bsc-dataseed1.binance.org/",
        chainId: 32659,
        bscId: 56,
        startHeight: 2545943,
        cycle: 100,
        gasPrice: "1", // gwei
        privateKey: "your private key",
        address: "0x0F61a9c5C2e5af0Fbd3BDbd75300ACf9c657C5AD".toLocaleLowerCase(), // my public address
        tokenAddress: "0x4028433877f9c14764eb93d0bb6570573da2726f".toLocaleLowerCase(), // cyc token address
        exchangeAddress: "0x049DdC3CD20aC7a2F6C867680F7E21De70ACA9C3".toLocaleLowerCase(), // fsn/any exchange address
    },
    charge: 0.004,
    delay: 30
}