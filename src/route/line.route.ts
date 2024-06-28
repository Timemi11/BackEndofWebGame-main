import { Router } from "express";
import { LineController } from "../controller/line.controller";
import { lineMiddleware } from "../middleware/line.middleware";

const route = Router();

route.post("/webhook", LineController.sendWebhook);
route.post("/sent-gameproduct/:userId", LineController.sendMessageToLine);
route.post("/get-profile", lineMiddleware);

export default route;
