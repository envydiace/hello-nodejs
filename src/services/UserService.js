import tokenService from "./TokenService.js";
import axios from "axios";
import {GenTokenType, PatiError} from "../utils/constants.js";
import {GetUserMessage} from "../utils/message.js";

const UserService = {
    getPatiUserById: (userId) => {
        return new Promise(async (resolve, reject) => {
            let accessToken = await tokenService.getLastToken();
            const headers = {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                'user-language': 'en',
                'user-token': accessToken
            };
            const apiUrl = 'https://help.pati.chat/h5user/agentusertoinfo';

            const params = {
                touid: userId ? userId.toString() : '',
                package: 'com.olaparty.pati.android'
            };
            axios.get(apiUrl, {headers, params})
                .then(async response => {
                    const success = response.data.success;
                    if (success) {
                        resolve(response.data.data);
                    } else {
                        let errorMessage = response.data.msg
                        if (errorMessage === PatiError.loginRequired) {
                            const accessToken = await tokenService.generatePatiToken(GenTokenType.AUTO);
                            if (!accessToken) {
                                errorMessage = GetUserMessage.TryAgain
                                reject({error: errorMessage});
                                return
                            }
                            const headers = {
                                'accept': 'application/json, text/plain, */*',
                                'accept-language': 'en-US,en;q=0.9',
                                'content-type': 'application/json',
                                'user-language': 'en',
                                'user-token': accessToken
                            };
                            await axios.get(apiUrl, {headers, params})
                                .then(async response => {
                                    const success = response.data.success;
                                    if (success) {
                                        resolve(response.data.data);
                                    } else {
                                        let errorMessage = response.data.msg
                                        if (errorMessage === PatiError.loginRequired) {
                                            errorMessage = GetUserMessage.TryAgain
                                        }
                                        reject({error: errorMessage});
                                    }
                                })
                                .catch(error => {
                                    reject({error: error.message});
                                });
                        } else {
                            reject({error: errorMessage});
                        }
                    }
                })
                .catch(error => {
                    reject({error: error.message});
                });
        })
    }
}

export default UserService;