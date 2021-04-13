CREATE DATABASE cycinfo;

CREATE TABLE rebase (
  epoch BIGINT PRIMARY KEY,
  block_number BIGINT,
  old_per_share_amount BIGINT,
  new_per_share_amount BIGINT,
  total_supply DOUBLE PRECISION,
  mint_vol DOUBLE PRECISION,
  date TIMESTAMP WITH TIME ZONE,
  market_cap DOUBLE PRECISION,
  mint_count BIGINT,
  timestamp BIGINT
);
