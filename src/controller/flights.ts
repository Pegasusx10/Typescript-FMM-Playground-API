import { RequestHandler } from "express";
import Flights, { flightsModel } from "../models/flights";
const queryCondition = require('../utils/flightValidation')


// Create a flight
export const createFlights: RequestHandler = async (req, res) => {
  const newFlight = new Flights({
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
    const freshFlights = await newFlight.save() as flightsModel;
    res.status(201).send(freshFlights);
  } catch (err) {
    res.status(404).send({ message: `The Flight you're looking for does not exist!` });
  }
};

// Get all flights
export const getFlights: RequestHandler = async (req, res) => {
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
    const flight = Flights
      .find(queries)
      .limit(pageSizeValue)
      .skip((pageNumberValue - 1) * pageSizeValue)
      .populate('passengers')
      .populate('delays')
      res.status(200).send(Flight)
    } catch (err) {
      res.status(404).send({ message: "The Flight you are looking for does not exist!" });
    }
  };  

// Get a single flight 
export const getFlight: RequestHandler = async (req, res) => {
  try{
    const flight = Flights.findById(req.params.id)
    .populate('passengers')
    .populate('delays') as flightsModel;
    res.status(200).send(flight);
  } catch (err) {
    res.status(404).send({ message: `The Flight you're looking for does not exist!` });
  }
};

// endpoint for cancelled Flights
export const cancelledFlights: RequestHandler = async (req, res) => {
  try {
      const flights = Flights.find({ iropStatus: 'CX' });
      res.json(Flights);
  } catch (err) {
      res.status(500).send(`The endpoint URL does not exsist!`);
  }
};

// Update flight by ID
export const updateFlights: RequestHandler = async (req, res) => {
  try{
    const updatedFlight = Flights.findByIdAndUpdate(req.params.id, req.body, {new: true}) as flightsModel;
    res.status(200).send(updatedFlight);
  } catch (err) {
    res.status(500).send({ message: `An error occurred while updating the record` });
  }
};

// Delete a single Flight
export const deleteFlights: RequestHandler = async (req, res) => {
  try {
    const flightId = Flights.findByIdAndDelete(req.params.id)
    res.send(`The Flight has been deleted from database successfully!`)
  } catch (err) {
    res.status(404).send(`The Flight you're looking for does not exist!`)
  }
};

