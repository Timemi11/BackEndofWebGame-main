import { Request, Response, NextFunction } from "express";
import { LineService } from "../services/line.service";

export class LineController {
  static async sendWebhook(req: Request, res: Response) {
    const body = req.body.events[0] ?? undefined;
    if (!body) return res.sendStatus(200).end();
    const result = await LineService.sendWebhook(body);
    return res.status(200).json(result); //optional return
  }

  static async sendMessageToLine(req: Request, res: Response) {
    const userId = req.params.userId;
    const body = req.body;
    const result = await LineService.sendMessageToLine(userId, body);
    return res.status(200).json(result); //optional return
  }
}
