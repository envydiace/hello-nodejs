import forge from "node-forge"
const CryptoHelper = {
    decryptPassword : (encryptedPassword) => {

        const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
${process.env.RSA_PRIVATE_KEY}
-----END RSA PRIVATE KEY-----`;
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        return privateKey.decrypt(forge.util.decode64(encryptedPassword), 'RSAES-PKCS1-V1_5');
    }
}

export default CryptoHelper