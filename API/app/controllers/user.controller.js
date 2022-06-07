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

exports.deleteUserById = (req, res) => {
    User.findOneAndRemove(
        { _id: req.params.id},
        (error, result) => {
            if (error) {
                res.status(500).send({message: error});
            }
            else {
                res.json({
                    message: "Cuenta eliminada con éxito", 
                    removed: result, 
                    ok:true
                });
            }
        }
    );
};