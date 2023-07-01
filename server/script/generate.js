// this script is used for generating users

const secp = require('ethereum-cryptography/secp256k1');
const {keccak256} = require('ethereum-cryptography/keccak')
const {toHex} = require('ethereum-cryptography/utils')

const privateKey = secp.utils.randomPrivateKey();

console.log('private Key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log('public Key:' ,toHex(publicKey) );

const address = '0x' + toHex(publicKey).toString().slice(-20)

console.log('address :', address )
