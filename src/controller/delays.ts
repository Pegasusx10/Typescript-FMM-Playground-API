import { RequestHandler, Request, Response } from "express";
const queryCondition = require('../utils/queryLogic')
import Delays, { delaysModel } from "../models/delays";


// Create a single Delay
export const createDelays: RequestHandler = async (req: Request, res: Response) => {
  const newDelay = new Delays({
    code: req.body.code,
    reason: req.body.reason,
    time: req.body.time
  });

  try {
    const freshDelay = await newDelay.save();
    res.status(201).send(freshDelay);
  } catch (err) {
    res.status(404).send(`The Delay you're looking for does not exist!`);
  }
};

// get all  Delay
export const getDelays: RequestHandler = async (req: Request, res: Response) => {
  try {
    let pageSize = req.query.pageSize;
    let pageNumber = req.query.pageNumber;
    if (typeof pageSize !== 'number') {
      pageSize = "0";
    }
    if (typeof pageNumber !== 'number') {
      pageNumber = "1";
    }
    const pageSizeValue = parseInt(pageSize, 10) || 0;
    const pageNumberValue = parseInt(pageNumber, 10) || 1;
    const queries = queryCondition(req.query)
    const allDelays = await Delays
      .find(queries)
      .limit(pageSizeValue)
      .skip((pageNumberValue - 1) * pageSizeValue)
      res.status(200).send(allDelays)
    } catch (err) {
      res.status(404).send({ message: "The Delay you are looking for does not exist!" })
    }
  };
  
// Get a single Delay
export const getDelay: RequestHandler = async (req:Request, res: Response) => {
  try {
    const singleDelay = await Delays.findById(req.params.id) as delaysModel;
    res.send(singleDelay);
  } catch (err) {
    res.status(404).send(`Delay does not exist!`);
  }
};

// Update a single Delay
export const updateDelays: RequestHandler = async (req: Request, res: Response) => {
  try {
    const updatedRecord = await Delays.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedRecord);
  } catch (err) {
    res.status(500).send({ message: `An error occurred while updating the record` });
  }
};
  
// Delete a single Delay
export const deleteDelays: RequestHandler = async (req: Request, res: Response) => {
  try {
    const delayId = await Delays.findByIdAndDelete(req.params.id);
    res.send(`The delay has been deleted successfully!`);
  } catch (err) {
    res.status(404).send({ message: `The Delay you are looking for does not exist!` });
  }
};
