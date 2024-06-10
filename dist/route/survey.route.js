"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const survey_controller_1 = require("../controller/survey.controller");
const route = (0, express_1.Router)();
route.get("/surveys", survey_controller_1.SurveyController.getSurvey);
route.get("/surveys/:id", survey_controller_1.SurveyController.getSurveyById);
route.post("/surveys", survey_controller_1.SurveyController.createSurvey);
route.put("/surveys/:id", survey_controller_1.SurveyController.updateSurveyById);
route.delete("/surveys/:id", survey_controller_1.SurveyController.deleteSurveyById);
exports.default = route;