import SurveyModel from "../model/survey";
import SurveyResponseDto from "../dto/survey.dto";

export class SurveyService {
  static async getSurvey() {
    const survey = await SurveyModel.find({});
    return survey;
  }

  static async findSurveyById(id: string) {
    const survey = await SurveyModel.findById(id);
    return survey;
  }

  static async createSurvey(newsurvey: any) {
    const survey = await SurveyModel.create(newsurvey);
    return survey;
  }
  static async updateSurveyById(id: string, newsurvey: any) {
    const survey = await SurveyModel.findByIdAndUpdate(id, newsurvey);



    return survey;
  }
  static async deleteSurvey(id: string, newsurvey: any) {
    const survey = await SurveyModel.findByIdAndDelete(id, newsurvey);
    return survey;
  }

  static mapSurveyResDto(model: any): SurveyResponseDto {
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
