import express from "express";
import db from "mongoose";
// import todoRoutes from "./routes/todos";
import flightsRoutes from "";
import delaysRoutes from "";
import passengersRoutes from "";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

// app.use("/todos", todoRoutes);
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

db.connect("mongodb+srv://Pegasusx10:pegasus123@cluster0.749smlf.mongodb.net/?retryWrites=true&w=majority", () => {
  console.log("Database connected");
});

app.listen(5000);