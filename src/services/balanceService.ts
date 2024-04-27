import { ethers } from "ethers";

interface TokenBalance {
  balance: string;
  symbol: string;
}

// Ether providers setup
const mainnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_MAIN_RPC);
const testnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_TEST_RPC);

// CRC20 token ABI
const crc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

// Get CRO balance of an address
async function getBalance(network: string, address: string): Promise<string> {
  const provider = network === "testnet" ? testnetProvider : mainnetProvider;
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error getting balance:", error);
    throw new Error("Failed to connect to the network provider.");
  }
}

// Get token balance of an address
async function getTokenBalance(
  network: string,
  address: string,
  tokenAddress: string
): Promise<TokenBalance> {
  const provider = network === "testnet" ? testnetProvider : mainnetProvider;
  try {
    const tokenContract = new ethers.Contract(tokenAddress, crc20Abi, provider);
    const [balance, decimals, symbol] = await Promise.all([
      tokenContract.balanceOf(address),
      tokenContract.decimals(),
      tokenContract.symbol(),
    ]);
    const balanceFormatted = ethers.formatUnits(balance, decimals);
    return { balance: balanceFormatted, symbol };
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw new Error("Failed to fetch token data or invalid contract address.");
  }
}

export { getBalance, getTokenBalance };
