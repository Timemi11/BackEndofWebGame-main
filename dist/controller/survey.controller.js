"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyController = void 0;
const survey_service_1 = require("../services/survey.service");
class SurveyController {
    static getSurvey(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let survey = yield survey_service_1.SurveyService.getSurvey();
            const surveys = survey.map((prevData) => {
                return survey_service_1.SurveyService.mapSurveyResDto(prevData);
            });
            return res.status(200).json(surveys);
        });
    }
    static getSurveyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let survey = yield survey_service_1.SurveyService.findSurveyById(req.params.id);
            return res.status(200).json(survey);
        });
    }
    static createSurvey(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let survey = yield survey_service_1.SurveyService.createSurvey(req.body);
            return res.status(200).json(survey);
        });
    }
    static updateSurveyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let survey = yield survey_service_1.SurveyService.updateSurveyById(req.params.id, req.body);
            return res.status(200).json(survey);
        });
    }
    static deleteSurveyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let survey = yield survey_service_1.SurveyService.deleteSurvey(req.params.id, req.body);
            return res.status(200).json(survey);
        });
    }
}
exports.SurveyController = SurveyController;
