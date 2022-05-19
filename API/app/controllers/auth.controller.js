const db = require("../models");
const {user: User, role: Role} = db;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, createdUser) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (error, roles) => {
                    if (error) {
                        res.status(500).send({ message: error });
                        return;
                    }
                    createdUser.roles = roles.map(role => role._id);
                    createdUser.save(saveError => {
                        if (saveError) {
                            res.status(500).send({ message: saveError });
                            return;
                        }
                        res.send({ message: "Usuario registrado exitosamente" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (error, role) => {
                if (error) {
                    res.status(500).send({ message: error });
                    return;
                }
                user.roles = [role._id];
                user.save(saveError => {
                    if (saveError) {
                        res.status(500).send({ message: saveError });
                        return;
                    }
                    res.send({ message: "Usuario registrado exitosamente" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Contraseña incorrecta"
                });
            }
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: 86400 // 24 hours
            });
            const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};