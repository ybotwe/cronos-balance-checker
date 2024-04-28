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
     API_KEY=<your_api_key>
   ```

3. **Running the Application:**
   - To run in development mode: `npm run dev`
   - To build the project: `npm run build`
   - To start the server: `npm start`

# Testing API Endpoints

## Using CURL

1. **Balance Endpoint:**

   - Endpoint: `GET /balance/:network/:address`
   - Network parameter can be either `mainnet` or `testnet`.
   - Example Request: `curl -H "x-api-key: your_api_key" http://localhost:3000/balance/testnet/0x123456789`
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
   - Example Request: `curl -H "x-api-key: your_api_key" http://localhost:3000/token-balance/mainnet/0x987654321/0xabcde123`
   - Example Response:
     ```
     {
     "address": "0x987654321",
     "tokenAddress": "0xabcde123",
     "network": "mainnet",
     "balance": "500.25 USDT"
     }
     ```

## Using Postman

To test the API using Postman:

1. **Open Postman**:

- Start by launching the Postman application on your device.

2. **Create a New Request**:

- Click on the "New" button and select "HTTP Request".

3. **Set Up Request Details**:

- For the URL, input `http://localhost:3000/balance/<network>/<address_of_choice>` for testing the balance endpoint or the respective URL for other endpoints.
- Network parameter can be either `mainnet` or `testnet`.
- Set the method to `GET`.
- Add the header `x-api-key` with the value of your API key you set in the `.env` file.

4. **Send the Request**:

- Click the "Send" button to execute the request.
- Review the response in the lower section of the Postman interface.

5. **Modify and Test Different Endpoints**:

- Change the URL and parameters as needed to test different endpoints and cases.
