import { Request, Response, RequestHandler } from "express";
import Delays, { delaysModel } from "../models/delays";
import queryCondition from '../utils/query';
import { handleDelayNotFound, handleUpdateDelay } from "../middleware/errorHandler";

// Create a single Delay
export const createDelays: RequestHandler = async (req: Request, res: Response) => {
  const singleDelay = new Delays({
    code: req.body.code,
    reason: req.body.reason,
    time: req.body.time
  });
  try {
    const freshDelay = await singleDelay.save();
    res.status(201).json(freshDelay);
  } catch (err) {
    handleDelayNotFound;
  }
};

// get all  Delay
export const getDelays: RequestHandler = async (req: Request, res: Response) => {
  try {
    let pageSize = req.query.pageSize;
    let pageNumber = req.query.pageNumber;
    if (typeof pageSize !== 'string') {
      pageSize = "0";
    }
    if (typeof pageNumber !== 'string') {
      pageNumber = "1";
    }
    const pageSizeValue = parseInt(pageSize, 10) || 0;
    const pageNumberValue = parseInt(pageNumber, 10) || 1;
    const queries = queryCondition(req.query);
    const allDelays = await Delays
      .find(queries)
      .limit(pageSizeValue)
      .skip((pageNumberValue - 1) * pageSizeValue);
    res.status(200).json(allDelays);
  } catch (err) {
    handleDelayNotFound;
  }
};

// Get a single Delay
export const getDelay: RequestHandler = async (req: Request, res: Response) => {
  try {
    const delayInfo = await Delays.findById(req.params.id);
    res.json(delayInfo);
  } catch (err) {
    handleDelayNotFound;
  }
};

// Update a single Delay
export const updateDelays: RequestHandler = async (req: Request, res: Response) => {
  try {
    const updatedRecord = await Delays.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecord);
  } catch (err) {
    handleUpdateDelay;
  }
};

// Delete a single Delay
export const deleteDelays: RequestHandler = async (req: Request, res: Response) => {
  try {
    const delayId = await Delays.findByIdAndDelete(req.params.id);
    res.json(`The delay has been deleted successfully!`);
  } catch (err) {
    handleDelayNotFound;
  }
};
