import { RequestHandler } from "express";

import passengers, { passengersModel } from "../models/passengers";

export const createpassengers: RequestHandler = async (req, res, next) => {
  try {
    const data: passengersModel = req.body;
    console.log("Data", data);
    var passengers = await passengers.create(data);
    return res
      .status(200)
      .json({ message: "passengers created successfully", data: passengers });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getpassengers: RequestHandler = async (req, res, next) => {
  try {
    var passengers = await passengers.find({});
    return res.status(200).json({ message: "All passengers!", data: passengers });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatepassengers: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var passengers = await passengers.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "delays updated successfully!", data: passengers });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletepassengers: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var isDeleted = await passengers.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete todo");
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};