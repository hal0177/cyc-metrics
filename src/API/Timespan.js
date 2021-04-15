"use strict"

const pool = require("../database/pool");

class Timespan {

  async day() {
    const latest = await pool.query("SELECT epoch, block_number, old_per_share_amount, new_per_share_amount, total_supply, mint_vol, date, market_cap, mint_vol, timestamp FROM rebase ORDER BY epoch DESC LIMIT ($1)",
    [24])
    .catch(error => console.log(`Error in time span day: ${error.message}`));
    return latest.rows;
  }

  async week() {
    const latest = await pool.query("SELECT epoch, block_number, old_per_share_amount, new_per_share_amount, total_supply, mint_vol, date, market_cap, mint_vol, timestamp FROM rebase ORDER BY epoch DESC LIMIT ($1)",
    [7 * 24])
    .catch(error => console.log(`Error in time span week: ${error.message}`));
    return latest.rows;
  }
}

module.exports = Timespan;