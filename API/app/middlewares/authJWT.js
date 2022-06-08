const jwt = require("jsonwebtoken");
const db = require("../models");

const {user: User} = db;

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
    User.findById(req.userId).populate("roles").exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        const roleNames = user.roles.map(rol => rol.name);
        if(roleNames.includes(r)) {
            next();
            return;
        }
        res.status(403).send({ message: "Acceso denegado" });
    });
};

const isAdmin = isRoled("admin");
const isModerator = isRoled("moderator");

const isNotSelf = (req, res, next) => {
    if(req.userId === req.params.id) {
        res.status(403).send({ message: "Operación no permitida para el usuario" });
        return;
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    isNotSelf
};