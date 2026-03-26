import express from 'express';
import Stripe from "stripe";
import 'dotenv/config'; // Add this at the top (requires: npm install dotenv)

const app = express();
app.use(express.json());

const port = process.env.PORT || 8006;

// Use environment variables instead of hardcoded strings
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { 
    apiVersion: "2020-08-27" 
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
    const amountToBeSent = parseInt(req.body.total);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountToBeSent,
            currency: "hkd",
            payment_method_types: ["card"],
        });
  
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
});