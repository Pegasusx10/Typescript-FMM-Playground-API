"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const flights_1 = __importDefault(require("./routes/flights"));
const delays_1 = __importDefault(require("./routes/delays"));
const passengers_1 = __importDefault(require("./routes/passengers"));
// import connection from "./config.ts/dbConnection"
const body_parser_1 = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const db = mongoose_1.default.connection;
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/fmm/api", flights_1.default);
app.use("/fmm/api", delays_1.default);
app.use("/fmm/api", passengers_1.default);
app.use((err, req, res) => {
    res.status(500).json({ message: err.message });
});
app.use('*', (req, res) => {
    const err = new Error(`The requested endpoint does not exist. Please check the URL and try again.`);
    res.status(404).json({
        message: err.message
    });
});
app.listen(PORT, () => console.log('Server Started'));
