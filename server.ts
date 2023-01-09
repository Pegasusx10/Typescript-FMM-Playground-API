import { error } from "console"

require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const flightsRouter = require('./')
const delaysRouter = require('./')
const passengersRouter = require('./')
const connection = require('./')
const db = mongoose.connection
const PORT  = 5000
const dotenv = require("dotenv")

dotenv.config()

db.on('error', (error) => console.error(error))

app.use(express.json())
app.use('/fmm/api', flightsRouter)
app.use('/fmm/api', delaysRouter)
app.use('/fmm/api', passengersRouter)

app.listen(PORT, () => console.log('server started'))