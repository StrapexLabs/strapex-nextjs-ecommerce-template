import axios from 'axios';
import * as dotenv from "dotenv";
dotenv.config();

const rootUrl = process.env.ENVIRONMENT === 'production' ? 'https://api.strapex.org' : 'http://localhost:3000';

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    if (!id.startsWith('cs_')) {
      throw Error('Session ID is missing.');
    }

    // Make a GET request to the Strapex API to retrieve the session data
    const response = await axios.get(`${rootUrl}/api/sessions/${id}`);
    const sessionData = response.data;
    
    res.status(200).json(sessionData);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      res.status(404).json({ statusCode: 404, message: 'Session not found' });
    } else {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}