const {hashMessage} = require('./script/sign');
const secp = require('ethereum-cryptography/secp256k1')
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xc029501f0bc05130e669": 100,
  "0x3e653168df72de304013": 50,
  "0x2a0a5e40a05582fdc2f3": 75,
};

// mapped address with public key.

const publicKeys = {
  "0xc029501f0bc05130e669" : "040480d7ccbce345a7abb091d1819a5a223e3ea7a7b2576dbd8f2f43fe2d30e5f8cb3cb917dd117de7c84e5bca995754240dbd7413a228c029501f0bc05130e669",
  "0x3e653168df72de304013" : "0446d1ac0ad023df21d78ae94cacc597f96ebdc44e6031e4095656eef7d1f2012b4c3647f9dc1634c8e17a3e6e3cea8b02cc3ab2ddd21f3e653168df72de304013",
  "0x2a0a5e40a05582fdc2f3" : "04820be285c3f12707ea29ce61f3ddb0ae113c6084688eadcdfa1f3df388a665146258b5d2a724c04d6ecfaf40020eb5c8288b917521cf2a0a5e40a05582fdc2f3"
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const {signature} = req.query;
  const balance = isOwner(address,signature) ? balances[address]:0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { sender, recipient, amount , digitalSignature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  // Validate the sender which is provided from client side

  if(!isOwner(sender,digitalSignature)){
    res.status(400).send({message:'you are not the owner of the funds'});
    return;
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

// function to validate an address
function isOwner(address,digitalSignature){

  // recover the public address from the signature

    const publicKey = publicKeys[address];
    const msg = 'Hello its me';
    const hash = hashMessage(msg);

    // recreate uint8array from string

    let digitalSignatureArray = digitalSignature.split(',').map(x=>Number(x));
    let uint8array = new Uint8Array(digitalSignatureArray.length);

    digitalSignatureArray.forEach((x,i)=> uint8array[i]=x);
    return secp.verify(uint8array,hash,publicKey)
}