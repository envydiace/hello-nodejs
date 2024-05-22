import pool from "../databaseConfig/pool.js";

const tableName = "payment_history";
const PaymentHistoryRepository = {
    getAllHistory: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${tableName} `;

            pool.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length ? results : []);
                }
            });
        });
    },
    insertHistory: (record) => {
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
}

export default PaymentHistoryRepository;
