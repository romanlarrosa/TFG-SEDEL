const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

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

// routes
app.get("/", (_req, res) => {
    res.json({ message: "Welcome to the api" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/voting.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
