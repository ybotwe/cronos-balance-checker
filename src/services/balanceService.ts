import { ethers } from 'ethers';

// Ether providers setup
const mainnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_MAIN_RPC);
const testnetProvider = new ethers.JsonRpcProvider(process.env.CRONOS_TEST_RPC);

// CRC20 token ABI
const crc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// Get CRO balance of an address
async function getBalance(network: string, address: string): Promise<string> {
  const provider = network === 'testnet' ? testnetProvider : mainnetProvider;
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    throw new Error('Failed to connect to the network provider.');
  }
}

// Get token balance of an address
async function getTokenBalance(network: string, address: string, tokenAddress: string): Promise<string> {
  const provider = network === 'testnet' ? testnetProvider : mainnetProvider;
  try {
    const tokenContract = new ethers.Contract(tokenAddress, crc20Abi, provider);
    const [balance, decimals] = await Promise.all([
      tokenContract.balanceOf(address),
      tokenContract.decimals(),
    ]);
    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw new Error('Failed to fetch token data or invalid contract address.');
  }
}

export { getBalance, getTokenBalance };
