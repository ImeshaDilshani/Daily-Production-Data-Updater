const ProductionData = require('../models/productionData.model');

exports.submitProductionData = (req, res) => {
    const data = req.body;
    console.log("Received data:", data); // Check if the request data reaches here
    
    ProductionData.saveProductionData(data, (error, result) => {
        if (error) {
            console.error("Error saving production data:", error);
            return res.status(500).json({ error: 'Error saving production data' });
        }
        console.log("Data saved successfully:", result); // Confirm result
        res.status(201).json({ message: 'Production data saved successfully', data: result });
    });
    

};

