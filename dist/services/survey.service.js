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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyService = void 0;
const survey_1 = __importDefault(require("../model/survey"));
class SurveyService {
    static getSurvey() {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield survey_1.default.find({});
            return survey;
        });
    }
    static findSurveyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield survey_1.default.findById(id);
            return survey;
        });
    }
    static createSurvey(newsurvey) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield survey_1.default.create(newsurvey);
            return survey;
        });
    }
    static updateSurveyById(id, newsurvey) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield survey_1.default.findByIdAndUpdate(id, newsurvey);
            return survey;
        });
    }
    static deleteSurvey(id, newsurvey) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield survey_1.default.findByIdAndDelete(id, newsurvey);
            return survey;
        });
    }
    static mapSurveyResDto(model) {
        return {
            surveyId: model._id,
            pictureUrl: model.pictureUrl,
            userId: model.userId,
            displayName: model.displayName,
            statusMessage: model.statusMessage,
            answers: model.answers,
            update_at: model.update_at,
        };
    }
}
exports.SurveyService = SurveyService;
