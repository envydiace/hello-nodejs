import dotenv from "dotenv";

dotenv.config({
    path: process.argv[process.argv.length - 1]
})

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

export default config;