module.exports = function configToEnv() {

    if (!process.env.DbString) {

        process.env.ApiKey = "place holder";
        process.env.DbString = "place holder";

        try {
            const config = require("./config/config");

            if (config) {
                process.env.DbString = config.DbString;
                process.env.DbUser = config.DbUser;
                process.env.JWT_KEY = config.JWT_KEY;
            }
        }
        catch (error) {
            console.log("Can't find any --- keys ----");
        }

    }
}