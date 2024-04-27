import { ethers } from "ethers";

// Define the structure of a token balance object
interface TokenBalance {
  balance: string;
  symbol: string;
}

// Initialize providers for mainnet and testnet
const mainnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_MAIN_RPC);
const testnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_TEST_RPC);

// Define the ABI for CRC20 token
const crc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

// Retrieve the CRO balance of an address
async function getBalance(network: string, address: string): Promise<string> {
  const provider = network === "testnet" ? testnetProvider : mainnetProvider;
  
  // Validate the address format
  if (!ethers.isAddress(address)) {
    throw new Error("Invalid address format");
  }
  
  try {
    // Get the balance from the provider and format it in by converting from wei to CRO
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error getting balance:", error);
    throw new Error("Failed to connect to the network provider.");
  }
}

// Retrieve the token balance of an address
async function getTokenBalance(
  network: string,
  address: string,
  tokenAddress: string
): Promise<TokenBalance> {
  const provider = network === "testnet" ? testnetProvider : mainnetProvider;
  
  // Validate the address and token address formats
  if (!ethers.isAddress(address)) {
    throw new Error("Invalid address format");
  }
  if (!ethers.isAddress(tokenAddress)) {
    throw new Error("Invalid token address format");
  }
  
  try {
    // Create a contract instance for the token and fetch balance, decimals, and symbol
    const tokenContract = new ethers.Contract(tokenAddress, crc20Abi, provider);
    const [balance, decimals, symbol] = await Promise.all([
      tokenContract.balanceOf(address),
      tokenContract.decimals(),
      tokenContract.symbol(),
    ]);
    
    // Format the balance using decimals and return the token balance object
    const balanceFormatted = ethers.formatUnits(balance, decimals);
    return { balance: balanceFormatted, symbol };
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw new Error("Failed to fetch token data or invalid contract address.");
  }
}

// Export the functions for retrieving balances
export { getBalance, getTokenBalance };
