import tokenService from "../services/TokenService.js";
import {GenTokenType} from "../utils/constants.js";

const TokenController = {
    getLastToken: async (req, res) => {
        let token = await tokenService.getLastToken();
        res.json({
            token: token
        })
    },
    generateToken: async (req, res) => {
        try {
            let accessToken = await tokenService.generatePatiToken(GenTokenType.MANUAL);

            res.send({token: accessToken});
        } catch (error) {
            res.status(400)
                .send("An error occurred while executing the Puppeteer script.");
        }
    }
}

export default TokenController;