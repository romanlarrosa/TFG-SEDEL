const jwt = require("jsonwebtoken");
const db = require("../models");

const {user: User, role: Role } = db;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token) {
        return res.status(403).send({message: "No se ha especificado un token"});
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "No autorizado"});
        }
        req.userId = decoded.id;
        next();
    });
};

const isRoled = (r) => (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (e, roles) => {
                if (e) {
                    res.status(500).send({ message: e });
                    return;
                }
                if(roles.any((role) => role.name === r)) {
                    next();
                    return;
                }
                res.status(403).send({ message: "Acceso denegado" });
            }
        );
    });
};

const isAdmin = isRoled("admin");
const isModerator = isRoled("moderator");

module.exports = {
    verifyToken,
    isAdmin,
    isModerator
};