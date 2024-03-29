const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
module.exports = function(app) {
    app.use(function(_req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkExistingUser,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
};