import { Router } from "express";
import { Client } from "../entities/client";

const router = Router();
router.delete("/api/client/:clientId", async (req, res) => {
  const { clientId } = req.params;
    const deletedClient = await Client.delete(parseInt(clientId));
    return res.send(deletedClient);
});

export { router as deleteClientRouter };
