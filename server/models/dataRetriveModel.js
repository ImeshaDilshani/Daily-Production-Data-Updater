const pool = require('../config/dbConfig'); // Adjust the path according to your structure
const db = require('../config/dbConfig');

// Function to retrieve data from the database
async function getData() {
    const sqlQuery = `
        SELECT epf_number, date_of_production, production_division,
               packing_item_1, packing_type_1, sap_code_1, packing_qty_1, packing_hrs_1,
                packing_item_2, packing_type_2, sap_code_2, packing_qty_2, packing_hrs_2,
                packing_item_3, packing_type_3, sap_code_3, packing_qty_3, packing_hrs_3,
                packing_item_4, packing_type_4, sap_code_4, packing_qty_4, packing_hrs_4,
                packing_item_5, packing_type_5, sap_code_5, packing_qty_5, packing_hrs_5,
                packing_item_6, packing_type_6, sap_code_6, packing_qty_6, packing_hrs_6,
                packing_item_7, packing_type_7, sap_code_7, packing_qty_7, packing_hrs_7,
                additional_action_1, loss_time_normal_hrs_1, loss_time_ot_1,
                additional_action_2, loss_time_normal_hrs_2, loss_time_ot_2,
                additional_action_3, loss_time_normal_hrs_3, loss_time_ot_3,
                additional_action_4, loss_time_normal_hrs_4, loss_time_ot_4,
                additional_action_5, loss_time_normal_hrs_5, loss_time_ot_5,
                additional_action_6, loss_time_normal_hrs_6, loss_time_ot_6,
                additional_action_7, loss_time_normal_hrs_7, loss_time_ot_7
        FROM p_data;`; // Replace 'your_table_name' with the actual table name
    try {
        const [rows, fields] = await pool.query(sqlQuery);
        return rows;
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

module.exports = { getData };
