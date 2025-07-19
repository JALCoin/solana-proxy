import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';

app.post('/solana', async (req, res) => {
  try {
    const { data } = await axios.post(SOLANA_RPC, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(200).json(data);
  } catch (error: any) {
    console.error('[RPC Proxy Error]', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Mainnet RPC Proxy failed',
      detail: error?.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Solana RPC Proxy running on port ${PORT}`);
});
