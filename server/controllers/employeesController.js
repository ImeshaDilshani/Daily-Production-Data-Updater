const Employees = require('../models/employeesModel');

const handleRequest = async (res, employeesMethod, successMessage, failureMessage) => {
  try {
    const result = await employeesMethod();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: failureMessage });
  }
};

const getAllLine = async (req, res) => {
  handleRequest(res, Employees.getAllLine.bind(Employees), 'line fetched successfully', 'Failed to fetch line');
};

const getAllEpfNumber = async (req, res) => {
  handleRequest(res, Employees.getAllEpfNumber.bind(Employees), 'EPF Number fetched successfully', 'Failed to fetch EPF Number');
};

const getAllFullName = async (req, res) => {
  handleRequest(res, Employees.getAllFullName.bind(Employees), 'Full Name fetched successfully', 'Failed to fetch Full Name');
};

const searchEmployees = async (req, res) => {
  const { line, epfNumber, fullName } = req.body;
  try {
    const results = await Employees.search(line, epfNumber, fullName);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch Employees' });
  }
};

module.exports = {
    getAllLine,
    getAllEpfNumber,
    getAllFullName,
    searchEmployees
};
