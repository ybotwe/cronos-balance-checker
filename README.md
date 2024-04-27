# Setting Up and Running the Application

1. **Installation:**

   - Clone the repository and navigate to the project directory.
   - Run `npm install` to install dependencies.

2. **Environment Setup:**

   - Create a `.env` file in the root directory with the following variables:

   ```
     CRONOS_MAIN_RPC=<mainnet_rpc_url>
     CRONOS_TEST_RPC=<testnet_rpc_url>
     PORT=<desired_port_number>
   ```

3. **Running the Application:**
   - To run in development mode: `npm run dev`
   - To build the project: `npm run build`
   - To start the server: `npm start`

# Testing API Endpoints

1. **Balance Endpoint:**

   - Endpoint: `GET /balance/:network/:address`
   - Example Request: `curl http://localhost:3000/balance/testnet/0x123456789`
   - Example Response:
     ```
     {
     "address": "0x123456789",
     "network": "testnet",
     "balance": "10.5 CRO"
     }
     ```

2. **Token Balance Endpoint:**
   - Endpoint: `GET /token-balance/:network/:address/:tokenAddress`
   - Example Request: `curl http://localhost:3000/token-balance/mainnet/0x987654321/0xabcde123`
   - Example Response:
     ```
     {
     "address": "0x987654321",
     "tokenAddress": "0xabcde123",
     "network": "mainnet",
     "balance": "500.25 USDT"
     }
     ```
