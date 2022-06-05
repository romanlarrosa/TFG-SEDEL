const checkCorrectDates = (req, res, next) => {
    const startDate = req.body.startDate,
        endDate = req.body.endDate;

    if(startDate > endDate) {
        res.status(400).send({message: "Las fechas proporcionadas no son validas"});
        return;
    }
    next();
};

const verifyNewVoting = {
    checkCorrectDates,
};
module.exports = verifyNewVoting;
