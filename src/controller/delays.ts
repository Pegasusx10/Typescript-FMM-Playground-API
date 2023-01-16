import { RequestHandler } from "express";
const queryCondition = require('../utils/delayValidation')
import delays, { delaysModel } from "../models/delays";
import flights from "../models/flights";

// Create a single Delay
export const createDelays: RequestHandler = async (req, res) => {
const newDelay = new delays({
  code: req.body.code,
  reason: req.body.reason,
  time: req.body.time
})
// Validate firstName & lastName to be unique
const firstName = req.body.firstName;
const lastName = req.body.lastName;
delays.findOne({ firstName: firstName, lastName: lastName }, (err: any, Delays: any) => {
  if (err) {
    return;
  }
  if (delays) {
    res.send({ error: 'The delay cannot be added since the delay already exsist in the database' });
  } else {
    res.send({ success: 'The delay has been successfully added to the database'});
  }
});
try {
  const freshDelay = await newDelay.save()
  res.status(201).json(freshDelay)
  } catch (err) {
    res.status(404).json(`The Delay you're looking for does not exist!`)
  }
}

// get all  Delay
export const getDelays: RequestHandler = async (req, res) => {
try {
  const pageSize = parseInt(req.query.pageSize) || 0
  const pageNumber = parseInt(req.query.pageNumber) || 1 
  const queries = queryCondition(req.query)
  const Delays = await delays
    .find(queries)
    .limit(pageSize)
    .skip(pageNumber - 1)
    res.status(200).send(Delays)
  } catch (err) {
    res.status(404).json(`Delay does not exist!`)
  }
};

//get a single Delay 
export const getDelay: RequestHandler = async (req, res) => {
  try{
    const delayInfo = await delays.findById(req.params.id)
     res.send(delayInfo)
    } catch (err) {
      res.status(404).json(`Delay does not exist!`)
    }
};

// update a single Delay
export const updateDelays: RequestHandler = async (req, res) => {
  try{
    const updatedRecord = new delays(req.params.id, req.body);
    res.send(updatedRecord);
      } catch (err) {
    res.status(500).send( `An error occurred while updating the record` )
      }
  };
  
// Delete a single Delay 
export const deleteDelays: RequestHandler = async (req, res) => {
  try {
    const delayId = await flights.findByIdAndDelete(req.params.id)
    res.send(`The delay has been deleted has been successfully deleted!`)
  } catch (err) {
    res.status(404).json(`The Delay you are looking for does not exsist!`)
  }
};