var bs58check = require('bs58check');

module.exports = {
    btgConvert : async (addr) => {
        var decode = await bs58check.decode(addr);
        decode[0] = 38;
        var convertAddr = await bs58check.encode(decode);
        return convertAddr;
    }
}