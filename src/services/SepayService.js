import tokenService from "./TokenService.js";
import axios from "axios";
import {GenTokenType, sepay} from "../utils/constants.js";
import settingService from "./SettingService.js";
import {SettingKey} from "../utils/enum.js";
import paymentHistoryService from "./PaymentHistoryService.js";
import {PaymentHistoryMessage} from "../utils/message.js";

const SepayService = {
    transferDiamond: (reqBody, token) => {
        const {
            id,
            code,
            transferAmount,
            transactionDate
        } = reqBody
        const userId = code.substring(2);
        return new Promise(async (resolve, reject) => {
            let diamondRate = 250
            try {
                const settingDiamondRate = await settingService.getSettingByKey(SettingKey.DIAMOND_RATE);
                if (settingDiamondRate && parseInt(settingDiamondRate.value)) {
                    diamondRate = parseInt(settingDiamondRate.value);
                }
            } catch (error) {
            }
            const diamondAmount = transferAmount / diamondRate;
            if (!token || !token.startsWith(sepay.apiKeyPrefix) || token.substring(sepay.apiKeyPrefix.length) !== process.env.SEPAY_API_KEY) {
                const errorMessage = "Invalid token";
                await paymentHistoryService.savePaymentHistory(id, userId, transferAmount, transactionDate, diamondAmount, diamondRate, false, errorMessage)
                reject(new Error(errorMessage))
                return
            }

            let accessToken = await tokenService.getLastToken();
            const apiUrl = 'https://help.pati.chat/h5user/agentusersendpackage';
            // const apiUrl = 'http://localhost:8080/api/test/payment';
            const params = {
                package: 'com.olaparty.pati.android'
            };
            const headers = {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'user-language': 'en',
                'user-token': accessToken
            };
            const money = diamondAmount * 10;
            const body = "money=" + money + "&" + "uid=" + userId;
            axios.post(apiUrl, body, {headers, params})
                .then(async response => {
                    const success = response.data.success;
                    if (success) {
                        await paymentHistoryService.savePaymentHistory(id, userId, transferAmount, transactionDate, diamondAmount, diamondRate, true, PaymentHistoryMessage.Success)
                        resolve(response.data);
                    } else {
                        let errorMessage = response.data.msg
                        throw Error(errorMessage)
                    }
                })
                .catch(async error => {
                    await paymentHistoryService.savePaymentHistory(id, userId, transferAmount, transactionDate, diamondAmount, diamondRate, false, error.message)
                    tokenService.generatePatiToken(GenTokenType.AUTO).then()
                    reject(error)
                });
        })
    }
}
export default SepayService;