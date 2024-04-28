import express, { Express } from "express";
require("dotenv").config();
import { balance, tokenBalance } from "./controllers/balanceController";
import { apiKeyAuth } from "./middleware/basicAuth";

// Create an Express application
const app: Express = express();
// Define the port to run the server on
const PORT: string | number = process.env.PORT || 3000;

// Defined routes for fetching balance and token balance
app.get("/balance/:network/:address", apiKeyAuth, balance);
app.get(
  "/token-balance/:network/:address/:tokenAddress",
  apiKeyAuth,
  tokenBalance
);

// Start server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
