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
exports.deletedelays = exports.updatedelays = exports.getdelays = exports.createdelays = void 0;
const delays_1 = __importDefault(require("../models/delays"));
const createdelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log("Data", data);
        var delays = yield delays.create(data);
        return res
            .status(200)
            .json({ message: "delays created successfully", data: delays });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createdelays = createdelays;
const getdelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delays = yield delays.find({});
        return res.status(200).json({ message: "All delays!", data: delays });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getdelays = getdelays;
const updatedelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var delays = yield delays.findByIdAndUpdate(id, req.body, { new: true });
        return res
            .status(200)
            .json({ message: "delays updated successfully!", data: delays });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updatedelays = updatedelays;
const deletedelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var isDeleted = yield delays_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete todo");
        return res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deletedelays = deletedelays;
