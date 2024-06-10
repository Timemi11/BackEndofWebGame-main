import { Request, Response, NextFunction } from "express";
import { SurveyService } from "../services/survey.service";

export class SurveyController {
  static async getSurvey(req: Request, res: Response, next: NextFunction) {
    let survey = await SurveyService.getSurvey();
    const surveys = survey.map((prevData) => {
      return SurveyService.mapSurveyResDto(prevData);
    });
    return res.status(200).json(surveys);
  }

  static async getSurveyById(req: Request, res: Response, next: NextFunction) {
    let survey = await SurveyService.findSurveyById(req.params.id);
    return res.status(200).json(survey);
  }

  static async createSurvey(req: Request, res: Response, next: NextFunction) {
    let survey = await SurveyService.createSurvey(req.body);
    return res.status(200).json(survey);
  }

  static async updateSurveyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let survey = await SurveyService.updateSurveyById(req.params.id, req.body);
    return res.status(200).json(survey);
  }

  static async deleteSurveyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let survey = await SurveyService.deleteSurvey(req.params.id, req.body);
    return res.status(200).json(survey);
  }
}
