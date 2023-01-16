import * as mongoose from "mongoose";
import { Model } from "mongoose";

type passengersType = passengersModel & mongoose.Document;
export interface passengersModel {
    firstName: {
    type: string,
    required: true,
  };
    lastName: {
    type: String,
    required: true,
  };
    age: {
    type: string,
    required: true,
  };
    passportNo: {
    type: Number,
    required: true,
  };
    country: {
    type: string,
    required: true,
  };
}

const passengersSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true,
  },
  lastName: {
      type: String,
      required: true,
  },
  age: {
      type: String,
      required: true,
      validate: {
          validator: function(value: any) {
              return value < 90;
          },
          message: 'Age must be below 90.'
      }
  },
  passportNo: {
      type: Number,
      required: true,
  },
  country: {
      type: String,
      required: true,
  }
});

const passengers: Model<passengersType> = mongoose.model < passengersType > ("passengers", passengersSchema);
export default passengers;