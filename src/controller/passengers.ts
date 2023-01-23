import { RequestHandler, Request, Response } from "express";
import Passengers, { passengersModel } from "../models/passengers";
import queryCondition from '../utils/query';
import { handlePassengerError, handlePassengerNotFound } from "../middleware/errorHandler";

// Create a single Passenger
export const createPassengers: RequestHandler = async (req: Request, res: Response) => {
  const newPassenger = new Passengers({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  age: req.body.age,
  passportNo: req.body.passportNo,
  country: req.body.country
  });
  try {
  const freshPassenger = await newPassenger.save();
  res.status(201).json(freshPassenger);
  } catch(err) {
    handlePassengerNotFound
  }
};

// Get all Passengers
export const getPassengers: RequestHandler = async (req: Request, res: Response) => {
  try {
    let pageSize = req.query.pageSize;
    let pageNumber = req.query.pageNumber;
    if (typeof pageSize !== 'string') {
      pageSize = "0";
    }
    if (typeof pageNumber !== 'string') {
      pageNumber = "1";
    }
    const pageSizeValue = parseInt(pageSize, 10) || 0;
    const pageNumberValue = parseInt(pageNumber, 10) || 1;
    const queries = queryCondition(req.query)
    const allPassengers =  await Passengers
      .find(queries)
      .limit(pageSizeValue)
      .skip((pageNumberValue - 1) * pageSizeValue)
      res.status(200).send(allPassengers)
    } catch (err) {
      handlePassengerNotFound
    }
  };
  
// Get a single passenger 
export const getPassenger: RequestHandler = async (req: Request, res: Response) => {
  try {
    const passengerInfo = await Passengers.findById(req.params.id);
    res.status(200).send(passengerInfo);
  } catch (err) {
    handlePassengerNotFound;
  }
};

// Update a single passenger
export const updatePassengers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPassenger = await Passengers.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({ message: "Passenger updated successfully!", data: updatedPassenger });
  } catch (err) {
    handlePassengerNotFound
  }
};

// Delete a single Passenger
export const deletePassengers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    var isDeleted = await Passengers.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete passengers");
    return res.status(200).send({ message: "passenger deleted successfully!" });
  } catch (error: any) {
    handlePassengerError
  }
};
