import { RequestHandler } from "express";

import delays, { delaysModel } from "../models/delays";

export const createdelays: RequestHandler = async (req, res, next) => {
  try {
    const data: delaysModel = req.body;
    console.log("Data", data);
    var delays = await delays.create(data);
    return res
      .status(200)
      .json({ message: "delays created successfully", data: delays });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getdelays: RequestHandler = async (req, res, next) => {
  try {
    var delays = await delays.find({});
    return res.status(200).json({ message: "All delays!", data: delays });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatedelays: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var delays = await delays.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "delays updated successfully!", data: delays });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletedelays: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var isDeleted = await delays.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete todo");
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};