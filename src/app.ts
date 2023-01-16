import express from "express";
import db from "mongoose";
import flightsRoutes from "./routes/flights";
import delaysRoutes from "./routes/delays";
import passengersRoutes from "./routes/passengers";
import connection from "./config.ts/dbConnection"
import { json, urlencoded } from "body-parser";
const dotenv = require("dotenv")
const PORT = 5000
const app = express();

dotenv.config();
app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/fmm/api/flights", flightsRoutes);
app.use("/fmm/api/delays", delaysRoutes);
app.use("/fmm/api/passengers", passengersRoutes);


app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.use('*', (req,res) => {
  const err = new Error(`The Requested URL is Invalid!`)
  res.status(404).json({        
      message: err.message       
  })
})


db.connect("mongodb+srv://Pegasusx10:pegasus123@cluster0.749smlf.mongodb.net/?retryWrites=true&w=majority", () => {
  console.log("Database connected successfully");
});

app.listen(PORT, () => console.log('Server Started'))