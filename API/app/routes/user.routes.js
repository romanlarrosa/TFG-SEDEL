const { authJWT } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
    app.use(function (_req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/users",
        [authJWT.verifyToken, authJWT.isAdmin],
        controller.getAllUsers
    );
};
