const { authJWT, verifyNewVoting } = require("../middlewares");
const controller = require("../controllers/voting.controller");
module.exports = function (app) {
    app.use(function (_req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/voting",
        [Object.values(verifyNewVoting)],
        [authJWT.verifyToken, authJWT.isAdmin],
        controller.newVoting
    );
};