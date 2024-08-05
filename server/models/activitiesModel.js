const db = require('../config/dbConfig');

class Activities {
    static async getDistinctValues(column) {
        try {
            const [results] = await db.query(`SELECT DISTINCT ${column} FROM activities`);
            return results;
        } catch (error) {
            throw new Error(`Error fetching distinct values for ${column}: ${error.message}`);
        }
    }

    static async getAllActivityName() {
        return this.getDistinctValues('activity_name');
    }
}

module.exports = Activities;
