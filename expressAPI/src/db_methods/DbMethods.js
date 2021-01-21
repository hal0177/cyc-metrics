'use strict'

const pool = require('../../../src/pg_database/db');
const weekRows = 7 * 24; // rebases in a week

class DbMethods {
  async week() {
    var row = await pool.query('SELECT epoch, block_number, old_per_share_amount, new_per_share_amount, total_supply, mint_vol, date, market_cap, mint_vol, timestamp FROM rebase ORDER BY epoch DESC LIMIT ($1)', [weekRows])
    .then(res => {
      return res.rows;
    })
    return row;
  }
}

module.exports = DbMethods;