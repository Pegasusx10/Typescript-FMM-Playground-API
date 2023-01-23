import { RequestHandler, Request, Response } from "express";
import Flights, { FlightsModel } from "../models/flights";
import queryCondition from '../utils/query';
import { handleError, handleNotFoundError, handleUpdateError } from "../middleware/errorHandler";

// Create a flight
export const createFlights: RequestHandler = async (req: Request, res: Response) => {
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
    const freshFlights = await newFlight.save();
    res.status(201).json(freshFlights);
  } catch (err) {
    handleError
  }
};

// Get all flights
export const getFlights: RequestHandler = async (req: Request, res: Response) => {
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
    const flight = await Flights
      .find(queries)
      .limit(pageSizeValue)
      .skip((pageNumberValue - 1) * pageSizeValue)
      .populate('passengers')
      // .populate('Delays')
      res.status(200).json(flight)
    } catch (err) {
      handleError
    }
  };  

// Get a single flight 
export const getFlight: RequestHandler = async (req: Request, res: Response) => {
  try{
    const flight = await Flights.findById(req.params.id)
    .populate('passengers')
    // .populate('Delays');
    res.status(200).json(flight);
  } catch (err) {
    handleError
  }
};

// Update flight by ID
export const updateFlights: RequestHandler = async (req: Request, res: Response) => {
  try{
    const updatedFlight = await Flights.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedFlight);
  } catch (err) {
    handleUpdateError
  }
};

// Delete a single Flight
export const deleteFlights: RequestHandler = async (req: Request, res: Response) => {
  try {
    const flightId = await Flights.findByIdAndDelete(req.params.id)
    res.json(`The Flight has been deleted from database successfully!`)
  } catch (err) {
    handleNotFoundError
  }
};

// endpoint for cancelled Flights
export const cancelledFlights: RequestHandler = async (req: Request, res: Response) => {
    try {
        const flights = Flights.find({ iropStatus: 'CX' });
        res.json(flights);
    } catch (err) {
      handleNotFoundError
    }
