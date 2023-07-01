// this script is used for getting signature from private key

const secp = require('ethereum-cryptography/secp256k1');
const {keccak256} = require('ethereum-cryptography/keccak');
const {utf8ToBytes} = require('ethereum-cryptography/utils');

async function getSignatureInfo(privateKey){
    const message = "Hello its me";
    const [signature , recoveryBit] = await signMessage(message,privateKey);

    console.log(message);
    console.log("signature:",signature.toString());
}

async function signMessage(msg,privateKey){
    return secp.sign(hashMessage(msg),privateKey,{recovered:true});
}

function hashMessage(msg){
    const bytes = utf8ToBytes(msg);
    return keccak256(bytes)
}

console.log(getSignatureInfo('5f7f9245ea97a4f5cea0f7ea2326e269b8e2dc42ab98bfbc756ca0afcad1ebae'))

module.exports = {
    getSignatureInfo,
    hashMessage
}