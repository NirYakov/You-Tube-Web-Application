const mongoose = require("mongoose");


module.exports = function connectToMyMongo() {
    //////// read form api key env ? !

    if (!process.env.DbString) {

        process.env.DbString = "place holder";
        process.env.DbUsername = "place holder";

        try {
            const config = require("./config/config");

            if (config) {

                process.env.DbString = config.DbString;
                process.env.DbUsername = config.DbUsername;
                // console.log( process.env.DbUsername, process.env.DbString);

            }
        }
        catch (error) {
            console.log("Can't find any --- keys ----");
        }

    }

    const uri = `mongodb+srv://${process.env.DbUsername}:${process.env.DbString}@cluster0.weq6mmm.mongodb.net/TestYoutube?retryWrites=true&w=majority`;

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