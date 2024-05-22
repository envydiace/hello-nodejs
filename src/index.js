import express from "express";
import router from "./router/route.js";
import job from "./Cronjob/cron.js";
import cors from "cors";
import dotenv from 'dotenv'
import db from "./databaseConfig/db.js";

dotenv.config({
  path: process.argv[process.argv.length - 1]
})

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
};

app.use(cors(corsOpts));

// job.start();

app.use("/api", router)

await db();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});