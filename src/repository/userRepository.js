import pool from "../databaseConfig/pool.js";

const tableName = "users";
const userRepository = {
    checkUserExists: (column, value) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

            pool.query(query, [value], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length ? results[0] : null);
                }
            });
        });
    },
    insertUser: (record) => {
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
    updateRefreshToken : async (userId, refreshToken, expired) => {
        try {
            return new Promise((resolve, reject) => {
                const query = `Update ${tableName} SET refresh_token = '${refreshToken}', expired = '${expired}' where id = '${userId}'`;
                pool.query(query,  (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch {
            return false;
        }
    },
    changeRefreshToken : async (userId, refreshToken) => {
        try {
            return new Promise((resolve, reject) => {
                const query = `Update ${tableName} SET refresh_token = '${refreshToken}' where id = '${userId}'`;
                pool.query(query,  (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch {
            return false;
        }
    }
}

export default userRepository;
