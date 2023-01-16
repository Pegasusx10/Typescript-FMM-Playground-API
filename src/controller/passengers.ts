import { RequestHandler } from "express";
import flights from "../models/flights";
const queryCondition = require('../utils/passengerValidation')

import passengers, { passengersModel } from "../models/passengers";

// Create a single Passenger
export const createPassengers: RequestHandler = async (req, res) => {
  try {
  const newPassenger = new passengers({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  age: req.body.age,
  passportNo: req.body.passportNo,
  country: req.body.country
  });
  const freshPassenger = await newPassenger.save();
  res.status(201).json(freshPassenger);
  } catch(err) {
  res.status(404).json("The Passenger you're looking for does not exist!");
  }
};

// Get all Passengers
export const getPassengers: RequestHandler = async (req, res) => {
try {
  const pageSize = parseInt(req.query.pageSize) || 0
  const pageNumber = parseInt(req.query.pageNumber) || 1
  const queries = queryCondition(req.query)
  const Flights = await flights
  .find(queries)
  .limit(pageSize)
  .skip(pageNumber - 1)
  // .populate('passengers')
  res.status(200).send(Flights)
  } catch (error: any) {
  return res.status(500).json(`The Passenger you are looking for does not exsist!`);
  }
};

// get a single Passenger
export const getPassenger: RequestHandler = async (req, res) => {
  try{
    const passengerInfo = await flights.findById(req.params.id)
    // .populate('enrolledCourses')
     res.send(passengerInfo)
    } catch (err) {
      res.status(404).json(`The Passenger you're looking for does not exist!`)
    }
};

// Update a single Passenger
export const updatePassengers: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    var Passengers = await passengers.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "delays updated successfully!", data: Passengers });
  } catch (error: any) {
    return res.status(500).json(`The Passenger you are looking for does not exsist!`);
  }
};

// Delete a single Passenger
export const deletePassengers: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    var isDeleted = await passengers.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete todo");
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json(`The Passenger you are looking for does not exsist!`);
  }
};

