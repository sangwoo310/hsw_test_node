var bs58check = require('bs58check');

module.exports = {
    btgConvert : async (addr) => {
        return new Promise(async (resolve, reject) => {
            var decode = await bs58check.decode(addr);
            decode[0] = 38;
            var convertAddr = await bs58check.encode(decode);
            resolve(convertAddr);
        });
    }
}