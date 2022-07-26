const db = require("../models");

const { voting: Voting } = db;

exports.getAllVoting = (_req, res) => {
    Voting.find({}).exec((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
};

exports.postVote = (req, res) => {
    // TODO check if the vote is valid
    Voting.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { ballot: { vote: req.body.vote } } },
        { new: true },
        (err, vote) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.json({ ok: true, identificator: vote.ballot.slice(-1)[0]._id });
        }
    );
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
            res.status(500).send({ message: err });
            return;
        }
        if (createdVoting) {
            res.send({
                message: "Votación creada con exito",
                ok: true,
                voting: createdVoting
            });
        }
    });
};

exports.getVotingById = (req, res) => {
    Voting.findById(req.params.id).exec((err, voting) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.json(voting);
        }
    });
};

exports.updateVoting = (req, res) => {
    Voting.findOneAndUpdate(
        { _id: req.params.id },
        {
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            universal: req.body.universal,
            electors: req.body.electors,
            candidates: req.body.candidates
        },
        { new: true }
    ).then((response) => {
        res.json({
            voting: response,
            message: "Votcion actualizada con exito",
            ok: true
        });
    });
};

exports.deleteVoting = (req, res) => {
    Voting.findOneAndRemove({ _id: req.params.id }, (error, result) => {
        if (error) {
            res.status(500).send({ message: error });
        } else {
            res.json({
                message: "Votación eliminada con éxito",
                removed: result,
                ok: true
            });
        }
    });
};
