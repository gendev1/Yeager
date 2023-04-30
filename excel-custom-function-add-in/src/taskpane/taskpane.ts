/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* global console, window, document, Excel, Office */

import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js"

// The initialize function must be run each time a new page is loaded
Office.initialize = () => {
  // document.getElementById("sideload-msg").style.display = "none";
  // document.getElementById("app-body").style.display = "flex";
  // // document.getElementById("run").onclick = run;
  document.getElementById("show-address").style.visibility = "hidden";
  // document.getElementById("parallax-1").style.visibility = "hidden";
  // document.getElementById("parallax-2").style.visibility = "hidden";
  document.getElementById("parallax-1").style.display = "none";
  document.getElementById("parallax-2").style.display = "none";
  document.getElementById("connect-wallet").onclick = connectMetaMask;
};

async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connected account:", address);
      document.getElementById("main-page-div").style.display = "none";
      document.getElementById("show-address").style.visibility = "visible";
      document.getElementById("parallax-1").style.display = "block";
      document.getElementById("parallax-2").style.display = "block";

      getBalance();
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
  } else {
    console.error("MetaMask is not installed. Please install MetaMask to continue.");
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    try {
      const balance = await provider.getBalance(contractAddress)
      document.getElementById("address-balance").innerHTML = ethers.utils.formatEther(balance) + " ETH"
      console.log(ethers.utils.formatEther("Balance: " + balance))
    } catch (error) {
      console.log(error)
    }
  } else {
    //balanceButton.innerHTML = "Please install MetaMask"
  }
}



async function run() {
  try {
    await Excel.run(async context => {
      /**
       * Insert your Excel code here
       */
      const range = context.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      range.format.fill.color = "yellow";

      await context.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
}
