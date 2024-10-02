const Activities = require('../models/activitiesModel'); // Mistake: Incorrect path ('..models/activitiesModel')

const handleRequest = async (res, activitiesMethod, successMessage, failureMessage) => {
    try {
        const result = await activitiesMethod();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: failureMessage });
    }
};

const getAllActivityName = async (req, res) => {
    handleRequest(res, Activities.getAllActivityName.bind(Activities), 'Activities fetched successfully', 'Failed to fetch activities');
}

module.exports = {
    getAllActivityName
};
