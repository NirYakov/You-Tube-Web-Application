const mongoose = require("mongoose");


module.exports = function connectToMyMongo() {

    // console.log( process.env.DbUser , process.env.DbString);

    const uri = `mongodb+srv://${process.env.DbUser}:${process.env.DbString}@cluster0.weq6mmm.mongodb.net/TestYoutube?retryWrites=true&w=majority`;

    // console.log(uri);

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