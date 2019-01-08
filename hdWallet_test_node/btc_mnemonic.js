const bip32 = require('bip32');
const bip39 = require('bip39');

// function qq() {
//     return bitcoin.pay
// }

var btc = function() {
    var mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost';
    const seed = bip39.mnemonicToSeed(mnemonic);
    const node = bip32.fromSeed(seed);
    const string = node.toBase58();
    const restored = bip32.fromBase58(string);

    console.log("seed :: "+seed)
    console.log("node ::"+node )
    console.log("string ::"+string);
    console.log("restored :: "+ restored)
}

// btc();

var bitcoin = require('bitcoinjs-lib')
var bitcore = require('bitcore-lib');
  
// 마스터 확장 개인키 생성
var xPriKey = new bitcore.HDPrivateKey();

// 단절된 확장 자식 공개키 생성
var xPubKey = xPriKey.deriveChild("m/44'/1'/0'/0/0").hdPublicKey;

// console.log(xPubKey)
// 0번째 자식 공개키 생성
// var pubKey = xPubKey.deriveChild("m/44'/1'/0'/0/0").publicKey;
// console.log(pubKey)
// console.log(btc.payments.p2pkh({pubKey:pubKey, network: bitcoin.networks.testnet}))
// console.log(pubKey)



var kk = function() {
    const mnemonic = 'swear panther clay turtle coin action spray legal aim drama eight erosion'
    const seed = bip39.mnemonicToSeed(mnemonic)
    console.log(seed)
    const root = bip32.fromSeed(seed)

    // console.log("\n")
    // console.log(root);
    // console.log("\n")
    // console.log(root.privateKey)
    // console.log(root.publicKey.toString('hex'))
    // console.log("\n")

    var addr1 = new bitcore.PrivateKey(root.privateKey.toString('hex')).toAddress();
    console.log("!!!!!!!!!!!!!!");
    console.log(addr1);


    const path = "m/44'/0'/0'/1/0"
    const child = root.derivePath(path)
    // console.log(child)
    console.log("\n")
    console.log(child.privateKey)
    console.log("\n")
    console.log(child.privateKey.toString('hex'))
    console.log("\n")

    console.log("\n")
    console.log("\n")
    console.log("!!!!!")
    console.log(child.publicKey);

    // const { address } = bitcoin.payments.p2sh({
    //   redeem: bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: bitcoin.networks.testnet }),
    //   network: bitcoin.networks.testnet
    // })
    var addr = new bitcore.PrivateKey(child.privateKey.toString('hex')).toAddress();
    console.log(addr)
    // console.log(address)
}

var kk1 = function() {
    const mnemonic = 'ancient abandon abandon fuel abandon abandon abandon abandon abandon hotel abandon xxx'
    const seed = bip39.mnemonicToSeed(mnemonic)
    console.log(seed)
    const root = bip32.fromSeed(seed)
    const path = "m/44'/1'/0'/1/0"
    const child = root.derivePath(path)

    // const path = "m/44'/1'/0'/0/0"
    // const child = root.derivePath(path)

    // const { address } = bitcoin.payments.p2sh({
    //   redeem: bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: bitcoin.networks.testnet }),
    //   network: bitcoin.networks.testnet
    // })
    
    console.log(child.privateKey.toString('hex'))
    var mm = bitcoin.ECPair.fromPrivateKey(child.privateKey);
    // console.log(mm)
    var pk = mm.publicKey.toString('hex')
    var wif = mm.toWIF()
    // console.log(wif)
}

// kk()


var qq = function() {
    const mnemonic = 'ancient abandon abandon fuel abandon abandon abandon abandon abandon hotel abandon xxx'
    const seed = bip39.mnemonicToSeed(mnemonic)
    const root = bip32.fromSeed(seed)

    var priv = root.privateKey
    var utxo = {
        "txId" : "8ce73888d080a7505881daf50623c761f17252cb075900e97d04b3e4c25d0b8c",
        "outputIndex" : 0,
        "address" : "2N9C8GdktJMoCPrY3T2aAKz6dTFsXsubqXC",
        "script" : "a91412ba1cbb2a00ca5245c1f45ff13bfaac0ab1cbb487",
        "satoshis" : 50000
    };

    var tx = new bitcore.Transaction().from(utxo).to('2MtxF73MXzmc5QiH5ey7KTh7HQ2G4T3FEF9',1000).sign(priv)
    console.log(tx);
}


var qq2 = function() {
    var vv = new Buffer('214a531e94eede7bbd483f395d7dbc0880395c5fc22ce99dcb1837b8d0211b42', 'hex')
    console.log(vv)
    var priv = new bitcore.PrivateKey('214a531e94eede7bbd483f395d7dbc0880395c5fc22ce99dcb1837b8d0211b42')
    console.log(priv)
    var pp = new bitcore.Transaction.UnspentOutput({
        "txId" : "8c0b5dc2e4b3047de9005907cb5272f161c72306f5da815850a780d08838e78c",
        "outputIndex" : 0,
        "address" : "2N9C8GdktJMoCPrY3T2aAKz6dTFsXsubqXC",
        "script" : "a914aeebfdce71662d8f3ddd3cba7b0c6abd0902ad4b87",
        "amount" : 0.0001
    })

    console.log(pp)
    console.log("\n")
    
    var tx = new bitcore.Transaction()
    .from(pp)
    .to('2MtxF73MXzmc5QiH5ey7KTh7HQ2G4T3FEF9', 2000)
    .change('2N9C8GdktJMoCPrY3T2aAKz6dTFsXsubqXC')
    .sign(priv)
    console.log(tx);
}


var qq3 = function() {
    var priv = new bitcore.PrivateKey('214a531e94eede7bbd483f395d7dbc0880395c5fc22ce99dcb1837b8d0211b42')
    console.log(priv)
    var pp = {
        "txId" : "8c0b5dc2e4b3047de9005907cb5272f161c72306f5da815850a780d08838e78c",
        "outputIndex" : 0,
        "address" : "2N9C8GdktJMoCPrY3T2aAKz6dTFsXsubqXC",
        "script" : "a914aeebfdce71662d8f3ddd3cba7b0c6abd0902ad4b87",
        "amount" : 0.001
    }

    var tx = new bitcore.Transaction()
    .from(pp)
    .to('2MtxF73MXzmc5QiH5ey7KTh7HQ2G4T3FEF9', 20000)
    .change('2N9C8GdktJMoCPrY3T2aAKz6dTFsXsubqXC')
    .sign(priv)
    console.log(tx);
}

var qq4 = function(){
    var privateKey = new bitcore.PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
    var utxo = {
    "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
    "outputIndex" : 0,
    "address" : "17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV",
    "script" : "76a914d2a94d654b939a1a49139dcba3fcf621591fd9eb88ac",
    "satoshis" : 50000
    };

    var transaction = new bitcore.Transaction()
  .from(utxo)
  .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
  .sign(privateKey);
  console.log(transaction)
}

var qq5 = function(){
    var vv = new Buffer('a31b6bdcab97691585d2d0235ba9d332c836a3b43f9c6dfa3ee267d071ed0055', 'hex')
    console.log(vv)
    var privateKey = new bitcore.PrivateKey('L2gmbrWaRYfL1CFyfcq9V7LmWcwdRXZtxhEGum5ZVGhZkfkXs6Yn');
    console.log(privateKey)
    var utxo = {
        "txId" : "99e2259b29aefd4770035da36683641c4108147d582a6405c721515fb5201e3b",
        "outputIndex" : 0,
        "address" : "1Nriqgs46NGBM4PW9CiD64tRtHPVBQp5nx",
        "script" : "76a914efc1f30b2ef8fdcdf63669db82dc4c13718aaac488ac",
        "vout" : 0,
        "satoshis" : 3000000
    };

    var transaction = new bitcore.Transaction()
    .from(utxo)
    .to('1465PBf27LX5mRCR8qNRhvtno5gQJBi91x', 2970000)
    .change('1Nriqgs46NGBM4PW9CiD64tRtHPVBQp5nx')
    .sign("L2gmbrWaRYfL1CFyfcq9V7LmWcwdRXZtxhEGum5ZVGhZkfkXs6Yn")
    .serialize()
    // .verify();
    // .getFee()
    console.log(transaction)
    // transaction = new bitcore.Transaction().fee(2000)
    // console.log(transaction)

}

var qq00 = function(){
    // var wif = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy'
    // var wif = 'KxLRV1BpKk2FY3Q5egFNx9zKwAogk6o72ztmdgMYNxyyhsmTEHbd'
    // var wif = '214a531e94eede7bbd483f395d7dbc0880395c5fc22ce99dcb1837b8d0211b42'
    var wif = 'ed69a4ea0c3bbb341eaf5fc32154cbc7574df0d03bbb0c547da886843882334e'
    var addr = new bitcore.PrivateKey(wif).toAddress();
    console.log(addr)

}

qq5();
// qq00()

var zz = function(){
    var Bitcore = require('bitcore-lib');
  
    // 마스터 확장 개인키 생성
    var xPriKey = new Bitcore.HDPrivateKey();
    console.log('masterKey :: '+xPriKey);

    // 단절된 확장 자식 공개키 생성
    var xPubKey = xPriKey.deriveChild("m/44'/60'/0'").hdPublicKey;

    console.log(xPubKey)
    // 0번째 자식 공개키 생성
    var pubKey = xPubKey.deriveChild("m/0/0").publicKey;

    console.log(pubKey)
}

var zz2 = function(){
    var Mnemonic = require('bitcore-mnemonic')
    // 니모닉 코드 생성
    var code = new Mnemonic(Mnemonic.Words.ENGLISH);
    console.log(code);
    // 니모닉 코드에서 개인키 생성
    var xPriKey = code.toHDPrivateKey();
    console.log("pk :: "+xPriKey);

    // var xPubKey = xPriKey.deriveChild("m/44'/0'/0'").hdPublicKey;
    var child = xPriKey.deriveChild("m/44'/0'/0'/0/0'");
    console.log("!!!!!!!!!!!!!")
    console.log(child)

    var addr = new bitcore.PrivateKey(child.privateKey.toString('hex')).toAddress();
    console.log("@@@@@@@@@@")
    console.log(addr)



    // // 단절된 확장 자식 공개키 생성
    // var xPubKey = xPriKey.deriveChild("m/44'/0'/0'").hdPublicKey;
    // var xPubKey2 = xPriKey.deriveChild("m/44'/0'/0'")

    // console.log("pubKey :: "+xPubKey)
    // // 0번째 자식 공개키 생성
    // var pubKey = xPubKey.deriveChild("m/0/0").publicKey;
    // console.log(pubKey)

}

// zz2();

var gg = function(){
    var Mnemonic = require('bitcore-mnemonic');
    // var EthereumBip44 = require('ethereum-bip44');
    
    var secret = "swear panther clay turtle coin action spray legal aim drama eight erosion";
    var code = new Mnemonic(secret, Mnemonic.Words.ENGLISH);
    console.log(code.toString());
    
    var HDPrivateKey = code.toHDPrivateKey();
    var derivedPubKey = HDPrivateKey.derive("m/44'/0'/0'/1").hdPublicKey;
    // var child = HDPrivateKey.derive("m/44'/0'/0'/0/0") //BTC 진짜 정상 제대로 되는 값
    var child = HDPrivateKey.derive("m/44'/156'/0'/0/0") 
    
    
    // console.log(derivedPubKey.toString());
    console.log('\n\n')
    console.log(HDPrivateKey)
    // console.log(derivedPubKey)
    console.log(child.hdPublicKey);
    console.log(child.publicKey);
    // console.log(derivedPubKey.privateKey)
    console.log(child.privateKey)

    var test = Buffer.from(child.privateKey.toString('hex'),'hex')
    // console.log(test)
    

    var wif = child.privateKey.toString('hex');
    var addr = new bitcore.PrivateKey(wif).toAddress();
    console.log(addr)


    
    
    // console.log(buf)

    // const { address } = bitcoin.payments.p2sh({
    // //   redeem: bitcoin.payments.p2wpkh({ pubkey: derivedPubKey.publicKey, network: bitcoin.networks.livenet }),
    //   redeem: bitcoin.payments.p2wpkh({ pubkey: buf, network: bitcoin.networks.livenet }),
    //   network: bitcoin.networks.livenet
    // })

    // console.log(address)

    
    // // create the hd wallet
    // var wallet = EthereumBip44.fromPublicSeed(derivedPubKey.toString());
    
    // console.log("Public addresses:");
    // // output the first address
    // console.log(wallet.getAddress(0));
    // // output the second address
    // console.log(wallet.getAddress(1))
    
}
// gg()


var bb = function(){
    // 니모닉단어 -> HD key -> address (pk)
    var Mnemonic = require('bitcore-mnemonic'); //이더리움 default path m/44'/60'/0'/0
    
    // 복원용 니모닉 단어
    var words = "swear panther clay turtle coin action spray legal aim drama eight erosion";

    // 니모닉 단어로 부터 HDPrivateKey 복원
    var xPriKey = Mnemonic(words).toHDPrivateKey();
    console.log(xPriKey.toString());
}

// bb();






//비트코인
var btc = function(){
    var Mnemonic = require('bitcore-mnemonic');
    // var EthereumBip44 = require('ethereum-bip44');
    
    var secret = "swear panther clay turtle coin action spray legal aim drama eight erosion";
    var code = new Mnemonic(secret, Mnemonic.Words.ENGLISH);
    console.log(code.toString());
    
    var HDPrivateKey = code.toHDPrivateKey();
    var derivedPubKey = HDPrivateKey.derive("m/44'/0'/0'/1").hdPublicKey;
    var child = HDPrivateKey.derive("m/44'/0'/0'/0/0") //BTC 진짜 정상 제대로 되는 값
    // var child = HDPrivateKey.derive("m/44'/156'/0'/0/0") 
    
    
    // console.log(derivedPubKey.toString());
    console.log('\n\n')
    console.log(HDPrivateKey)
    // console.log(derivedPubKey)
    console.log(child.hdPublicKey);
    console.log(child.publicKey);
    // console.log(derivedPubKey.privateKey)
    console.log(child.privateKey)

    var test = Buffer.from(child.privateKey.toString('hex'),'hex')
    // console.log(test)
    

    var wif = child.privateKey.toString('hex');
    var addr = new bitcore.PrivateKey(wif).toAddress();
    console.log(addr)

}


//비트골드
var btg = function(){
    var Mnemonic = require('bitcore-mnemonic');
    // var EthereumBip44 = require('ethereum-bip44');
    
    var secret = "swear panther clay turtle coin action spray legal aim drama eight erosion";
    var code = new Mnemonic(secret, Mnemonic.Words.ENGLISH);
    console.log(code.toString());
    
    var HDPrivateKey = code.toHDPrivateKey();
    var derivedPubKey = HDPrivateKey.derive("m/44'/0'/0'/1").hdPublicKey;
    // var child = HDPrivateKey.derive("m/44'/0'/0'/0/0") //BTC 진짜 정상 제대로 되는 값
    var child = HDPrivateKey.derive("m/44'/156'/0'/0/0") 
    
    
    // console.log(derivedPubKey.toString());
    console.log('\n\n')
    console.log(HDPrivateKey)
    // console.log(derivedPubKey)
    console.log(child.hdPublicKey);
    console.log(child.publicKey);
    // console.log(derivedPubKey.privateKey)
    console.log(child.privateKey)

    var test = Buffer.from(child.privateKey.toString('hex'),'hex')
    // console.log(test)
    

    var wif = child.privateKey.toString('hex');
    var addr = new bitcore.PrivateKey(wif).toAddress();
    console.log(addr)

    var bs58check = require('bs58check');

    var decode = bs58check.decode(addr.toString());
    console.log(decode)
    decode[0] = 38;
    var lastAddr = bs58check.encode(decode)
    console.log(lastAddr)
   
    //하드포크 이후는 비트코인주소에서 bs58
}


//비트캐쉬
var bch = function(){
    var Mnemonic = require('bitcore-mnemonic');
    // var EthereumBip44 = require('ethereum-bip44');
    
    // var secret = "swear panther clay turtle coin action spray legal aim drama eight erosion";
    var secret = "abandon panther clay turtle coin action spray legal aim drama eight erosion";
    var code = new Mnemonic(secret, Mnemonic.Words.ENGLISH);
    console.log(code.toString());
    
    var HDPrivateKey = code.toHDPrivateKey();
    var derivedPubKey = HDPrivateKey.derive("m/44'/0'/0'/1").hdPublicKey;
    // var child = HDPrivateKey.derive("m/44'/0'/0'/0/0") //BTC 진짜 정상 제대로 되는 값
    var child = HDPrivateKey.derive("m/44'/145'/0'/0/0") 
    
    
    // console.log(derivedPubKey.toString());
    console.log('\n\n')
    console.log(HDPrivateKey)
    // console.log(derivedPubKey)
    console.log(child.hdPublicKey);
    console.log(child.publicKey);
    // console.log(derivedPubKey.privateKey)
    console.log(child.privateKey)

    var wif = child.privateKey.toString('hex');
    var addr = new bitcore.PrivateKey(wif).toAddress();
    console.log(addr)
}

// btg();
// bch();