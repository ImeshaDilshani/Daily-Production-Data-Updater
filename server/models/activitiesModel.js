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
        return this.getDistinctValues('activities'); 
    }

    static async search(ActivityName = null) {
        try {
            let query = 'select activity_name from activities'
            const params = [];
            const [results] = await db.query(query, params);
            return results;
        } catch (error) {
            throw new Error(`Error searching Activities:${error.message}`);
        }
    }
}

module.exports = Activities; 
