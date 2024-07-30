const Product = require('../models/productModel');

const handleRequest = async (res, productMethod, successMessage, failureMessage) => {
  try {
    const result = await productMethod();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: failureMessage });
  }
};

const getAllPackingItems = async (req, res) => {
  handleRequest(res, Product.getAllPackingItems.bind(Product), 'Packing items fetched successfully', 'Failed to fetch packing items');
};

const getAllPackingTypes = async (req, res) => {
  handleRequest(res, Product.getAllPackingTypes.bind(Product), 'Packing types fetched successfully', 'Failed to fetch packing types');
};

const getAllLines = async (req, res) => {
  handleRequest(res, Product.getAllLines.bind(Product), 'Lines fetched successfully', 'Failed to fetch lines');
};

const searchProducts = async (req, res) => {
  const { packingItem, packingType, lines } = req.body;
  try {
    const results = await Product.search(packingItem, packingType, lines);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

const getPackingItemsByLine = async (req, res) => {
    const { line } = req.query; 
    console.log(line)
    try {
        const result = await Product.searchPackingItemsByLine(line);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch packing items by line' });
    }
};

module.exports = {
  getAllPackingItems,
  getAllPackingTypes,
  getAllLines,
  searchProducts,
  getPackingItemsByLine
};
