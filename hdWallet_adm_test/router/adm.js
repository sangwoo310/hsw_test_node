const taskkill = require('taskkill');
const tasklist = require('tasklist');

const eth_adm = require('../lib/eth/eth_adm');
const bit_adm = require('../lib/bit/bit_adm');

module.exports = (app) => {

    app.get('/close', (req, res) => {
        process.exit(0);
    });
    
    app.get('/bitCreateWallet/:coin', async (req, res) => {
        let coin = req.params.coin;
        let docs = {};

        let admWallet = await bit_adm.newAccount(coin);
        
        docs.admKey = admWallet.key;
        docs.mnemonicWords = admWallet.mnemonicWords;
        docs.hdPrivateKey = admWallet.hdPrivateKey;
        docs.childPrivateKey = admWallet.childPk;
        docs.childPublicKey = admWallet.childPubKey;
        docs.address = admWallet.addr;

        res.end(JSON.stringify(docs));
        return true;
    });

    app.get('/ethCreateWallet', async (req, res) => {
        let docs = {};

        let admWallet = await eth_adm.newAccount();
        
        let admKey = admWallet.admKey;
        let mnemonicWords = admWallet.mnemonicWords;
        let address = admWallet.keypairHD.getAddress(0);
        let privateKey = (admWallet.keypairHD.getPrivateKey(0)).toString('hex');
        
        console.log("admKey :: " + admKey);
        console.log("mnemonic :: " + mnemonicWords);
        console.log("address :: " + address);
        console.log("privatKey :: " + privateKey);

        docs.admKey = admKey;
        docs.mnemonicWords = mnemonicWords;
        docs.address = address;
        docs.privateKey = privateKey;

        res.end(JSON.stringify(docs));
        return true;
    });


    app.post('/bitSignTx', async (req, res) => {
        let to = req.body.to;
        let amt = req.body.amt;
        let key = req.body.key;
        let useKey = req.body.useKey;
        let coin = req.body.coin;
        let keyInfo;
        let fromAddr;
        let pk;

        if(useKey == "admKey") {
            keyInfo = await bit_adm.getAdmKey(coin, key);
            fromAddr = keyInfo.address;
            pk = keyInfo.privateKey;
        } else if(useKey == "mnemonic") {
            keyInfo = await bit_adm.getMnemonicKey(coin, key);
            fromAddr = keyInfo.address;
            pk = keyInfo.privateKey;
        }
        
        let rawTx = await bit_adm.signTx(fromAddr, to, amt, pk);
        res.end(String(rawTx));
        return true;

    });

    app.post('/ethSignTx', async (req, res) => {
        let to = req.body.to;
        let amt = req.body.amt;
        let key = req.body.key;
        let useKey = req.body.useKey;
        let keyInfo;
        let fromAddr;
        let pk;

        if(useKey == "admKey") {
            keyInfo = await eth_adm.getAdmKey(key);
            fromAddr = keyInfo.address;
            pk = keyInfo.privateKey;
        } else if(useKey == "mnemonic") {
            keyInfo = await eth_adm.getMnemonicKey(key);
            fromAddr = keyInfo.address;
            pk = keyInfo.privateKey;
        }

        let rawTx = await eth_adm.signTx(fromAddr, to, amt, pk);
        res.end(String(rawTx));
        return true;
    });

    app.post('/bitSendTx', async (req, res) => {
        let rawTx = req.body.rawTx;
        let txId = await bit_adm.sendTx(rawTx);

        res.end(JSON.stringify(txId));
        return true;
    });

    app.post('/ethSendTx', async (req, res) => {
        let rawTx = req.body.rawTx;
        let txId = await eth_adm.sendTx(rawTx);

        res.end(JSON.stringify(txId.transactionHash));
        return true;
    });

}