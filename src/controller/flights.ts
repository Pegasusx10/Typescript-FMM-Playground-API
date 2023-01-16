import { RequestHandler } from "express";
const queryCondition = require('../utils/flightValidation')
import flights, { flightsModel } from "../models/flights";


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
    hasBusinessClass: req.body.hasBusinessClass ,
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
  const pageSize = parseInt(req.query.pageSize) || 0
  const pageNumber = parseInt(req.query.pageNumber) || 1
  const queries = queryCondition(req.query)
  const Flights = await flights
  .find(queries)
  .limit(pageSize)
  .skip(pageNumber - 1)
  .populate('passengers')
  res.status(200).send(Flights)
  } catch (error: any) {
  return res.status(500).json({ message: error.message });
  }
  }

// Get a single flight 
export const getFlight: RequestHandler = async (req, res) => {
  try{
    const Flights = await flights.findById(req.params.id)
    // .populate('passengers')
     res.send(Flights)
    } catch (err) {
      res.status(404).json(`The Flight you're looking for does not exist!`)
    }
};

// Update flight by ID
export const updateFlights: RequestHandler = async (req, res) => {
try{
  const updatedflights = flights(req.params.id, req.body);
  res.send(updatedflights);
    } catch (err) {
  res.status(500).send( `An error occurred while updating the record` )
    }
}

// Delete a single Flight
export const deleteFlights: RequestHandler = async (req, res) => {
try {
  const flightId = await flights.findByIdAndDelete(req.params.id)
  res.send(`The Flight has been deleted from database successfully!`)
} catch (err) {
  res.status(404).json(`The Flight you're looking for does not exist!`)
}
}