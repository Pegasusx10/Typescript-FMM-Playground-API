import { RequestHandler } from "express";
import flights from "../models/flights";
const queryCondition = require('../utils/flightValidation')


// Create a flight
export const createFlights: RequestHandler = async (req, res) => {
  const newFlight = new flights({
    flightNumber: req.body.flightNumber,
    tailNumber: req.body.tailNumber,
    origin: req.body.origin,
    destination: req.body.destination,
    iropStatus: req.body.iropStatus,
    totalSeats: req.body.totalSeats,
    passengers: req.body.passengers,
    hasBusinessClass: req.body.hasBusinessClass,
    delay: req.body.delay,
})
try {
  const freshFlights = await newFlight.save()
  res.status(201).json(freshFlights)
  } catch (err) {
    res.status(404).json(`The Flight you're looking for does not exist!`)
  }
}

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
    const Flight = await flights
      .find(queries)
      .limit(pageSizeValue)
      .skip((pageNumberValue - 1) * pageSizeValue)
      .populate('passengers')
      .populate('delay')
      res.status(200).json(Flight)
    } catch (err) {
      res.status(404).json({ message: "The Flight you are looking for does not exist!" });
    }
  };
  

// Get a single flight 
export const getFlight: RequestHandler = async (req, res) => {
  try{
    const Flights = await flights.findById(req.params.id)
    .populate('passengers')
    .populate('delays')
     res.send(Flights)
    } catch (err) {
      res.status(404).json(`The Flight you're looking for does not exist!`);
    }
};

// endpoint for cancelled Flights
export const cancelledFlights: RequestHandler = async (req, res) => {
  try {
      const Flights = await flights.find({ iropStatus: 'CX' });
      res.json(Flights);
  } catch (err) {
      res.status(500).json(`The endpoint URL does not exsist!`);
  }
};

// Update flight by ID
export const updateFlights: RequestHandler = async (req, res) => {
try{
  const updatedflights = new flights(req.params.id, req.body);
  res.send(updatedflights);
    } catch (err) {
  res.status(500).send( `An error occurred while updating the record` )
    }
};

// Delete a single Flight
export const deleteFlights: RequestHandler = async (req, res) => {
try {
  const flightId = await flights.findByIdAndDelete(req.params.id)
  res.send(`The Flight has been deleted from database successfully!`)
} catch (err) {
  res.status(404).json(`The Flight you're looking for does not exist!`)
}
};
