const { authJWT, verifyVoting } = require("../middlewares");
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
        "/api/votings",
        [verifyVoting.checkCorrectDates],
        [authJWT.verifyToken, authJWT.isModerator],
        controller.newVoting
    );
    app.get(
        "/api/votings",
        [authJWT.verifyToken, authJWT.isModerator],
        controller.getAllVoting
    );
    app.get(
        "/api/votings/:id", 
        [authJWT.verifyToken, authJWT.isModerator],
        controller.getVotingById
    );
    app.put(
        "/api/votings/:id", 
        [verifyVoting.checkCorrectDates, verifyVoting.checkNotStarted],
        [authJWT.verifyToken, authJWT.isModerator],
        controller.updateVoting
    );
};
