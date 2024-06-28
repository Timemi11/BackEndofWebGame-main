import { Request, Response, NextFunction } from "express";
import { LineService } from "../services/line.service";


export class LineController {
  static async sendWebhook(req: Request, res: Response) {
    const body = req.body.events[0] ?? undefined;
    if (!body) return res.sendStatus(200).end();
    const userId = body.source?.userId; //เช็คนี้ หลัง webhook ส่ง body หรือ object  มา

    try {
      const result = await new LineService().sendWebhook(body, userId);
      return res.sendStatus(200).end();

    } catch (error) {
      console.error("Error in sendWebhook:", error);
      return res.status(500).send("Error in Webhook");
    }
  }
  static async sendMessageToLine(req: Request, res: Response) {
    const userId = req.params.userId;

    const body = req.body;

    try {
      const result = await new LineService().sendMessageToLine(userId, body);
      return res.status(200).json({ message: "Message sent successfully", result });

    } catch (error) {
      console.error("Error in sendMessageToLine:", error);
      return res.status(500).json({ error: "Failed to send message" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    const userId = req.body.userId;

    try {
      const result = await new LineService().getProfileByUserId(userId);
      return res.status(200).json(result);
      
    } catch (error) {
      console.error("Error in getProfile:", error);
      return res.status(500).json({ error: "Failed to get profile" });
    }
  }
}
