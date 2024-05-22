import pool from "./pool.js"

'use strict';

const db = async () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log({error: err.message});
        }
        console.log("Connected to MySQL databaseConfig");
        connection.release();
    })
}

export default db;