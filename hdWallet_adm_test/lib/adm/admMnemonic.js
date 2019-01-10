const Mnemonic = require('bitcore-mnemonic');
const wordlist = require('bitcore-mnemonic/lib/words/english');

let mnemonic
let mnemonicString
let store


module.exports = {
    newEntropy : (entropy) => {
        var bin = '';
        for (var i = 0; i < entropy.length; i++) {
            bin = bin + ('00000000' + entropy[i].toString(2)).slice(-8);
        }
        
        bin = bin + Mnemonic._entropyChecksum(entropy);
        
        if (bin.length % 11 !== 0) {
            throw new errors.InvalidEntropy(bin);
        }
        var mnemonic = [];
        
        for (i = 0; i < bin.length / 11; i++) {
            var wi = parseInt(bin.slice(i * 11, (i + 1) * 11), 2);
            mnemonic.push(wordlist[wi]);
        }
        var ret = mnemonic.join(' ');

        return ret;
    },

    mnemonic : (words) => {
        return new Mnemonic(words, Mnemonic.Words.ENGLISH);
    }
    
}