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
exports.deleteFlights = exports.updateFlights = exports.getFlights = exports.createFlights = void 0;
const flights_1 = __importDefault(require("../models/flights"));
const createFlights = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log("Data", data);
        var Flights = yield flights_1.default.create(data);
        return res
            .status(200)
            .json({ message: "delays created successfully", data: Flights });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createFlights = createFlights;
const getFlights = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var Flights = yield flights_1.default.find({});
        return res.status(200).json({ message: "All flights!", data: Flights });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getFlights = getFlights;
const updateFlights = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var Flights = yield flights_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res
            .status(200)
            .json({ message: "delays updated successfully!", data: Flights });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateFlights = updateFlights;
const deleteFlights = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var isDeleted = yield flights_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete todo");
        return res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteFlights = deleteFlights;
