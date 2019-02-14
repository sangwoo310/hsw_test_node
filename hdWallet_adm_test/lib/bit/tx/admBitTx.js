const commUtil = require('../../utils/commUtil');

const explorers = require('bitcore-explorers');
const bitcore = require('bitcore-lib');

//const insight = new explorers.Insight('https://insight.bitpay.com'); //btc mainnet
const insight = new explorers.Insight('https://test-insight.bitpay.com'); //btc testnet

module.exports = {
    bitSignTx : async (from, to, amt, fromPk) => {
        return new Promise((resolve, reject) => {
            insight.getUnspentUtxos(from, function(err, docs){
                let utxos = [];
    
                for(let i=0; i<docs.length; i++) {
                    let utxo = {}
    
                    utxo.txId = docs[i].txId;
                    utxo.outputIndex = docs[i].outputIndex;
                    utxo.script = docs[i].script.toString();
                    utxo.satoshis = docs[i].satoshis;
    
                    utxos.push(utxo);
                }
    
                let pk = new bitcore.PrivateKey(fromPk)
            
                let tx = new bitcore.Transaction().from(utxos)
                    .to(to, amt*(10**8)) // toAddr, amt(satoshis)
                    .change(from) // return amt addr
                    .fee(35000)
                    .sign(pk)
                    // .serialize()
    
                resolve(tx);
            });
        });
    },

    bitSendTx : async (rawTx) => {
        let txId = await util.fetch('http://211.214.183.85:7100/sendRawTransaction', {method:'POST', body:rawTx})
        .catch(e => {
            console.log("!!! fetch Error !!!\n"+e);
            return e;
        });

        return txId;
    }
}