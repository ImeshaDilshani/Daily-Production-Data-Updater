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
    
    // Add a catch-all route at the end of the middleware stack to handle any uncaught errors
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send({ error: 'Something went wrong!' });
});

};

