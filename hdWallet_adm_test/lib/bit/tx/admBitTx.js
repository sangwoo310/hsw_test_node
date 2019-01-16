const util = require('../../utils/util');

const explorers = require('bitcore-explorers');
const bitcore = require('bitcore-lib');

const insight = new explorers.Insight('https://insight.bitpay.com');

module.exports = {
    bitSignTx : async (from, to, amt, fromPk) => {
        insight.getUnspentUtxos(from, function(err, docs){
            let utxos = [];

            for(let i=0; i<docs.length; i++) {
                let utxo = {
                    txId: "",
                    outputIndex : 0,
                    script: "",
                    satoshis: 0
                }

                utxo.txId = dosc[i].txId;
                outputIndex = docs[i].outputIndex;
                script = docs[i].script.toString();
                satoshis = docs[i].satoshis;

                utxos.push(utxo);
            }

            console.log(utxos)

            let pk = new bitcore.PrivateKey(fromPk)
        
            let tx = new bitcore.Transaction().from(utxos)
                .to(to, amt*(10**8)) // toAddr, amt(satoshis)
                .change(from) // return amt addr
                .fee(35000)
                .sign(pk)
                .serialize()

            return tx;
        })
    },

    bitSendTx : async (rawTx) => {
        let txId = await util.fetch('http://211.214.183.85:7500/rawTx', 'POST')
        .catch(e => {
            console.log("!!! fetch Error !!!\n"+e);
            return e;
        });

        return txId;
    }
}