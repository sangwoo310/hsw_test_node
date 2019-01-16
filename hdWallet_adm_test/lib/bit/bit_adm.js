const bitcore = require('bitcore-lib');

const util = require('../utils/util');
const admKey = require('../adm/admKey');
const admMnemonic = require('../adm/admMnemonic');
const admTx = require('./tx/admTx');

module.exports = {
    newAccount : async (coin) => {
        let docs = {};
        let derivePath = await util.derivePath(coin);

        let rng = await admKey.genKey();
        let key = await admKey.convert(rng);
        let enKey = await admKey.compound(key);
        let buf = await admKey.setBuf(enKey);
        let mnemonicWords = await admMnemonic.newEntropy(buf);
        let mnemonic = await admMnemonic.mnemonic(mnemonicWords);

        let hdPrivateKey = await mnemonic.toHDPrivateKey();
        let childKey = await hdPrivateKey.derive(derivePath);
        
        let wif = childKey.privateKey.toString('hex');
        let addr = new bitcore.PrivateKey(wif).toAddress();
        
        if(coin == "btg") {
            addr = util.btgConvert(addr.toString());
        } else if(coin == "bch") {
            //변환 체계 추가해야함
        }

        docs.admKey = key;
        docs.mnemonicWords = mnemonicWords;
        docs.hdPrivateKey = hdPrivateKey.toString();
        docs.childPubKey = childKey.pblicKey.toString();
        docs.childPk = childKey.privateKey.toString();
        docs.addr = addr;

        return docs;
    },

    getAdmKey : async (coin, key) => {
        //key type = array
        let docs = {};
        let derivePath = await util.derivePath(coin);

        let enKey = await admKey.compound(key);
        let buf = await admKey.setBuf(enKey);
        let mnemonicWords = await admMnemonic.newEntropy(buf);
        let mnemonic = await admMnemonic.mnemonic(mnemonicWords);

        let hdPrivateKey = await mnemonic.toHDPrivateKey();
        let childKey = await hdPrivateKey.derive(derivePath);
        
        let wif = childKey.privateKey.toString('hex');
        let addr = new bitcore.PrivateKey(wif).toAddress();
        
        if(coin == "btg") {
            addr = util.btgConvert(addr.toString());
        } else if(coin == "bch") {
            //변환 체계 추가해야함
        }
        
        docs.address = addr;
        docs.privateKey = childKey.privateKey.toString();

        return docs;
    },

    getMnemonicKey : async (coin, key) => {
        // must be array type key obj !!
        let docs = {};
        let derivePath = await util.derivePath(coin);

        let mnemonic = await admMnemonic.mnemonic(key);

        let hdPrivateKey = await mnemonic.toHDPrivateKey();
        let childKey = await hdPrivateKey.derive(derivePath);
        
        let wif = childKey.privateKey.toString('hex');
        let addr = new bitcore.PrivateKey(wif).toAddress();
        
        if(coin == "btg") {
            addr = util.btgConvert(addr.toString());
        } else if(coin == "bch") {
            //변환 체계 추가해야함
        }

        docs.address = addr;
        docs.privateKey = childKey.privateKey.toString();

        return docs;
    },

    signTx : async (from, to, amt, pk) => {
        return admTx.bitSignTx(from, to, amt, pk);
    },

    sendTx : async (rawTx) => {
        return admTx.ethSendTx(rawTx);
    }
}