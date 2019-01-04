const mnemonic = require('bitcore-mnemonic');
const ethereumBip44 = require('ethereum-bip44');

const chart = require('./chart');
const util = require('./utils/util');

const keyList = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const ranCheck = (ranArr, rnum) => {
    for(let i=0; i<ranArr.length; i++) {
        if(ranArr[i] == rnum) {
            return false;
        }
    }
    return true;
}

const genRanNum = () => {
    return new Promise( async (resolve, reject) => {
        var ranCheckArr = [];
        var ranArr = [];
        while(true) {
            if(ranArr.length == 6) {
                resolve(ranArr);
                break;
            } else {
                var rnum = Math.floor(Math.random() * 62); //난수발생
                var checkNum = await ranCheck(ranCheckArr, rnum);
                if(checkNum) {
                    ranCheckArr.push(rnum);
                    ranArr.push(keyList[rnum]);
                } else {
                    continue;
                }
            }
        }
    });
}

const convert = async (arr) => {
    var conNum = 1;
    var conArr = [];
    var convertArr = [];

    for(let i=0; i<6; i++) {
        var switchNum = i+conNum;
        var tempArr1 = [];
        var tempArr2 = [];

        if(i+conNum >= 6) {
            switchNum = switchNum%6
        }
        await tempArr1.push(await util.getArrIndex(keyList, arr[i]));
        await tempArr1.push(await util.getArrIndex(keyList, arr[switchNum]));
        await tempArr2.push(await util.getArrIndex(keyList, arr[switchNum]));
        await tempArr2.push(await util.getArrIndex(keyList, arr[i]))
        await conArr.push(tempArr1);
        await conArr.push(tempArr2);
    }

    for(let i=0; i<12; i++) {
        await convertArr.push(chart[conArr[i][0]][conArr[i][1]]);
    }

    return convertArr;
}

const makeWord = async () => {
    var generalate = await genRanNum();
    console.log(generalate)
    convertArr = await convert(generalate);
    console.log(convertArr);

    var words = "";

    for(let i=0; i<convertArr.length; i++) {
        words += " "+convertArr[i];
    }

    console.log('mnemonic: ' + words);
 
    const seed = bip39.mnemonicToSeed(words);
    const m = bip32.fromSeedBuffer(seed);
    const keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs();
    const key = ripple.KeyPair.from_json(keyPair.privateKey.substring(2));
 
    console.log('privateKey: ' + keyPair.privateKey)
    console.log('privateKeyWif: ' + key.to_pri_string()) // to_wif
    console.log('publicKey: ' + keyPair.publicKey)
    console.log('address: ' + key.to_address_string())

    return true;
}

makeWord();
