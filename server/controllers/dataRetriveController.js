const dataRetriveModel = require('../models/dataRetriveModel');
const ExcelJS = require('exceljs');  // <-- Import ExcelJS

async function getDataController(req, res) {
    try {
        const data = await dataRetriveModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).send('Error retrieving data');
    }
}
async function exportExcelController(req, res) {
    try {
        const data = await dataRetriveModel.getData();
        
        // Create a new workbook and a new worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Production Data');

        // Define columns
        worksheet.columns = [
            { header: 'EPF Number', key: 'epf_number', width: 15 },
            { header: 'Date of Production', key: 'date_of_production', width: 20 },
            { header: 'Production Division', key: 'production_division', width: 20 },
            { header: 'Packing Item 1', key: 'packing_item_1', width: 15 },
            { header: 'Packing Type 1', key: 'packing_type_1', width: 15 },
            { header: 'Packing Qty 1', key: 'packing_qty_1', width: 15 },
            { header: 'Packing Hrs 1', key: 'packing_hrs_1', width: 15 },
            { header: 'SAP Code 1', key: 'sap_code_1', width: 15 },
            { header: 'Packing Item 2', key: 'packing_item_2', width: 15 },
            { header: 'Packing Type 2', key: 'packing_type_2', width: 15 },
            { header: 'Packing Qty 2', key: 'packing_qty_2', width: 15 },
            { header: 'Packing Hrs 2', key: 'packing_hrs_2', width: 15 },
            { header: 'SAP Code 2', key: 'sap_code_2', width: 15 },
            { header: 'Packing Item 3', key: 'packing_item_3', width: 15 },
            { header: 'Packing Type 3', key: 'packing_type_3', width: 15 },
            { header: 'Packing Qty 3', key: 'packing_qty_3', width: 15 },
            { header: 'Packing Hrs 3', key: 'packing_hrs_3', width: 15 },
            { header: 'SAP Code 3', key: 'sap_code_3', width: 15 },
            { header: 'Packing Item 4', key: 'packing_item_4', width: 15 },
            { header: 'Packing Type 4', key: 'packing_type_4', width: 15 },
            { header: 'Packing Qty 4', key: 'packing_qty_4', width: 15 },
            { header: 'Packing Hrs 4', key: 'packing_hrs_4', width: 15 },
            { header: 'SAP Code 4', key: 'sap_code_4', width: 15 },
            { header: 'Packing Item 5', key: 'packing_item_5', width: 15 },
            { header: 'Packing Type 5', key: 'packing_type_5', width: 15 },
            { header: 'Packing Qty 5', key: 'packing_qty_5', width: 15 },
            { header: 'Packing Hrs 5', key: 'packing_hrs_5', width: 15 },
            { header: 'SAP Code 5', key: 'sap_code_5', width: 15 },
            { header: 'Packing Item 6', key: 'packing_item_6', width: 15 },
            { header: 'Packing Type 6', key: 'packing_type_6', width: 15 },
            { header: 'Packing Qty 6', key: 'packing_qty_6', width: 15 },
            { header: 'Packing Hrs 6', key: 'packing_hrs_6', width: 15 },
            { header: 'SAP Code 6', key: 'sap_code_6', width: 15 },
            { header: 'Packing Item 7', key: 'packing_item_7', width: 15 },
            { header: 'Packing Type 7', key: 'packing_type_7', width: 15 },
            { header: 'Packing Qty 7', key: 'packing_qty_7', width: 15 },
            { header: 'Packing Hrs 7', key: 'packing_hrs_7', width: 15 },
            { header: 'SAP Code 7', key: 'sap_code_7', width: 15 }, 
            { header: 'Additional Action 1', key: 'additional_action_', width: 25 },
            { header: 'Loss Time Normal Hrs 1', key: 'loss_time_normal_hrs_1', width: 25 },
            { header: 'Loss Time OT 1', key: 'loss_time_ot_1', width: 15 },
            { header: 'Additional Action 2', key: 'additional_action_2', width: 25 },
            { header: 'Loss Time Normal Hrs 2', key: 'loss_time_normal_hrs_2', width: 25 },
            { header: 'Loss Time OT 2', key: 'loss_time_ot_2', width: 15 },
            { header: 'Additional Action 3', key: 'additional_action_3', width: 25 },
            { header: 'Loss Time Normal Hrs 3', key: 'loss_time_normal_hrs_3', width: 25 },
            { header: 'Loss Time OT 3', key: 'loss_time_ot_3', width: 15 },
            { header: 'Additional Action 4', key: 'additional_action_4', width: 25 },
            { header: 'Loss Time Normal Hrs 4', key: 'loss_time_normal_hrs_4', width: 25 },
            { header: 'Loss Time OT 4', key: 'loss_time_ot_4', width: 15 },
            { header: 'Additional Action 5', key: 'additional_action_5', width: 25 },
            { header: 'Loss Time Normal Hrs 5', key: 'loss_time_normal_hrs_5', width: 25 },
            { header: 'Loss Time OT 5', key: 'loss_time_ot_5', width: 15 },
            { header: 'Additional Action 6', key: 'additional_action_6', width: 25 },
            { header: 'Loss Time Normal Hrs 6', key: 'loss_time_normal_hrs_6', width: 25 },
            { header: 'Loss Time OT 6', key: 'loss_time_ot_6', width: 15 },
            { header: 'Additional Action 7', key: 'additional_action_7', width: 25 },
            { header: 'Loss Time Normal Hrs 7', key: 'loss_time_normal_hrs_7', width: 25 },
            { header: 'Loss Time OT 7', key: 'loss_time_ot_7', width: 15 } 
        ];

        // Add data to worksheet
        data.forEach(item => {
            worksheet.addRow(item);
        });

        // Set response headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=production_data.xlsx');

        // Write the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error('Error exporting data to Excel', err);
        res.status(500).send('Error exporting data');
    }
}

module.exports = { getDataController, exportExcelController };