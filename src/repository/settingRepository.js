import pool from "../databaseConfig/pool.js";

const tableName = "settings";

const SettingRepository = {
    getAllSetting: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${tableName}`;

            pool.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length ? results : null);
                }
            });
        });
    },

    getSettingByKey: async (key) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${tableName} where \`key\` = ?`;

            pool.query(query, [key], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length ? results[0] : null);
                }
            });
        });
    },

    updateSetting: async(data) =>{
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${tableName} SET \`value\` = '${data.value}' where \`key\` = '${data.key}';`;
            pool.query(query,  (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

export default SettingRepository;