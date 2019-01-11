const doFetch = require('node-fetch');
var bs58check = require('bs58check');

const ranCheck = (ranArr, rnum) => {
    for(let i=0; i<ranArr.length; i++) {
        if(ranArr[i] == rnum) {
            return false;
        }
    }
    return true;
}

module.exports = {
    fetch : (url, method) => {
        return doFetch(url, {method: method})
        .then(__docs => {
            return __docs.json();
        }).then(_docs => {
            return _docs;
        }).catch((err) => {
            console.error(err)
            throw err
        });
    },

    genRanNum : () => {
        return new Promise( async (resolve, reject) => {
            let ranCheckArr = [];
            while(true) {
                if(ranCheckArr.length == 6) {
                    resolve(ranCheckArr);
                    break;
                } else {
                    let rnum = Math.floor(Math.random() * 16); //난수발생
                    let checkNum = await ranCheck(ranCheckArr, rnum);
                    if(checkNum) {
                        ranCheckArr.push(rnum);
                    } else {
                        continue;
                    }
                }
            }
        });
    },

    derivePath : coin => {
        let derivePath = "";

        if(coin == "btc") {
            derivePath = "m/44'/0'/0'/0/0";
        } else if(coin == "bch") {
            derivePath = "m/44'/145'/0'/0/0";
        } else if(coin == "btg") {
            derivePath = "m/44'/156'/0'/0/0";
        }

        return derivePath;
    },

    btgConvert : async (addr) => {
        var decode = await bs58check.decode(addr);
        decode[0] = 38;
        var convertAddr = await bs58check.encode(decode);
        return convertAddr;
    }
}
