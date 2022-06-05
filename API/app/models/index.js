const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {
    mongoose,
    user: require("./user.model"),
    role: require("./role.model"),
    voting: require("./voting.model"),
    ROLES: ["user", "admin", "moderator"],
};

module.exports = db;
