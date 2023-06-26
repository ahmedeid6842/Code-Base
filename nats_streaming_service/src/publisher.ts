import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const url = process.env.NATS_URL || "http://localhost:4222";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: url,
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS service");
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (error) {
    console.log(error);
  }
});
