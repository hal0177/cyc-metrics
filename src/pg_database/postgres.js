const pool = require('./db');

const post = async (info) => {
  info = JSON.parse(info);
  info.date = info.date.replace('T', ' ');
  info.date = info.date.replace('Z', '');
  info.date = info.date.replace('.0', '+');
  console.log(info);
  const postValues = [info.epoch, info.block_number, info.old_per_share_amount, info.new_per_share_amount, info.total_supply, info.mint_volume, info.date, info.market_cap, info.mint_count, info.timestamp];
  const write = await pool.query('INSERT INTO rebase (epoch, block_number, old_per_share_amount, new_per_share_amount, total_supply, mint_vol, date, market_cap, mint_count, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', postValues)
  .catch(err => console.log(err.message));
}

const getLatest = async () => {
  const latest = await pool.query('SELECT epoch, block_number, timestamp, total_supply FROM rebase ORDER BY epoch DESC LIMIT 1')
  .catch(err => console.log(err.message));
  return latest.rows[0];
}

exports.getLatest = getLatest;
exports.post = post;
