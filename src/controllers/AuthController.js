import authService from "../services/AuthService.js";
import {Role} from "../utils/enum.js";

const AuthController = {
    register: async (req, res) => {
        const {email: username, password} = req.body;
        if (!username || !password) {
            res
                .status(400)
                .json({error: "Email or Password fields cannot be empty!"});
            return;
        }
        try {
            await authService.register(username, password)
            res.status(200).json({message: "User created successfully!"});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },

    login: async (req, res) => {
        const {username, password} = req.body;
        if (!username || !password) {
            res
                .status(400)
                .json({error: "Email or Password fields cannot be empty!"});
            return;
        }

        try {
            const existingUser = await authService.login(username, password)
            res.json(existingUser)
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },

    reNewAccessToken: async (req, res) => {
        try {
            const authorizationTokenFromHeader = req.get("Authorization");
            const refreshToken = req.body.refreshToken;
            const response = await authService.reNewAccessToken(authorizationTokenFromHeader, refreshToken)
            res.json(response)
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },

    checkRoleAdmin : async (req, res) => {
        try {
            const authorizationTokenFromHeader = req.get("Authorization");
            res.json({data: await authService.checkRole(authorizationTokenFromHeader, Role.ADMIN)})
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
}

export default AuthController;