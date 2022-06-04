const checkCorrectDates = (req, res, next) => {
    const startDate = req.body.startDate,
        endDate = req.body.endDate;

    if(startDate > endDate) {
        res.status(400).send({message: "Invalid start date and end date provided"});
        return;
    }
    next();
};

const verifyNewVoting = {
    checkCorrectDates,
};
module.exports = verifyNewVoting;
