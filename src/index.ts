import express, { Request, Response } from "express";
import { ethers } from "ethers";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//Set up ether providers
const mainnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_MAIN_RPC);
const testnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_TEST_RPC);

// CRC20 Token ABI with only the necessary `balanceOf` function
const crc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

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


app.get("/token-balance/:network/:address/:tokenAddress", async (req, res) => {
  const { address, tokenAddress, network } = req.params;

  let provider;

  try {
    if (network === "testnet") {
      provider = testnetProvider;
    } else if (network === "mainnet") {
      provider = mainnetProvider;
    } else {
      return res.status(400).send("Invalid network specified");
    }

    // Create a contract instance
    const tokenContract = new ethers.Contract(tokenAddress, crc20Abi, provider);

    // Call balanceOf function
    const [balance, decimals] = await Promise.all([
      tokenContract.balanceOf(address),
      tokenContract.decimals(),
    ]);

    // Send the balance in a human-readable format (convert from Wei)
    res.send({
      address: address,
      tokenAddress: tokenAddress,
      balance: ethers.formatUnits(balance, decimals), // Assuming the token has 18 decimals
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching token balance");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
