
const BigNumber = require("bignumber.js");
const pool = require("./pool");

const postEntry = async info => {

  info.date = info.date.replace("T", " ");
  info.date = info.date.replace("Z", "");
  info.date = info.date.replace(".0", "+");

  const postValues = [
    info.epoch.toFixed(),
    info.blockNumber.toFixed(),
    info.oldPerShareAmount.toFixed(),
    info.newPerShareAmount.toFixed(),
    info.totalSupply.toFixed(),
    info.mintVolume.toFixed(),
    info.date,
    info.marketCap.toFixed(),
    info.mintCount.toFixed(),
    info.timestamp.toFixed()
  ]

  await pool.query(
    "INSERT INTO rebase (epoch, block_number, old_per_share_amount, new_per_share_amount, total_supply, mint_vol, date, market_cap, mint_count, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    postValues
  )
  .catch(error => console.log(`Error in pool.query: ${error.message}`));
}

const getLatest = () => {
  pool.query("SELECT epoch, block_number, timestamp, total_supply FROM rebase ORDER BY epoch DESC LIMIT 1")
  .then(latest => {
    return {
      epoch: BigNumber(latest.rows[0].epoch),
      blockNumber: BigNumber(latest.rows[0].block_number),
      timestamp: BigNumber(latest.rows[0].timestamp),
      totalSupply: BigNumber(latest.rows[0].total_supply)
    }
  })
  .catch(error => console.log(`Error in pool.query: ${error.message}`));
}

module.exports = {
  postEntry,
  getLatest
}
