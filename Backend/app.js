const express = require("express");
const bodyParser = require("body-parser");


const userRoutes = require("./routes/user");


const app = express();


const connectToMyMongo = require("./connectDb");


connectToMyMongo();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);

app.get("/api/health", (req, res, next) => { res.status(201).json({ health: "Online ! :)" }); })


module.exports = app;
