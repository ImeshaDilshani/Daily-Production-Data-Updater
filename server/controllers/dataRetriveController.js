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
            { header: 'SAP Code', key: 'sap_code', width: 15 },
            { header: 'Packing Qty', key: 'packing_qty', width: 15 },
            { header: 'Packing Hrs', key: 'packing_hrs', width: 15 },
            { header: 'Additional Action', key: 'additional_action', width: 25 },
            { header: 'Loss Time Normal Hrs', key: 'loss_time_normal_hrs', width: 25 },
            { header: 'Loss Time OT', key: 'loss_time_ot', width: 15 },
            { header: 'Packing Item', key: 'packing_item', width: 20 },
            { header: 'Packing Type', key: 'packing_type', width: 20 },
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