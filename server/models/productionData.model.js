// productionData.model.js

const db = require('../config/dbConfig');

const ProductionData = {
    saveProductionData: (data, callback) => {
        const sql = `
            INSERT INTO p_data (
                epf_number, date_of_production, production_division,
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
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const values = [
            data.epf_number,
            data.date_of_production,
            data.production_division,

            ...data.packing_items, // Array [packing_item_1, packing_item_2, ...]
            ...data.packing_types, // Array [packing_type_1, packing_type_2, ...]
            ...data.sap_codes, // Array [sap_code_1, sap_code_2, ...]

            ...data.packing_qtys, // Array [packing_qty_1, packing_qty_2, ...]
            ...data.packing_hrss, // Array [packing_hrs_1, packing_hrs_2, ...]

            ...data.additional_actions, // Array [additional_action_1, additional_action_2, ...]
            ...data.loss_time_normal_hrss, // Array [loss_time_normal_hrs_1, loss_time_normal_hrs_2, ...]
            ...data.loss_time_ots // Array [loss_time_ot_1, loss_time_ot_2, ...]
        ];

        db.query(sql, values, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = ProductionData;
