import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const rootUrl = process.env.ENVIRONMENT === 'production'
  ? 'https://api.strapex.org'
  : 'http://localhost:3000';


let publicKey = "0x6753356a19245c2cb0eec0cbf2900901ddf9e6bf2185cb32e2687cc6815f92"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(`${rootUrl}/api/sessions`);
      console.log(process.env.ENVIRONMENT)
      // Console log the body of the request
      const body = {
        lineItems: req?.body?.items ?? [],
        successUrl: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${req.headers.origin}/cart`,
        depositAddress: publicKey,
        shipping_address_collection: 'required',
        payment_type: 'onetime',
      };
      console.log(JSON.stringify(body))
      
      const {data} = await axios.post(`${rootUrl}/api/sessions`, body);

      //console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
