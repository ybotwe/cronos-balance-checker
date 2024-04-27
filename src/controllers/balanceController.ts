import { Request, Response } from "express";
import { getBalance, getTokenBalance } from "../services/balanceService";

// Handler for fetching CRO balance
async function balance(req: Request, res: Response): Promise<void> {
  const { network, address } = req.params;
  try {
    // Retrieve balance for the address in the specified network 
    const balance = await getBalance(network, address);
    // Send response with address, network, and balance in CRO
    res.send({
      address,
      network,
      balance: balance + " CRO",
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        // Send specific error message if an Error object is caught
        res.status(500).send(`Error fetching balance: ${error.message}`);
      } else {
        // Send a generic error message if the error is not an instance of Error
        res.status(500).send("Error fetching balance");
      }
  }
}

// Handler for fetching token balance
async function tokenBalance(req: Request, res: Response): Promise<void> {
  const { network, address, tokenAddress } = req.params;
  try {
    // Retrieve token balance for the address in the specified network and symbol of token contract
    const {balance, symbol} = await getTokenBalance(network, address, tokenAddress);
    // Send response with address, token address, network, balance, and symbol
    res.send({
      address,
      tokenAddress,
      network,
      balance: balance + ` ${symbol}`,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        // Send specific error message if an Error object is caught
        res.status(500).send(`Error fetching token balance: ${error.message}`);
      } else {
        // Send a generic error message if the error is not an instance of Error
        res.status(500).send("Error fetching token balance");
      }
  }
}

// Export the balance and tokenBalance functions for external use
export { balance, tokenBalance };
