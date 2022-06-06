const db = require("../models");

const {voting: Voting} = db;

const checkCorrectDates = (req, res, next) => {
    const startDate = req.body.startDate,
        endDate = req.body.endDate;

    if(startDate > endDate) {
        res.status(400).send({message: "Las fechas proporcionadas no son validas"});
        return;
    }
    next();
};

const checkNotStarted = (req, res, next) => {
    Voting.findById(req.params.id).exec((err, voting) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (voting.startDate <= Date.now())  {
            res.status(400).send({message: "No se puede modificar una votación que ya ha comenzado"});
            return;
        }
        next();
    });
};

const verifyNewVoting = {
    checkCorrectDates,
    checkNotStarted
};
module.exports = verifyNewVoting;
