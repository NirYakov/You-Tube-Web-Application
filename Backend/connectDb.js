const mongoose = require("mongoose");


module.exports = function connectToMyMongo() {
    //////// read form api key env ? !

    if (!process.env.DbString) {

        process.env.ApiKey = "place holder";
        process.env.DbString = "place holder";

        try {
            const config = require("./config/config");

            if (config) {
                // process.env.ApiKey = config.ApiKey;
                process.env.DbString = config.DbString;
                // console.log(process.env.ApiKey, process.env.DbString);

            }
        }
        catch (error) {
            console.log("Can't find any --- keys ----");
        }

    }

    const uri = `mongodb+srv://Nir:${process.env.MONGO_ATLAS_PW}@cluster0.tcpdrjy.mongodb.net/TestYoutube`;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }).then(() => {
        console.log('Connected to database');
    }).catch(err => {
        console.log(err.reason);
        console.log("Connection failed!");
    });

}