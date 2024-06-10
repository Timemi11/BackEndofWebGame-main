import mongoose, { Document } from "mongoose";
import { SurveySchema } from "../schema/survey.schema";

export interface Answer {
  value: string;
}

export interface ISurvey extends Document {
  userId: string;
  pictureUrl: string;
  displayName: string;
  statusMessage: string;
  answers: Answer[];
  updated_at: Date;
}

export default mongoose.model<ISurvey>("Survey", SurveySchema);
