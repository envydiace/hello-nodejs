import pool from "../databaseConfig/pool.js";

const tableName = "token";
const TokenRepository = {
    insertToken: (record) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${tableName} SET ?`;
            pool.query(query, [record], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getLastToken: () => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT ${tableName} FROM token ORDER BY created_at desc limit 1`
            pool.query(sql, (err, response) => {
                if (err) reject(err)
                else if (response && response.length > 0) {
                    resolve(response[0].token);
                } else {
                    resolve(null)
                }
            })
        })
    }
}

export default TokenRepository;