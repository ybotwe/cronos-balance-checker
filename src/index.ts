import express, { Express } from 'express';
require('dotenv').config();
import { balance, tokenBalance } from './controllers/balanceController';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.get('/balance/:network/:address', balance);
app.get('/token-balance/:network/:address/:tokenAddress', tokenBalance);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
