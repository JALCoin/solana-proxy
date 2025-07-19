import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  console.log('🔵 Incoming request body:', JSON.stringify(req.body, null, 2));

  try {
    const { data } = await axios.post('https://api.mainnet-beta.solana.com', req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('🟢 Solana RPC response:', JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error: any) {
    console.error('🔴 RPC Proxy Error:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Mainnet RPC Proxy failed',
      detail: error?.response?.data || error.message,
    });
  }
});

app.listen(8080, () => {
  console.log('🚀 Solana RPC Proxy running on port 8080');
});
