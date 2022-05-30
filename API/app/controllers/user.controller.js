const db = require("../models");

const {user: User} = db;

exports.getAllUsers = (_req, res) => {
    User.find({ })
        .populate("roles")
        .exec( (err, result) => {
            if (err) {
                console.log(err);
            } else {

                res.json(result);
            }
        }); 
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public content");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Public content");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Public content");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Public content");
};