import 'dotenv/config'
import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000;

import DB from "./db";

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.includes('localhost')) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

const db = new DB();

app.get('/debtors', async (request, response) => {
  try {
    const connectingResult = await db.connect();
    console.log('connectingResult:', connectingResult);

    const debtors = await db.getDebtors();
    console.log('debtors:', debtors);

    // response.json({debtors});
    response.json(debtors);

    const disconnectingResult = await db.disconnect();
    console.log('connectingResult:', disconnectingResult);
  } catch (err) {
    console.log('err:', err);
  }
});

app.post('/', async (request, response) => {
  try {
    const connectingResult = await db.connect();
    console.log('connectingResult:', connectingResult);

    const addResult = await db.addDebtor();
    console.log('addResult:', addResult);

    // response.json({debtors});
    response.json(addResult);

    const disconnectingResult = await db.disconnect();
    console.log('connectingResult:', disconnectingResult);
  } catch (err) {
    console.log('err:', err);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));


