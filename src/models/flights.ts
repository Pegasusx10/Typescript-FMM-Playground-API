import * as mongoose from "mongoose";
import { Model } from "mongoose";

type flightsType = flightsModel & mongoose.Document;
export interface flightsModel {
    flightNumber: {
    type: Number,
    required: true,
  };
    tailNumber: {
    type: String,
    required: true,
  };
    destination: {
    type: string,
    required: true,
  };
    origin: {
    type: string,
    required: true,
  };
    iropStatus: {
    type: string,
    required: true,
  };
    totalSeats: {
    type: Number,
    required: true,
  };
    passengers: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'passengers',
      required: true,
    }];
    hasBusinessClass: {
    type: boolean,
    required: true,
  };
    delay: [{
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'delays',
    required: true,
    }];
}
const flightsSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
      },
        tailNumber: {
        type: String,
        required: true,
      },
        destination: {
        type: String,
        required: true,
      },
        origin: {
        type: String,
        required: true,
      },
        iropStatus: {
        type: String,
        required: true,
      },
        totalSeats: {
        type: Number,
        required: true,
      },
        passengers: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'passengers',
        required: true,
      }],
        hasBusinessClass: {
        type: Boolean,
        required: true,
      },
      delay: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'delays',
      required: true,
      }],
});
const Flights: Model<flightsType> = mongoose.model < flightsType > ("Flights", flightsSchema);
export default Flights;
