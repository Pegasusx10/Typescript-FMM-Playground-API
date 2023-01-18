import { RequestHandler } from "express";
import Passengers from "../models/passengers";
const queryCondition = require('../utils/queryLogic')


// Create a Passenger
export const createPassengers: RequestHandler = async (req, res) => {
  const newPassengers = new Passengers({
    flightNumber: req.body.flightNumber,
    tailNumber: req.body.tailNumber,
    origin: req.body.origin,
    destination: req.body.destination,
    iropStatus: req.body.iropStatus,
    totalSeats: req.body.totalSeats,
    passengers: req.body.passengers,
    hasBusinessClass: req.body.hasBusinessClass,
    delay: req.body.delay,
  });
  try {
    const freshPassengers = await newPassengers.save();
    res.status(201).send(freshPassengers);
  } catch (err) {
    res.status(404).send({ message: `The Flight you're looking for does not exist!` });
  }
};

// Get all Passengers
export const getPassengers: RequestHandler = async (req, res) => {
  try {
    let pageSize = req.query.pageSize;
    let pageNumber = req.query.pageNumber;
    if (typeof pageSize !== 'string') {
      pageSize = "0";
    };
    if (typeof pageNumber !== 'string') {
      pageNumber = "1";
    };
    const pageSizeValue = parseInt(pageSize, 10) || 0;
    const pageNumberValue = parseInt(pageNumber, 10) || 1;
    const queries = queryCondition(req.query)
    const passenger = Passengers
      .find(queries)
      .limit(pageSizeValue)
      .skip((pageNumberValue - 1) * pageSizeValue)
      // .populate('passengers')
      // .populate('delays')
      res.status(200).send(passenger)
    } catch (err) {
      res.status(404).send({ message: "The Flight you are looking for does not exist!" });
    }
  };  

// Get a single Passenger
export const getPassenger: RequestHandler = async (req, res) => {
  try{
    const onePassenger = Passengers.findById(req.params.id)
    // .populate('passengers')
    // .populate('delays');
    res.status(200).send(onePassenger);
  } catch (err) {
    res.status(404).send({ message: `The Flight you're looking for does not exist!` });
  }
};

// Update flight by ID
export const updatePassengers: RequestHandler = async (req, res) => {
  try{
    const updatedPassenger = Passengers.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).send(updatedPassenger);
  } catch (err) {
    res.status(500).send({ message: `An error occurred while updating the record` });
  }
};

// Delete a single Flight
export const deletePassengers: RequestHandler = async (req, res) => {
  try {
    const flightId = Passengers.findByIdAndDelete(req.params.id)
    res.send(`The Flight has been deleted from database successfully!`)
  } catch (err) {
    res.status(404).send(`The Flight you're looking for does not exist!`)
  }
};
