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

    // response.json({debtors});
    response.json(debtors);

    const disconnectingResult = await db.disconnect();
    console.log('disconnectingResult:', disconnectingResult);
  } catch (err) {
    console.log('Error during getDebtors:', err);
  }
});

app.delete('/debtors', (request, response) => {
  console.log('delete request:', request.query.id)
  response.json({"response": "ok"});
})

app.post('/', async (request, response) => {
  try {
    const connectingResult = await db.connect();
    console.log('connectingResult:', connectingResult);

    const addDebtorResult = await db.addDebtor();
    console.log('addResult:', addDebtorResult);

    // response.json({debtors});
    response.json(addDebtorResult);

    const disconnectingResult = await db.disconnect();
    console.log('disconnectingResult:', disconnectingResult);
  } catch (err) {
    console.log('Error during addDebtor:', err);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));


