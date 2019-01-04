var Mnemonic = require('bitcore-mnemonic'); //이더리움 default path m/44'/60'/0'/0
// var EthereumBip44 = require('ethereum-bip44');

// 복원용 니모닉 단어
// var words = "ordinary river trick moon advice baby lock curtain shadow health payment snow";
var words = "auction also guilt danger open better oven evoke alpha exercise tool hunt";

// 니모닉 단어로 부터 HDPrivateKey 복원
var xPriKey = Mnemonic(words).toHDPrivateKey();
console.log(xPriKey.toString());

// [ 'auction',
//   'also',
//   'guilt',
//   'danger',
//   'open',
//   'better',
//   'oven',
//   'evoke',
//   'alpha',
//   'exercise',
//   'tool',
//   'hunt' ]