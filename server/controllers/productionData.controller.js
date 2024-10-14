// productionData.controller.js

const ProductionData = require('../models/productionData.model');

exports.submitProductionData = (req, res) => {
    const data = req.body;

    // Destructure and check lengths
    const { packing_items, packing_types, sap_codes, packing_qtys, packing_hrss, additional_actions, loss_time_normal_hrss, loss_time_ots } = data;

    // Ensure arrays have the same length (7 for packing and 7 for additional actions)
    if (
        packing_items.length !== 7 ||
        packing_types.length !== 7 ||
        sap_codes.length !== 7 ||
        packing_qtys.length !== 7 ||
        packing_hrss.length !== 7 ||
        additional_actions.length !== 7 ||
        loss_time_normal_hrss.length !== 7 ||
        loss_time_ots.length !== 7
    ) {
        return res.status(400).json({ error: 'Inconsistent or incomplete data lengths' });
    }

    // Save the data
    ProductionData.saveProductionData(data, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to save production data' });
        }
        return res.status(200).json({ message: 'Production data saved successfully', data: result });
    });
};
