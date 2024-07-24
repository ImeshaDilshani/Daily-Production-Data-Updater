const db = require('../config/dbConfig');

class Employees {
  static async getDistinctValues(column) {
    try {
      const [results] = await db.query(`SELECT DISTINCT ${column} FROM employees`);
      return results;
    } catch (error) {
      throw new Error(`Error fetching distinct values for ${column}: ${error.message}`);
    }
  }
  static async getAllLine() {
    return this.getDistinctValues('line');
  }
  static async getAllEpfNumber() {
    return this.getDistinctValues('epf_number');
  }

  static async getAllFullName() {
    return this.getDistinctValues('full_name');
  }

  static async search(line = null, epfNumber = null, fullName = null) {
    try {
      let query = 'SELECT line, epf_number, full_name FROM employees';
      const params = [];

      if (line!== null || epfNumber!== null || fullName!== null ) {
        query += ' WHERE ';
        const conditions = [];

        if (line !== null) {
          conditions.push('line = ?');
          params.push(line);
        }

        if (epfNumber !== null) {
            conditions.push('epf_number = ?');
            params.push(epfNumber);
        }

        if (fullName !== null) {
            conditions.push('full_name = ?');
            params.push(fullName);
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

module.exports = Employees;
