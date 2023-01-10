import * as mongoose from "mongoose";
import { Model } from "mongoose";

type delaysType = delaysModel & mongoose.Document;
export interface delaysModel {
  code: {
    type: Number,
    required: true,
  };
  reason: {
    type: String,
    required: true,
  };
  time: {
    type: Number,
    required: true,
  }
}
const delaysSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  }
});
const delays: Model<delaysType> = mongoose.model < delaysType > ("delays", delaysSchema);
export default delays;