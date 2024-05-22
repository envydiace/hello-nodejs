import BcriptHelper from "../helper/BcriptHelper.js";
import userRepository from "../repository/userRepository.js";
import tokenHelper from "../helper/TokenHelper.js";
import moment from "moment-timezone";
import {constants} from "../utils/constants.js";
import CryptoHelper from "../helper/CryptoHelper.js";

const AuthService = {
    register: async (username, password) => {
        const salt = await BcriptHelper.getSalt();
        const hashedPassword = await BcriptHelper.getHashedPassword(password, salt);
        const userAlreadyExists = await userRepository.checkUserExists("username", username);
        if (userAlreadyExists) {
            throw Error("Username already exists")
        } else {
            const refreshToken = tokenHelper.randomToken()
            const user = {
                username,
                password: hashedPassword,
                role: 'GUEST',
                refresh_token: refreshToken
            };
            await userRepository.insertUser(user);
        }
    },
    login: async (username, password) => {
        const existingUser = await userRepository.checkUserExists("username", username);

        if (existingUser) {
            if (!existingUser.password) {
                throw Error("Invalid credentials")
            }

            const decryptedPassword = CryptoHelper.decryptPassword(password);
            const passwordMatch = await BcriptHelper.getPasswordMatch(decryptedPassword, existingUser);

            if (passwordMatch) {
                const refreshToken = tokenHelper.randomToken()
                const userId = existingUser.id;

                const formattedDate = moment.tz(
                    moment.utc().clone().add(process.env.REFRESH_TOKEN_LIFE, 'milliseconds'),
                    constants.timezone
                ).format(constants.dateTimeFormat);

                await userRepository.updateRefreshToken(userId, refreshToken, formattedDate)
                const dataForAccessToken = {
                    userId: userId,
                    username,
                    role: existingUser.role,
                    refreshToken
                };
                const accessToken = await tokenHelper.generateAccessToken(dataForAccessToken);
                return {
                    userId: userId,
                    username,
                    accessToken: accessToken,
                    refreshToken
                }
            } else {
                throw Error("Invalid credentials");
            }
        } else {
            throw Error("Invalid credentials");
        }
    },
    reNewAccessToken: async (accessToken, refreshToken) => {
        if (!accessToken) {
            throw Error('Access token not found!')
        }
        if (!refreshToken) {
            throw Error('Refresh token not found!')
        }
        const decoded = await tokenHelper.decodeToken(accessToken);
        if (!decoded) {
            throw Error('Access token invalid!')
        }
        const userId = decoded.userId;
        const user = await userRepository.checkUserExists("id", userId);
        if (!user) {
            throw Error('User not found!')
        }
        if (user.refresh_token !== refreshToken) {
            throw Error('Refresh token invalid!')
        }
        const expired = user.expired
        if (!expired || expired < new Date()) {
            throw Error('Refresh token expired!')
        }
        const newRefreshToken = tokenHelper.randomToken();
        await userRepository.changeRefreshToken(userId, newRefreshToken)
        const newAccessToken = await tokenHelper.generateAccessToken({
            userId: userId,
            username: user.username,
            role: user.role,
            newRefreshToken
        })
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    },
    checkRole: async (accessToken, role) => {
        const verified = await tokenHelper.decodeToken(accessToken)
        if (!verified) {
            return false;
        }
        return role === verified.role
    }
}

export default AuthService