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
exports.deleteDelays = exports.updateDelays = exports.getDelays = exports.createDelays = void 0;
const delays_1 = __importDefault(require("../models/delays"));
const createDelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log("Data", data);
        var Delays = yield delays_1.default.create(data);
        return res
            .status(200)
            .json({ message: "Delays created successfully", data: Delays });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createDelays = createDelays;
const getDelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var Delays = yield delays_1.default.find({});
        return res.status(200).json({ message: "All delays!", data: Delays });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getDelays = getDelays;
const updateDelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var Delays = yield delays_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res
            .status(200)
            .json({ message: "Delays updated successfully!", data: Delays });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateDelays = updateDelays;
const deleteDelays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var isDeleted = yield delays_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete delay!");
        return res.status(200).json({ message: "Delay deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteDelays = deleteDelays;
