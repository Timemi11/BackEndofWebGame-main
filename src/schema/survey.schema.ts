import mongoose, { Schema } from "mongoose";

export const SurveySchema: Schema = new mongoose.Schema({
  pictureUrl: String,
  userId: String,
  displayName: String,
  statusMessage: String,
  answers: [{ value: { type: [String], default: [] } }],
  update_at: { type: Date, default: Date.now },
});
