const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

// const User = require("./models/User");

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.set('strictQuery', false);
mongoose
    .connect(
        process.env.MONGO_URL,
        // "mongodb://localhost:27017/dragon-networks",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(
        console.log("Connected to MongoDB")
    )
    .catch((err) => {
        console.log(err + "\nError brrr :(")
    });

// app.use("/User")

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
