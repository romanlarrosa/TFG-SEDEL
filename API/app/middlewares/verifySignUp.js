const db = require("../models");

const checkExistingUser = (req, res, next) => {
    //username
    db.user
        .findOne({
            username: req.body.username,
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Nombre de usuario ya existente en el sistema" });
                return;
            }
            //mail
            db.user
                .findOne({
                    email: req.body.email,
                })
                .exec((e, u) => {
                    if (e){ 
                        res.status(500).send({ message: e });
                        return;
                    }
                    if (u) {
                        res.status(400).send({ message: "Email ya registrado en el sistema" });
                        return;
                    }
                    next();
                });
        });
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles && req.body.roles.length) {
        req.body.roles.forEach((role) => {
            if (!db.ROLES.includes(role)) {
                res.status(400).send({
                    message: `Error: el rol ${role} no existe`,
                });
            }
        });
    }
    next();
};

const verifySignUp = {
    checkExistingUser,
    checkRolesExisted,
};
module.exports = verifySignUp;
