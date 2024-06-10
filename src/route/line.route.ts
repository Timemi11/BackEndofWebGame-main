import { Router } from "express";
import { LineController } from "../controller/line.controller";

const route = Router();

route.post("/webhook", LineController.sendWebhook);
route.post("/sent-gameproduct/:userId", LineController.sendMessageToLine);

export default route;
