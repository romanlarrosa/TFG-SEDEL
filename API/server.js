const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
    .connect(
        `mongodb+srv://express:${process.env.MONGO_PASS}@cluster-tfg.t1hko.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Connection error", err);
    });

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/voting.routes")(app);

app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
