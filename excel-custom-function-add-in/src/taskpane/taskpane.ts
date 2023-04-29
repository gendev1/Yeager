/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* global console, document, Excel, Office */
import { ethers } from "ethers";

// The initialize function must be run each time a new page is loaded
Office.initialize = () => {
  document.getElementById("sideload-msg").style.display = "none";
  document.getElementById("app-body").style.display = "flex";
  // document.getElementById("run").onclick = run;
  document.getElementById("connect-wallet").onclick = connectMetaMask;
};

async function connectMetaMask() {
  // eslint-disable-next-line no-undef
  if (typeof window.ethereum !== "undefined") {
    try {
      // eslint-disable-next-line no-undef
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // eslint-disable-next-line no-undef
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connected account:", address);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
  } else {
    console.error("MetaMask is not installed. Please install MetaMask to continue.");
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
