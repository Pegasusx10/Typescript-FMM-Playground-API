"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import todoRoutes from "./routes/todos";
const _1 = __importDefault(require(""));
const _2 = __importDefault(require(""));
const _3 = __importDefault(require(""));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
// app.use("/todos", todoRoutes);
app.use("/fmm/api/flights", _1.default);
app.use("/fmm/api/delays", _2.default);
app.use("/fmm/api/passengers", _3.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
mongoose_1.default.connect("mongodb+srv://Pegasusx10:pegasus123@cluster0.749smlf.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database connected");
});
app.listen(5000);
