import settingService from "../services/SettingService.js";

const SettingController = {
    getAllSetting: async (req, res) => {
        try {
            const settings = await settingService.getAllSetting();
            res.json({settings})
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    getAllAdminSetting: async (req, res) => {
        try {
            const settings = await settingService.getAllSetting();
            res.json({settings})
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    getSettingByKey: async (req, res) => {
        try {
            const key = req.query.key
            if (!key) {
                res.status(400).json({error: 'Invalid key'});
                return
            }
            const setting = await settingService.getSettingByKey(key);
            if (!setting) {
                res.status(400).json({error: 'Setting key not found'});
                return
            }
            res.json({setting})
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    updateSetting : async (req,  res) =>{
        try {
            const updateSetting = await settingService.updateSetting(req.body);
            if (!updateSetting) {
                res.status(400).json({error: 'Update failed'});
                return
            }
            res.json({message : 'success'})
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

export default SettingController;