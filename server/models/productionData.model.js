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
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const values = [
            data.epf_number,
            data.date_of_production,
            data.production_division,
            data.packing_item_1, data.packing_type_1, data.sap_code_1, data.packing_qty_1, data.packing_hrs_1,
            data.packing_item_2, data.packing_type_2, data.sap_code_2, data.packing_qty_2, data.packing_hrs_2,
            data.packing_item_3, data.packing_type_3, data.sap_code_3, data.packing_qty_3, data.packing_hrs_3,
            data.packing_item_4, data.packing_type_4, data.sap_code_4, data.packing_qty_4, data.packing_hrs_4,
            data.packing_item_5, data.packing_type_5, data.sap_code_5, data.packing_qty_5, data.packing_hrs_5,
            data.packing_item_6, data.packing_type_6, data.sap_code_6, data.packing_qty_6, data.packing_hrs_6,
            data.packing_item_7, data.packing_type_7, data.sap_code_7, data.packing_qty_7, data.packing_hrs_7,
            data.additional_action_1, data.loss_time_normal_hrs_1, data.loss_time_ot_1,
            data.additional_action_2, data.loss_time_normal_hrs_2, data.loss_time_ot_2,
            data.additional_action_3, data.loss_time_normal_hrs_3, data.loss_time_ot_3,
            data.additional_action_4, data.loss_time_normal_hrs_4, data.loss_time_ot_4,
            data.additional_action_5, data.loss_time_normal_hrs_5, data.loss_time_ot_5,
            data.additional_action_6, data.loss_time_normal_hrs_6, data.loss_time_ot_6,
            data.additional_action_7, data.loss_time_normal_hrs_7, data.loss_time_ot_7
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
