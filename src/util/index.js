import Web3 from 'web3'
import TokenContractAbi from '../abi/ERC20Token.json'
import validateConnection from './validateConnection'
const bip39 = require('bip39');
const hdkey = require("ethereumjs-wallet/hdkey");
const Tx = require('ethereumjs-tx').Transaction
const util = require('ethereumjs-util');   
const Buffer = require('safe-buffer').Buffer
const CryptoJS = require("crypto-js");

class SmartContract {
  constructor (
    // ethNode = 'wss://rinkeby.infura.io/_ws',
    contractAddr = process.env.VUE_APP_TOKEN_CONTRACT_ADDR)
    {

    // Modern dapp browsers...
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);

      try {
        // Request account access if needed
        window.ethereum.enable().then(() => {
        })
      }
      catch(err) {
        console.log(err);
      }
    }
    // Legacy dapp browsers, checking if Web3 has been injected by the browser (Mist/MetaMask)
    else if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${process.env.VUE_APP_INFURA_KEY}`));
    }

    console.log('web3: ', this.web3);
    this.contractAddr = contractAddr

    this.loadUserAddress().then(account => {
      this.account = account
    })

    this.contract = new this.web3.eth.Contract(TokenContractAbi, this.contractAddr)
    console.log('Contract: ', this.contract)

  }

  async getNetID() {

    let netId = await this.web3.eth.net.getId()
    let network = '';
    let warning = '';
    // web3.version.getNetwork((err, netId) => {
    console.log('netId: ' + netId)
    switch (netId) {
      case 1:
          network = 'Mainnet';
          warning = 'please switch your network to Kovan or Thai Chain';
        break
      case 2:
          network = 'Deprecated Morden';
          warning = 'please switch your network to Kovan or Thai Chain';
        break
      case 3:
          network = 'Ropsten';
          warning = 'please switch your network to Kovan or Thai Chain';
        break
      case 4:
          network = 'Rinkeby';
        break
      case 7:
          network = 'Thai Chain';
          // contractAddr = '0x0898424ddf8f9478aad9f2280a6480f1858ad1c6';
        break
      case 42:
          network = 'Kovan';
        break
      default:
          network = 'Unknown';
          warning = 'please switch your network to Kovan or Thai Chain';
    }

    console.log('result: ',netId, network, warning);
    return {
      'netId': netId,
      'name': network,
      'warning': warning
    }
}
  async loadUserAddress () {
    let accounts = await this.web3.eth.getAccounts()
    console.log('loadUserAddress >> ' + accounts[0])

    return accounts[0]
  }

  async getBlock() {
    return this.web3.eth.getBlock(48, function(error, result){
        if(!error) {
          // console.log(JSON.stringify(result));
          return result
        } else {
          // console.error(error);
          return error
        }
    })
  }

  // Get account balance
  async getBalance(account) {
    let balance = await this.web3.eth.getBalance(account)
    console.log('Balance: ', balance)

    return await this.web3.utils.fromWei(balance)

  }

  async mint(userAccount, amount) {

    let options = {
      from: userAccount,
      value: this.web3.utils.toHex(this.web3.utils.toWei(amount,'ether')),
      data: '0x'
    }
  
    if (typeof web3 !== 'undefined') {
      // Send a transaction to blockchain
      return await this.contract.methods.mint().send(options)
    }
  }

  async burn(account, amount, command) {
    console.log(amount);
    let amt = this.web3.utils.toWei(amount.toString(),'ether')

    let options = {
      from: account,
    }
    console.log("Burn: ", account, amt, command)
    if (typeof web3 !== 'undefined') {
      return await this.contract.methods.burn(command, amt).send(options)
    }
  }

  async createAccount() {
    return await this.web3.eth.accounts.create()
  }

  async encPrivateKey(privateKey, password) {
    var ciphertext = CryptoJS.AES.encrypt(privateKey, password).toString();
    return ciphertext;
  }

  async decPrivateKey(ciphertext, password) {
    var bytes  = CryptoJS.AES.decrypt(ciphertext, password);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(`ENC: ${ciphertext}, DEC: ${originalText}`); // 'my message'
    return originalText;
  }

  async generateSeed() {
    console.log('BIP39: ' ,bip39)
    let mnemonic = await bip39.generateMnemonic()
    let seed = await bip39.mnemonicToSeed(mnemonic)
    console.log('Mnemonic: ', mnemonic)
    console.log('Seed: ', seed)
    const rootKey = hdkey.fromMasterSeed(seed);
    const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0");

    const childKey = hardenedKey.deriveChild(0);
    const wallet = childKey.getWallet();
    const address = wallet.getAddress();
    const privateKey = wallet.getPrivateKey();
    console.log(`address is ${address.toString("hex")}`);
    console.log(`privateKey is ${privateKey.toString("hex")}`);

    return { address: address.toString("hex"), privateKey: privateKey.toString("hex"), mnemonic: mnemonic }

  }

  async importSeed(mnemonic, password) {
    let seed = await bip39.mnemonicToSeed(mnemonic)
    console.log('Mnemonic: ', mnemonic)
    console.log('Seed: ', seed)
    const rootKey = hdkey.fromMasterSeed(seed);
    const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0");

    const childKey = hardenedKey.deriveChild(0);
    const wallet = childKey.getWallet();
    const address = wallet.getAddress();
    const privateKey = wallet.getPrivateKey();
    console.log(`address is ${address.toString("hex")}`);
    console.log(`privateKey is ${privateKey.toString("hex")}`);

    var ciphertext = CryptoJS.AES.encrypt(privateKey.toString("hex"), password).toString();

    return { address: address.toString("hex"), privateKey: ciphertext, mnemonic: mnemonic }

  }

  async getERC20Balance(account) {
    // console.log('ERC20 account =', account);
    let tokenContract = new this.web3.eth.Contract(TokenContractAbi, this.contractAddr, {from: account})
    return await tokenContract.methods.balanceOf(account).call()
  }

  async getERC20Decimals(account) {
    // console.log('ERC20 account =', account);
    let tokenContract = new this.web3.eth.Contract(TokenContractAbi, this.contractAddr, {from: account})
    return await tokenContract.methods.decimals().call()
  }

  async getERC20Name(account) {
    // console.log('ERC20 account =', account);
    let tokenContract = new this.web3.eth.Contract(TokenContractAbi, this.contractAddr, {from: account})
    return await tokenContract.methods.name().call()
  }

  async getERC20Symbol(account) {
    // console.log('ERC20 account =', account);
    let tokenContract = new this.web3.eth.Contract(TokenContractAbi, this.contractAddr, {from: account})
    return await tokenContract.methods.symbol().call()
  }

  async convertToWei(amount) {
    return await this.web3.utils.toWei(amount,'ether')
  }

  async transferEther(networkId, account, mnemonic, toAddress, amount) {
    // const netId = await this.getNetID().name
    // console.log('getBlock: ', await this.web3.eth.getBlock("latest", false))
    
    let block = await this.web3.eth.getBlock("latest", false)
    let price = await this.web3.eth.getGasPrice()

    console.log("Latest Block: ", block, price) //toWei(Number(amount), "ether"))
    const txCount = await this.web3.eth.getTransactionCount(account)
    var rawTx = {
      from: account,
      nonce: util.bufferToHex(txCount),
      gasPrice: util.bufferToHex(2 * 10 ** 9),
      gasLimit: util.bufferToHex(151754),
      to: toAddress,
      value: this.web3.utils.toHex(this.web3.utils.toWei(amount,'ether')),
      data: '0x'
    }

    console.log('rawTx', rawTx)
  
    let tx = new Tx(rawTx, { chain: networkId.toLowerCase() })
    console.log('transaction: ', tx.serialize().toString('hex'))
    console.log('tx.hash(false): ', tx.hash(false).toString('hex'))
    tx.sign(new Buffer.from(mnemonic, 'hex'))
    console.log('tx.v', tx.v)
  
    let serializedTx = tx.serialize()
    console.log('transaction signed: ', serializedTx.toString('hex'))

    const result = await this.web3.eth.sendSignedTransaction('0x' + 
      serializedTx.toString('hex'))
    console.log(`result`, result)
    return result
  }
}

Object.setPrototypeOf(SmartContract.prototype, {...validateConnection})

export default SmartContract