import settingRepository from "../repository/settingRepository.js";

const SettingService = {

    getAllSetting: async () => {
        let results = [];
        const settings = await settingRepository.getAllSetting()
        settings.map(setting => {
            results.push({
                key: setting.key,
                value: setting.value,
                name: setting.name
            })
        });
        return results;
    },

    getSettingByKey: async (key) => {
        return await settingRepository.getSettingByKey(key)
    },

    updateSetting: async (fields) =>{
        return fields.map(async field => {
            return await settingRepository.updateSetting(field);
        });
    }
}

export default SettingService;