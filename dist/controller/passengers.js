"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePassengers = exports.updatePassengers = exports.getPassenger = exports.getPassengers = exports.createPassengers = void 0;
const flights_1 = __importDefault(require("../models/flights"));
const queryCondition = require('../utils/passengerValidation');
const passengers_1 = __importDefault(require("../models/passengers"));
// Create a single Passenger
const createPassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPassenger = new passengers_1.default({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            passportNo: req.body.passportNo,
            country: req.body.country
        });
        const freshPassenger = yield newPassenger.save();
        res.status(201).json(freshPassenger);
    }
    catch (err) {
        res.status(404).json("The Passenger you're looking for does not exist!");
    }
});
exports.createPassengers = createPassengers;
// Get all Passengers
const getPassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const Passengers = yield passengers_1.default
            .find(queries)
            .limit(pageSizeValue)
            .skip((pageNumberValue - 1) * pageSizeValue);
        res.status(200).json(Passengers);
    }
    catch (err) {
        res.status(404).json({ message: "The Delay you are looking for does not exist!" });
    }
});
exports.getPassengers = getPassengers;
// get a single Passenger
const getPassenger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengerInfo = yield flights_1.default.findById(req.params.id);
        // .populate('enrolledCourses')
        res.send(passengerInfo);
    }
    catch (err) {
        res.status(404).json(`The Passenger you're looking for does not exist!`);
    }
});
exports.getPassenger = getPassenger;
// Update a single Passenger
const updatePassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var Passengers = yield passengers_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res
            .status(200)
            .json({ message: "delays updated successfully!", data: Passengers });
    }
    catch (error) {
        return res.status(500).json(`The Passenger you are looking for does not exsist!`);
    }
});
exports.updatePassengers = updatePassengers;
// Delete a single Passenger
const deletePassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var isDeleted = yield passengers_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete todo");
        return res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json(`The Passenger you are looking for does not exsist!`);
    }
});
exports.deletePassengers = deletePassengers;
