import tokenHelper from "../../helper/TokenHelper.js";
import {Role} from "../../utils/enum.js";

const adminApiPath = ['/token', '/admin/**']

function validatePath(path) {
    for (const value of adminApiPath) {
        if (value.endsWith('/**')) {
            const checkValue = value.substring(0, value.length - 3);
            if (path.includes(checkValue)) {
                return true;
            }
        } else if (path === value) {
            return true
        }
    }
    return false;
}

const AuthFilter = async (req, res, next) => {
    const authorizationTokenFromHeader = req.get("Authorization");
    if (validatePath(req.path)) {
        if (!authorizationTokenFromHeader) {
            res.status(401).json({message: 'Token invalid'})
            return
        }
        const verified = await tokenHelper.verifyToken(authorizationTokenFromHeader)
        if (!verified) {
            res.status(401).json({message: 'Token invalid'})
            return
        }
        const role = verified.role;
        if (!role || role !== Role.ADMIN) {
            res.status(403).json({message: 'FORBIDDEN'})
            return
        }
    }
    next()
}

export default AuthFilter