import { RequestHandler } from "express";

import flights, { flightsModel } from "../models/flights";

export const createdelays: RequestHandler = async (req, res, next) => {
  try {
    const data: flightsModel = req.body;
    console.log("Data", data);
    var flights = await flights.create(data);
    return res
      .status(200)
      .json({ message: "delays created successfully", data: flights });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getdelays: RequestHandler = async (req, res, next) => {
  try {
    var flights = await flights.find({});
    return res.status(200).json({ message: "All flights!", data: flights });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateflights: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var flights = await flights.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "delays updated successfully!", data: flights });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteflights: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var isDeleted = await flights.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete todo");
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};