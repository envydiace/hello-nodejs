import cron from "node-cron";
import tokenService from "../services/TokenService.js";
import {GenTokenType} from "../utils/constants.js";

const job = cron.schedule('0 * * * *', () => {
    tokenService.generatePatiToken(GenTokenType.JOB).then(r => {
        console.log("Done cron job")
        //TODO: save log
    });
}, {
    scheduled: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});


export default job;