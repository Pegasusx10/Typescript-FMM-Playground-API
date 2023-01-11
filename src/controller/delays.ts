import { RequestHandler } from "express";

import delays, { delaysModel } from "../models/delays";

export const createDelays: RequestHandler = async (req, res, next) => {
  try {
    const data: delaysModel = req.body;
    console.log("Data", data);
    var Delays = await delays.create(data);
    return res
      .status(200)
      .json({ message: "Delays created successfully", data: Delays });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDelays: RequestHandler = async (req, res, next) => {
  try {
    var Delays = await delays.find({});
    return res.status(200).json({ message: "All delays!", data: Delays });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDelays: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var Delays = await delays.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "Delays updated successfully!", data: Delays });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDelays: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var isDeleted = await delays.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete delay!");
    return res.status(200).json({ message: "Delay deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};