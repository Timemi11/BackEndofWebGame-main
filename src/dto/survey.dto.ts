export default class SurveyResponseDto {
  surveyId?: string;
  pictureUrl?: string;
  userId?: string;
  displayName?: string;
  statusMessage?: string;
  answers?: Answers[];
  update_at?: Date;
}

class Answers {
  answerId?: string;
  value?: string[];
}
