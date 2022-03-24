# Dapp-HardHat-Template

## Setup Backend
- ```cd backend```
- ```npm install```
- Add contract in contract folder (Note: Solidity version should be ^0.8.4)
- Add values to `.env` file
- Add .env to `.gitignore` file
#### Testing
- In ```test/test.js``` file change contract and instance name and write testcases
-  use following command for Testing
```
npx hardhat test
```
#### Deployment 
- In ```scripts/deploy.js``` file change contract name
-  use following command for Deployment
```
npx hardhat run scripts/deploy.js --network rinkeby
```
- copy deployed contract address, will required for frontend.
***
## Setup Frontend
- ```cd client```
- ```npm install```
- Add values to `.env` file
- Add .env to `.gitignore` file
- Copy the `abi` value from a json file located in 
</br>
```backend/artifacts/contract/contract-name.sol/contract-name.json ```
- Add that `abi` value to `helper.js` file
