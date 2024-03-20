// In app.js or server.js

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dataRoutes = require("./routes/data");
const dbConnect = require("./config/database");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/", dataRoutes);




app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

dbConnect.dbConnect();

app.get("/", (req, res) => {
    res.send("Visualization API ready to use...");
});