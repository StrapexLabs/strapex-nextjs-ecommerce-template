import axios from "axios";
import * as dotenv from "dotenv";
import products from "../../../products";
dotenv.config();

const rootUrl = process.env.ENVIRONMENT === 'production'
  ? 'https://api.strapex.org'
  : 'http://localhost:3000';

let publicKey = process.env.STARKNETSTORE_ADDRESS

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(`${rootUrl}/api/sessions`);
      console.log(process.env.ENVIRONMENT)
      // Determine if shipping is required for any of the items
      const lineItems = req?.body?.items ?? [];
      const shippingRequired = lineItems.some(item => {
        console.log("item",item)
        return item.shippingRequired == true
      });

      console.log(shippingRequired)

      // Console log the body of the request
      const body = {
        lineItems: lineItems,
        successUrl: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${req.headers.origin}/cart`,
        depositAddress: publicKey,
        shipping_address_collection: shippingRequired ? 'required' : 'not_required',
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
