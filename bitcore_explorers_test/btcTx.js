var explorers = require('bitcore-explorers');
var bitcore = require('bitcore-lib');

var insight = new explorers.Insight('https://insight.bitpay.com');

insight.getUnspentUtxos('1P8Kzdyh8HwF75rTgi4vMqcr6c9nvkhp1x', function(err, docs){
    console.log(docs[0])
    var utxo = [{
        txId: docs[0].txId,
        outputIndex : docs[0].outputIndex,
        script: docs[0].script.toString(),
        satoshis: docs[0].satoshis
    }, {
        txId: docs[1].txId,
        outputIndex : docs[1].outputIndex,
        script: docs[1].script.toString(),
        satoshis: docs[1].satoshis
    }]
console.log("\n\n\n\n")
console.log(utxo)
console.log("\n\n\n\n")
    var pk = new bitcore.PrivateKey('cf7262369f482555f24e73ec833ae2dd725e2d0e1a2d9ba2012275e91d3251cd')

    var tx = new bitcore.Transaction().from(utxo)
     .to('36QfRHohTDyGo3K6LM7U7zF292DA9p9ovj', 10000)
    .change('1P8Kzdyh8HwF75rTgi4vMqcr6c9nvkhp1x')
    .fee(25000)
    .sign(pk)
    .serialize()

    console.log("11111")
    console.log(pk)
    console.log("222222")
    console.log(tx)
})