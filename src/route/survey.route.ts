import { Router } from "express";
import { SurveyController } from "../controller/survey.controller";

const route = Router();

route.get("/surveys", SurveyController.getSurvey);
route.get("/surveys/:id", SurveyController.getSurveyById);
route.post("/surveys", SurveyController.createSurvey);
route.put("/surveys/:id", SurveyController.updateSurveyById);
route.delete("/surveys/:id", SurveyController.deleteSurveyById);

export default route;
