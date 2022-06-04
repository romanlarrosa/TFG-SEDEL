const db = require("../models");

const {voting: Voting} = db;

exports.getAllVoting = (_req, res) => {
    Voting.find({ })
        .exec( (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }); 
};

exports.newVoting = (req, res) => {
    const voting = new Voting({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        universal: req.body.universal,
        electors: req.body.electors,
        candidates: req.body.candidates
    });
    voting.save((err, createdVoting) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (createdVoting)  {
            console.log(createdVoting);
            res.send({message: "Votación creada con exito", ok: true, voting: createdVoting});
        }
    });
};