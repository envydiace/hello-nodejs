import bcrypt from "bcryptjs";

const BcriptHelper = {
    getSalt: async function () {
        return await bcrypt.genSalt(10);
    },
    getHashedPassword: async function (password, salt) {
        return await bcrypt.hash(password, salt);
    },
    getPasswordMatch: async function (password, existingUser) {
        return await bcrypt.compare(
            password,
            existingUser.password
        );
    },
}

export default BcriptHelper;