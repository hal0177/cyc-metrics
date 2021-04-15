# CYCinfo

This app cycles through the Binance Smart Chain blockchain and reads events to collect historic data of the total supply and market cap of CYCoin, and more. There are two programs in cycinfo, (1) Full archive node creation program that stays up to date, (2) An express API to serve data from the database to front end applications.

## CYC Archive Node

Each row in the database is one rebase (1 hour). The columns are as follows:  
epoch: The rebase number starting from zero and incrementing by one for each rebase.  
block_number: The block number the rebase happens at.  
old_per_share_amount: The old circulating supply factor.  
new_per_share_amount: The new circulating supply factor.  
total_supply: Total supply of CYCoin after rebase.  
mint_vol: Sum of all mints in the previous epoch.  
date: The date of the rebase, obtained from block.  
market_cap: The total supply multiplied by the Yuan price, hard-coded to $0.153.  
mint_count: The no. of minting operations in the previous epoch.  
timestamp: The UNIX timestamp of the rebase.  

To run this, create the database using database.sql, then:
```
npm install  
npm start
```

# expressAPI

default to 5000, but can set like this.
```
export PORT=5000
```

To run:
```
npm run expressAPI
```

Methods will be expanded, but for now, it delivers the records for the last 7 days.  
http//:localhost:5000/week

## License

[MIT](https://choosealicense.com/licenses/mit/)
