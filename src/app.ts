import express from "express";
import mongoose from "mongoose";
import flightsRoutes from "./routes/flights";
import delaysRoutes from "./routes/delays";
import passengersRoutes from "./routes/passengers";
import { json, urlencoded } from "body-parser";
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const db = mongoose.connection;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/fmm/api", flightsRoutes);
app.use("/fmm/api/delays", delaysRoutes);
app.use("/fmm/api/passengers", passengersRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.use('*', (req, res) => {
  const err = new Error(`The requested endpoint does not exist. Please check the URL and try again.`)
  res.status(404).json({        
      message: err.message       
  })
})

app.listen(PORT, () => console.log('Server Started'))
