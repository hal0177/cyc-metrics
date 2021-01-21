# CYCinfo

This app cycles through the bsc blocks and uses CYC events to collect historic data of the total supply, market cap and more. There are two programs in cycinfo, (1) Full archive node creation program and stays up to date, (2) An express API to serve data to the database to front end applications.

## CYC Archive Node

Each row in the database is one rebase (1 hour). The columns are as follows:
epoch       The rebase number starting from zero and incrementing by one for each rebase.
block_number         The block number the rebase happens at.
old_per_share_amount        The old circulating supply factor.
new_per_share_amount        The new circulating supply factor.
total_supply        Total supply of CYC after rebase.
mint_vol       Sum of all mints in the previous epoch.
date        The date of the rebase ascii.
market_cap     The total supply multiplied by the Yuan price, hard-coded to $0.153.
mint_count      The no. of minting operations in the previous epoch.
timestamp       The UNIX time of the rebase.

To run this:
create the database using database.sql
npm install
npm start

# expressAPI

export PORT=5000    # default to 5000, but can set like this.

To run, use npm run expressAPI

Methods will be expanded, but for now, it delivers the records for the last 7 days.
http//:localhost:5000/week

## License

[MIT](https://choosealicense.com/licenses/mit/)