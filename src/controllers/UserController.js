import userService from "../services/UserService.js";

const UserController = {
    get: async (req, res) => {
        let userId = req.query.userId;
        try {
            const data = await userService.getPatiUserById(userId);
            res.json(data)
        } catch (err) {
            res.status(400).json({
                error: err.error
            })
        }
    }
}

export default UserController;