import jwt from "jsonwebtoken";
import randToken from "rand-token";

const TokenHelper = {
    generateAccessToken: async (payload) => {
        try {
            const secretKey = process.env.JWT_SECRET;
            const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
            return await jwt.sign(payload, secretKey, {algorithm: 'HS256', expiresIn: accessTokenLife});
        } catch (error) {
            console.log(`Error in generate access token:  + ${error}`);
            return null;
        }
    },
    verifyToken: async (token) => {
        try {
            if (!token) {
                console.log(`Error in verify access token: null access token`);
                return null
            }
            if (!token.startsWith("Bearer")) {
                console.log('invalid token')
                return null
            }
            const secretKey = process.env.JWT_SECRET;
            return await jwt.verify(token.substring(7), secretKey);
        } catch (error) {
            console.log(`Error in verify access token:  + ${error}`);
            return null;
        }
    },
    decodeToken: async (token) => {
        try {
            if (!token) {
                console.log(`Error in verify access token: null access token`);
                return null
            }
            if (!token.startsWith("Bearer")) {
                console.log('invalid token')
                return null
            }
            const secretKey = process.env.JWT_SECRET;
            return await jwt.verify(token.substring(7), secretKey, {
                ignoreExpiration: true,
            });
        } catch (error) {
            console.log(`Error in decode access token: ${error}`);
            return null;
        }
    },
    randomToken: () => {
        return randToken.generate(process.env.REFRESH_TOKEN_SIZE);
    }
}

export default TokenHelper;