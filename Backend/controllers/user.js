const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (req, res, next) => {

    const password = req.body.password;
    const email = req.body.email;


    if (!Validators.isEmailValid(email)) {
        res.status(400).json({
            message: "Invalid authentication credentials! email is not in the right format!"
        });
        return;
    }


    if (!Validators.createPasswordStrengthValidator(password)) {
        res.status(400).json({
            message: "Invalid authentication credentials! password is too weak!"
        });
        return;
    }


    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Invalid authentication credentials!"
                });
            });
    });
}


exports.userLogin = (req, res, next) => {
    let fetchedUser;
    console.log(req.body);

    const password = req.body.password;
    const email = req.body.email;


    if (!Validators.isEmailValid(email)) {
        res.status(400).json({
            message: "Invalid authentication credentials! email is not in the right format!"
        });
        return;
    }

    if (!Validators.createPasswordStrengthValidator(password)) {
        res.status(400).json({
            message: "Invalid authentication credentials! password is too weak!"
        });
        return;
    }


    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({
                    message: "Invalid authentication credentials!"
                });
                return false;
            }
            console.log("fond user");

            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            console.log("res compare passwords");
            if (!result) {
                if (res.statusCode)
                    res.status(401).json({
                        message: "Auth failed"
                    });
                return res;

            }
            console.log("token create");
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            console.log("D token create DDDDDD");
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        }).catch(error => console.log(" Error Occured!"));
}