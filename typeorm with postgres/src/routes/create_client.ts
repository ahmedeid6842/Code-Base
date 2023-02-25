import { Router } from "express";
import { Client } from "../entities/client";
const router = Router();

router.post("/api/client", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;
  const client = await Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  }).save();
  res.send(client);
});


export { router as createClientRouter };
