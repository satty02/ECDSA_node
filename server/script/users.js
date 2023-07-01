
const { getSignatureInfo } = require("./sign");

const users = [
    {
        privateKey : '5f7f9245ea97a4f5cea0f7ea2326e269b8e2dc42ab98bfbc756ca0afcad1ebae',
        publicKey : '040480d7ccbce345a7abb091d1819a5a223e3ea7a7b2576dbd8f2f43fe2d30e5f8cb3cb917dd117de7c84e5bca995754240dbd7413a228c029501f0bc05130e669',
        address : '0xc029501f0bc05130e669',
    },
    {
        privateKey : '78a226c43b2e9ae92d634081d824553e61406587f9451c5bdb5243de2f748232',
        publicKey : '0446d1ac0ad023df21d78ae94cacc597f96ebdc44e6031e4095656eef7d1f2012b4c3647f9dc1634c8e17a3e6e3cea8b02cc3ab2ddd21f3e653168df72de304013',
        address : '0x3e653168df72de304013',
    },
    {
        privateKey : '5302d3abf1e62b2fe42edff46f867c30b5552327bdb237b8d1b7fe9e56d3b7e0',
        publicKey : '04820be285c3f12707ea29ce61f3ddb0ae113c6084688eadcdfa1f3df388a665146258b5d2a724c04d6ecfaf40020eb5c8288b917521cf2a0a5e40a05582fdc2f3',
        address : '0x2a0a5e40a05582fdc2f3',
    }
];

// created functions to shows the list of users their privateKey , publicKey , address

async function listUsers() {
    for (let i=0; i<users.length; i++){
        console.log(`\n########### ${i+1} ###########`);
        console.log('private Key:',users[i].privateKey)
        console.log('public Key:',users[i].publicKey);
        console.log(`address`,users[i].address);
        getSignatureInfo(users[i].privateKey);
        console.log(`##############################`)
    }
};

listUsers()
    .then(()=>process.exit(0))
    .catch((err)=>{
        console.error(err);
        process.exit(1)
    })