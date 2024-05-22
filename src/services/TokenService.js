import Utils from "../utils/Utils.js";
import puppeteer from "puppeteer";
import {Solver} from "@2captcha/captcha-solver";
import tokenRepository from "../repository/tokenRepository.js";
import NodeCache from "node-cache"
import {CacheKey, constants} from "../utils/constants.js";
import settingService from "./SettingService.js";
import {SettingKey} from "../utils/enum.js";

const cache = new NodeCache();

async function generatePatiAccessToken(genTokenType) {
    let accessToken = false;
    let cookies = false;
    const sleep = Utils.sleep;
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        // headless: false,
        // args: ['--disable-features=site-per-process']
    });
    const page = await browser.newPage();
    let code = false;
    let updated_code = false;
    await page.goto("https://www.pati.chat/login");

    let solverKey = '';
    let phoneNumber = '';
    let password = '';
    try {
        solverKey = (await settingService.getSettingByKey(SettingKey.SOLVER)).value;
        phoneNumber = (await settingService.getSettingByKey(SettingKey.PATI_PHONE_NUMBER)).value;
        password = (await settingService.getSettingByKey(SettingKey.PATI_PASSWORD)).value;
    } catch(error) {}
    page.on("response", async (response) => {
        const img_url = response.url();
        if (img_url.startsWith("data:image/png;base64,")) {
            const base64Data = img_url.replace(/^data:image\/png;base64,/, "");
            const solver = new Solver(solverKey);
            solver
                .imageCaptcha({
                    body: base64Data.toString(),
                })
                .then((res) => {
                    code = res.data;
                });
        }
    });

    await page.waitForSelector(".clf-input-tag");
    await page.waitForSelector(".clf-d-btn", {
        visible: true,
        timeout: 2000,
    });
    while (!updated_code) {
        await sleep(100);
        if (code) {
            updated_code = true;
            const inputFields = await page.$$(".clf-input-tag");
            const button = await page.$$(".clf-d-btn");
            if (inputFields.length >= 3) {
                //TODO: get from setting
                await inputFields[0].type(phoneNumber);
                await sleep(100);
                await inputFields[1].type(password);
                await sleep(100);
                await inputFields[2].type(code.toUpperCase());
                await sleep(1000);
                await button[0].click();
                await sleep(1500);
                const client = await page.target().createCDPSession();
                await sleep(500);
                cookies = (await client.send("Network.getAllCookies"))
                    .cookies;
            } else {
                //TODO: handle exception
                console.error(
                    "There are fewer than three input fields with the specified class."
                );
            }
        }
    }
    await browser.close();
    for (const cookie of cookies) {
        if (cookie.name === "userToken") {
            accessToken = cookie.value;
            break;
        }
    }
    let record;
    if (accessToken) {
        record = {
            token: accessToken,
            status: true,
            gen_type: genTokenType
        }
    } else {
        record = {
            token: accessToken,
            status: false,
            gen_type: genTokenType
        }
    }
    await tokenRepository.insertToken(record);
    return accessToken;
}

const TokenService = {
    generatePatiToken: async function (genTokenType) {
        try {
            const lastGenTokenTimeKey = CacheKey.lastGenTokenTimeKey;
            const lastAPICallTime = cache.get(lastGenTokenTimeKey);
            const currentTime = Date.now();

            const waitingTime = constants.genTokenWaitingTime;
            if (!lastAPICallTime || (currentTime - lastAPICallTime > waitingTime)) {
                cache.set(lastGenTokenTimeKey, currentTime);
                return await generatePatiAccessToken(genTokenType);
            } else {
                console.log("No action needed, API recently called");
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getLastToken: async () => {
        return await tokenRepository.getLastToken();
    },
};

export default TokenService;
