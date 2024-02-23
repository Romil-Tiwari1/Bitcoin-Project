const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000; // Using port 3000 for the server as you specified

// Use cors middleware to allow cross-origin requests from your React app running on a different port
app.use(cors({
    origin: 'http://localhost:3001' // This is the default port for React development server
}));

const API_KEY = 'c935a1f56b10a93d1ad50453839feb32c3bd0b92';
const assetId = '630629f84e66ce0983f2cd4e'; // Bitcoin's asset ID

// Ensure the endpoint variable is correctly defined within the scope it's used
const cryptoAPIsEndpoint = `https://rest.cryptoapis.io/v2/market-data/assets/assetId/${assetId}`;


// Endpoint to fetch Bitcoin info
app.get('/api/bitcoin', async (req, res) => {
    // The asset ID for Bitcoin from CryptoAPIs as per your provided API response structure
    try {
      const response = await axios.get(cryptoAPIsEndpoint, {
          headers: {
              'Content-Type': 'application/json',
              'X-API-Key': API_KEY
          }
      });

        // Extract the latest rate amount from the response
        const price = response.data.data.item.latestRate.amount;
        // Send the Bitcoin price back to the frontend
        res.json({ price });
    } catch (error) {
        console.error('API request failed', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).send('No response was received from the API');
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).send('Error setting up the request to the API');
        }
    }
});

app.get('/api/market-data', async (req, res) => {
  try {
    const response = await axios.get(cryptoAPIsEndpoint, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_KEY
        }
    });

      const { marketCapInUSD, circulatingSupply, maxSupply, 
              '1HourPriceChangeInPercentage': change1h, 
              '24HoursPriceChangeInPercentage': change1d, 
              '1WeekPriceChangeInPercentage': change1w } = response.data.data.item.specificData;

      res.json({
          marketCap: marketCapInUSD,
          supply: circulatingSupply,
          maxSupply,
          change1h,
          change1d,
          change1w
      });
  } catch (error) {
      console.error('Error fetching market data:', error.message);
      res.status(500).send('Internal Server Error');
  }
});

// Endpoint to fetch Bitcoin fees from CryptoAPIs
app.get('/api/bitcoin/fees', async (req, res) => {
  const feesEndpoint = `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/mempool/fees?context=yourExampleString`;

  try {
      const response = await axios.get(feesEndpoint, {
          headers: {
              'Content-Type': 'application/json',
              'X-API-Key': API_KEY
          }
      });

      // Extract fees data from the response
      const { fast, slow, standard, unit } = response.data.data.item;
      // Send the fees data back to the frontend
      res.json({ fast, slow, standard, unit });
  } catch (error) {
      console.error('API request failed', error);
      if (error.response) {
          res.status(error.response.status).send(error.response.data);
      } else if (error.request) {
          res.status(500).send('No response was received from the API');
      } else {
          res.status(500).send('Error setting up the request to the API');
      }
  }
});

app.get('/api/bitcoin/difficulty', async (req, res) => {
  const difficultyEndpoint = 'https://mempool.space/api/v1/difficulty-adjustment';

  try {
      const response = await axios.get(difficultyEndpoint);
      const { estimatedRetargetDate, difficultyChange, nextRetargetHeight } = response.data;

      difficultyChange = (difficultyChange / 1000).toFixed(2);

      // You might want to adjust the data structure according to your needs
      res.json({
          estimatedRetargetDate,
          difficultyChange,
          nextRetargetHeight
      });
  } catch (error) {
      console.error('API request failed', error);
      res.status(500).send('Internal Server Error');
  }
});




// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});