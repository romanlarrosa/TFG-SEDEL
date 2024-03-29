const mongoose = require("mongoose");

const Voting = mongoose.model(
    "Voting",
    new mongoose.Schema({
        name: String,
        startDate: Date,
        endDate: Date,
        universal: Boolean,
        electors: [{ id: String }],
        candidates: [{ name: String }],
        ballot: [{ vote: String }],
        voted: [{ id: String }],
        escrutined: Boolean
    })
);
module.exports = Voting;
