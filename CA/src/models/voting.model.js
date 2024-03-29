const mongoose = require("mongoose");

const Voting = mongoose.model(
    "Voting",
    new mongoose.Schema({
        name: String,
        startDate: Date,
        endDate: Date,
        universal: Boolean,
        electors: [{id: String,}],
        voted: [{id: String,}],
        candidates: [{name: String,}]
    })
);
module.exports = Voting;