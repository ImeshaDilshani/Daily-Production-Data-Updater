const db = require('../config/dbConfig');

class Product {
  static async getDistinctValues(column) {
    try {
      const [results] = await db.query(`SELECT DISTINCT ${column} FROM packing_items`);
      return results;
    } catch (error) {
      throw new Error(`Error fetching distinct values for ${column}: ${error.message}`);
    }
  }

  static async getAllPackingItems() {
    return this.getDistinctValues('packing_item');
  }

  static async getAllPackingTypes() {
    return this.getDistinctValues('packing_type');
  }

  static async getAllLines() {
    return this.getDistinctValues('line');
  }

  static async searchPackingItemsByLine(line) {
        try {
            const query = 'SELECT distinct packing_item FROM packing_items WHERE line = ?';
            const [results] = await db.query(query, [line]);
            return results;
        } catch (error) {
            throw new Error(`Error fetching packing items by line: ${error.message}`);
        }
    }

  static async search(packingItem = null, packingType = null, line = null) {
    try {
      let query = 'SELECT sap_code, packing_item, packing_type, description, line FROM packing_items';
      const params = [];

      if (packingItem !== null || packingType !== null || line !== null) {
        query += ' WHERE ';
        const conditions = [];

        if (packingItem !== null) {
          conditions.push('packing_item = ?');
          params.push(packingItem);
        }

        if (packingType !== null) {
          conditions.push('packing_type = ?');
          params.push(packingType);
        }

        if (line !== null) {
          conditions.push('line = ?');
          params.push(line);
        }

        query += conditions.join(' AND ');
      }

      const [results] = await db.query(query, params);
      return results;
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}

module.exports = Product;
