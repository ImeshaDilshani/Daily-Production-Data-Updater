// const db = require('../config/dbConfig');

// const submitForm = async (req, res) => {
//     const {
//         epf_number,
//         date_of_production,
//         production_division,
//         sap_codes,
//         packing_qtys,
//         packing_hrss,
//         additional_actions,
//         loss_time_normal_hrss,
//         loss_time_ots,
//         packing_items,
//         packing_types
//     } = req.body;

//     try {
//         // Convert arrays to JSON strings
//         const sap_codes_json = JSON.stringify(sap_codes);
//         const packing_qtys_json = JSON.stringify(packing_qtys);
//         const packing_hrss_json = JSON.stringify(packing_hrss);
//         const additional_actions_json = JSON.stringify(additional_actions);
//         const loss_time_normal_hrss_json = JSON.stringify(loss_time_normal_hrss);
//         const loss_time_ots_json = JSON.stringify(loss_time_ots);
//         const packing_items_json = JSON.stringify(packing_items);
//         const packing_types_json = JSON.stringify(packing_types);

//         // Insert data into the database
//         const query = `INSERT INTO production_data (epf_number, date_of_production, production_division, sap_code, packing_qty, packing_hrs, additional_action, loss_time_normal_hrs, loss_time_ot, packing_item, packing_type)
//                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//         const params = [
//             epf_number,
//             date_of_production,
//             production_division,
//             sap_codes_json,   // Store JSON string
//             packing_qtys_json,  // Store JSON string
//             packing_hrss_json,  // Store JSON string
//             additional_actions_json, // Store JSON string
//             loss_time_normal_hrss_json, // Store JSON string
//             loss_time_ots_json,  // Store JSON string
//             packing_items_json,  // Store JSON string
//             packing_types_json
//         ];

//         await db.query(query, params);

//         res.status(200).json({ success: true, message: 'Form submitted successfully' });
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         res.status(500).json({ success: false, message: 'Failed to submit form' });
//     }
// };

// module.exports = { submitForm };
