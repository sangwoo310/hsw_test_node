// const chart = require('../chart');
const keyList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

module.exports = {
    getArrIndex : (value) => {
        var index = 0;
        for(let i=0; i<keyList.length; i++) {
            if(arr[i] == value) {
                index = i;
                break;
            }
        }
        return index;
    },

    getSplitWords : (words) => {
        var wordsSplit = words.split(" ");
        return wordsSplit;
    },

    getWordPosition : async (wordsArr) => {
        var key = [];
        for(let i=0; i<wordsArr.length; i++) {
            for(let k=0; k<46; k++) {
                for(let j=0; j<46; j++) {
                    if(chart[k][j] == wordsArr[i]){
                        var y = keyList[i];
                        var x = keyList[j];
                        var yx = String(y)+String(x);
                        key.push(yx);
                    }
                }
            }
        }
        return key;
    }
}