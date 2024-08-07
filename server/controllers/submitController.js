const db = require('../config/dbConfig');

const submitForm = async (req, res) => {
    const { epf_number, date_of_production, production_division, sap_code, packing_qty, packing_hrs, additional_action, loss_time_normal_hrs, loss_time_ot } = req.body;

    try {
        const query = `INSERT INTO production_data (epf_number, date_of_production, production_division, sap_code, packing_qty, packing_hrs, additional_action, loss_time_normal_hrs, loss_time_ot)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [epf_number, date_of_production, production_division, sap_code, packing_qty, packing_hrs, additional_action, loss_time_normal_hrs, loss_time_ot];
        await db.query(query, params);

        res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ success: false, message: 'Failed to submit form' });
    }
};

module.exports = { submitForm };
