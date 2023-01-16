import { RequestHandler } from "express";
import flights from "../models/flights";

import passengers, { passengersModel } from "../models/passengers";

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

export const getPassengers: RequestHandler = async (req, res) => {
  try {
    var Passengers = await passengers.find({});
    return res.status(200).json({ message: "All passengers!", data: Passengers });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPassenger: RequestHandler = async (req, res) => {
  try{
    const passengerInfo = await flights.findById(req.params.id)
    // .populate('enrolledCourses')
     res.send(passengerInfo)
    } catch (err) {
      res.status(404).json(`The Passenger you're looking for does not exist!`)
    }
  }

export const updatePassengers: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    var Passengers = await passengers.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "delays updated successfully!", data: Passengers });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePassengers: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    var isDeleted = await passengers.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete todo");
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

