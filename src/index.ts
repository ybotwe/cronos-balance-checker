import express, { Request, Response } from "express";
import { ethers } from "ethers";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//Set up ether providers
const mainnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_MAIN_RPC);
const testnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_TEST_RPC);

app.get("/balance/:network/:address", async (req, res) => {
  const { network, address } = req.params;
  try {
    let balance;
    if (network === "testnet") {
      balance = await testnetProvider.getBalance(address);
    } else if (network === "mainnet") {
      balance = await mainnetProvider.getBalance(address);
    } else {
      return res.status(400).send("Invalid network specified");
    }

    res.send({
      address: address,
      network: network,
      balance: ethers.formatEther(balance) + " CRO",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching balance");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
