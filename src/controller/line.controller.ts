import { Request, Response, NextFunction } from "express";
import { LineService } from "../services/line.service";

export class LineController {
  static async sendWebhook(req: Request, res: Response) {
    const body = req.body.events[0] ?? undefined;
    const userId = body.source?.userId;
    console.log(body);
    if (!body) return res.sendStatus(200).end();
    try {
      const result = await LineService.sendWebhook(body,userId);
       res.status(200).send(result);
    } catch (error) {
      console.error("Error in sendWebhook:", error);
       res.status(500).send("Error in Webhook");
    }
  }

  static async sendMessageToLine(req: Request, res: Response) {
    const userId = req.params.userId;
    console.log(userId);
    const body = req.body;
    console.log(body);
    try {
      const result = await LineService.sendMessageToLine(userId, body);
       res
        .status(200)
        .json({ message: "Message sent successfully", result });
    } catch (error) {
      console.error("Error in sendMessageToLine:", error);
       res.status(500).json({ error: "Failed to send message" });
    }
  }
}
