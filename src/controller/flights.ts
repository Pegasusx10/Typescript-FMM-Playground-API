import { RequestHandler } from "express";

import flights, { flightsModel } from "../models/flights";

export const createFlights: RequestHandler = async (req, res, next) => {
  try {
    const data: flightsModel = req.body;
    console.log("Data", data);
    var Flights = await flights.create(data);
    return res
      .status(200)
      .json({ message: "delays created successfully", data: Flights });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFlights: RequestHandler = async (req, res, next) => {
  try {
    var Flights = await flights.find({});
    return res.status(200).json({ message: "All flights!", data: Flights });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFlights: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var Flights = await flights.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "delays updated successfully!", data: Flights });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFlights: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var isDeleted = await flights.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete todo");
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};