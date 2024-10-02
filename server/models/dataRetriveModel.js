const pool = require('../config/dbConfig'); // Adjust the path according to your structure
const db = require('../config/dbConfig');

// Function to retrieve data from the database
async function getData() {
    const sqlQuery = `
        SELECT epf_number, date_of_production, production_division, sap_code,
               packing_qty, packing_hrs, additional_action, loss_time_normal_hrs, loss_time_ot, packing_item, packing_type
        FROM production_data;`; // Replace 'your_table_name' with the actual table name
    try {
        const [rows, fields] = await pool.query(sqlQuery);
        return rows;
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

module.exports = { getData };
