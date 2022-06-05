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