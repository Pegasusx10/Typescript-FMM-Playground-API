import { RequestHandler } from "express";
const queryCondition = require('../utils/logic')
import flights, { flightsModel } from "../models/flights";


// Create a flight
export const createFlights: RequestHandler = async (req, res, next) => {
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
export const getFlights: RequestHandler = async (req, res, next) => {
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
  return res.status(500).json({ message: error.message });
  }
  }

// export const getFlights: RequestHandler = async (req, res, next) => {
//   try {
//     var Flights = await flights.find({});
//     return res.status(200).json({ message: "All flights!", data: Flights });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// Get a single flight 
export const getFlight: RequestHandler = async (req, res, next) => {
  try{
    const Flights = await flights.findById(req.params.id)
    // .populate('passengers')
     res.send(Flights)
    } catch (err) {
      res.status(404).json(`The Flight you're looking for does not exist!`)
    }
};

// Update flight by ID
export const updateFlights: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     var Flights = await flights.findByIdAndUpdate(id, req.body, { new: true });
//     return res
//       .status(200)
//       .json({ message: "delays updated successfully!", data: Flights });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };
try{
  const updatedflights = flights(req.params.id, req.body);
  res.send(updatedflights);
    } catch (err) {
  res.status(500).send( `An error occurred while updating the record` )
    }
}

export const deleteFlights: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     var isDeleted = await flights.findByIdAndDelete(id);
//     if (!isDeleted) throw new Error("Failed to delete todo");
//     return res.status(200).json({ message: "Todo deleted successfully!" });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };
try {
  const flightId = await flights.findByIdAndDelete(req.params.id)
  res.send(`The Flight has been deleted from database successfully!`)
} catch (err) {
  res.status(404).json(`Student you're looking for does not exist!`)
}
}