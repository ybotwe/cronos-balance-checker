import { Request, Response } from "express";
import { getBalance, getTokenBalance } from "../services/balanceService";

async function balance(req: Request, res: Response): Promise<void> {
  const { network, address } = req.params;
  try {
    const balance = await getBalance(network, address);
    res.send({
      address,
      network,
      balance: balance + " CRO",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching balance");
  }
}

async function tokenBalance(req: Request, res: Response): Promise<void> {
  const { network, address, tokenAddress } = req.params;
  try {
    const balance = await getTokenBalance(network, address, tokenAddress);
    res.send({
      address,
      tokenAddress,
      network,
      balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching token balance");
  }
}

export { balance, tokenBalance };