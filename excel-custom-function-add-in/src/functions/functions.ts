/* global clearInterval, console, setInterval, fetch , Headers, Promise, Buffer, window , document, Excel, Office*/
import { ethers } from "ethers";

// ABI
import erc20ABI from "./abi/ERC20.json";
import aavePool from "./abi/AavePool.json";

let signer: ethers.providers.JsonRpcSigner | undefined;

/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function add(first: number, second: number): number {
  return first + second + 1;
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
export function logMessage(message: string): string {
  console.log(message);

  return message;
}

/**
 * Writes a message to console.log().
 * @customfunction LOG1
 * @param message String to write.
 * @returns String to write.
 */
export function logMessages(message: string): string {
  console.log(message);

  return message;
}

/**
 * Get balances of all tokens in a wallet. using covalent api
 * @customfunction GETBALANCES
 * @param address String to write.
 * @returns string to write.
 */
export async function getBalances(address) {
  const covalentApiUrl = "https://api.covalenthq.com/v1/1/address"; // 1 for Ethereum Mainnet
  const apiKey = "cqt_rQxfQCjVyFxFb4RW8VGhHg7f4dy7";
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async function(resolve, reject) {
    try {
      const response = await fetch(`${covalentApiUrl}/${address}/balances_v2/?key=${apiKey}`);
      const jsonResponse = await response.json();
      const items = jsonResponse.data.items;

      const balances = items
        .map(
          item =>
            `${item.contract_name}: ${item.balance / Math.pow(10, item.contract_decimals)} ${
              item.contract_ticker_symbol
            }`
        )
        .join("\n");

      resolve(balances);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

/**
 * Get balances of all tokens in a wallet. using covalent api
 * @customfunction CONNECTTOMETAMASKß
 */
export async function connectToMetaMask() {
  if (typeof window.ethereum === "undefined") {
    connectToMetaMask();
    // throw new Error("MetaMask not found. Please install the MetaMask extension.");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
}

// ERC 20 Functions

/**
 * Get Balance of a erc20 token
 * @customfunction GETERC20BALANCE
 * @param tknAddr address of the token
 * @returns number of tokens
 */
export async function getERC20Balance(tknAddr) {
  if (typeof signer === "undefined") {
    connectToMetaMask();
    // throw new Error("Please connect to MetaMask first.");
  }

  const tokenContract = new ethers.Contract(tknAddr, erc20ABI, signer);

  const balance = await tokenContract.balanceOf(await signer.getAddress());

  return balance / Math.pow(10, 18);
}

/**
 * Approve a erc20 token
 * @customfunction APPROVEERC20
 * @param tknAddr address of the token
 * @param spender address of the spender
 * @param amount amount to approve
 * @returns transaction hash
 */
export async function approveERC20(tknAddr, spender, amount) {
  if (typeof signer === "undefined") {
    connectToMetaMask();
    // throw new Error("Please connect to MetaMask first.");
  }

  const tokenContract = new ethers.Contract(tknAddr, erc20ABI, signer);
  const value = ethers.utils.parseUnits(amount, 18); // Assuming 18 decimals for the token
  const tx = await tokenContract.approve(spender, value);

  return tx.hash;
}

/**
 * Transfer a erc20 token
 * @customfunction TRANSFERERC20
 * @param tknAddr address of the token
 * @param to address of the receiver
 * @param amount amount to transfer
 * @returns transaction hash
 */
export async function transferERC20(tknAddr, to, amount) {
  if (typeof signer === "undefined") {
    throw new Error("Please connect to MetaMask first.");
  }

  const tokenContract = new ethers.Contract(tknAddr, erc20ABI, signer);
  const value = ethers.utils.parseUnits(amount, 18); // Assuming 18 decimals for the token
  const tx = await tokenContract.transfer(to, value);

  return tx.hash;
}

// // AAVE Functions

// async function getHealthAndCollateralData(aaveContractAddress: string) {
//   if (typeof signer === "undefined") {
//     console.log("Signer is undefined.");
//     connectToMetaMask();
//     // throw new Error("Please connect to MetaMask first.");
//   }
//   console.log("Signer is defined.");
//   const aaveContract = new ethers.Contract(aaveContractAddress, aavePool, signer);
//   const data = await aaveContract.getUserAccountData(signer.getAddress());
//   console.log(data);

//   return {
//     totalCollateralETH: data.totalCollateralETH,
//     totalDebtBase: data.totalDebtBase,
//     availableBorrowsBase: data.availableBorrowsBase,
//     currentLiquidationThreshold: data.currentLiquidationThreshold,
//     ltv: data.ltv,
//     healthFactor: data.healthFactor
//   };
// }

// /**
//  * Retrieves health and collateral data for a user from Aave.
//  * @customfunction GET_AAVE_DATA
//  * @param userAddress Ethereum address of the user.
//  * @returns A 2D array containing headings and values.
//  */
// export async function getAaveData(userAddress: string) {
//   const data = await getHealthAndCollateralData(userAddress);

//   const result = [
//     ["totalCollateralETH", data.totalCollateralETH.toString()],
//     ["totalDebtBase", data.totalDebtBase.toString()],
//     ["availableBorrowsBase", data.availableBorrowsBase.toString()],
//     ["currentLiquidationThreshold", data.currentLiquidationThreshold.toString()],
//     ["ltv", data.ltv.toString()],
//     ["healthFactor", data.healthFactor.toString()]
//   ];

//   return result;
// }
