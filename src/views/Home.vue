<template>
	<div class="wrapper">
    <NavBar v-on:updateBalance="handleBalance" />

    <section class="hero hero-border is-small is-primary is-bold section-padding">
      <div class="hero-body">
        <div class="container">
          <div class="row">
            <h1 class="title">
              Your Wallet Balance
            </h1>
          </div>
          <br>
          <div class="row is-padded">
            <div class="columns is-mobile">
              <div class="column is-third-fifth" style="margin: auto;">
                <p style=""> {{ ethBalance | numberWithCommas }} </p>
              </div>
              <div class="column is-one-fifth" style="margin: auto;">
                ETH
              </div>
            </div>
          </div>
          <div class="row is-padded">
            <div class="columns is-mobile">

              <div class="column is-third-fifth" style="margin: auto;">
                <p> {{ ERC20Balance | numberWithCommas }} </p>
              </div>
              <div class="column is-one-fifth" style="margin: auto;">
                <p> {{ ERC20Symbol }} </p> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding is-orange">
      <div class="columns is-multiline is-mobile is-3">

        <div class="column is-one-fifth-desktop is-one-third-tablet is-half-mobile is-btn">
          <div class="card card-button">
            <a @click="isQRCodeModalActive=true">

            <div class=columns>

              <div class="column is-two-thrid"> 
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                  <p class="title is-4">RECEIVE</p>
                  <p class="subtitle is-6">Receive crypto from your friends</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>


        <div class="column is-one-fifth-desktop is-one-third-tablet is-half-mobile is-btn">
          <div class="card card-button">
            <a @click="isBuyModalActive=true">

            <div class=columns>

              <div class="column is-two-thrid"> 
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                  <p class="title is-4">BUY TOKEN</p>
                  <p class="subtitle is-6">Get tokens pay with your crypto </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>

        <div class="column is-one-fifth-desktop is-one-third-tablet is-half-mobile is-btn">
          <div class="card card-button">
            <a @click="isSummonModalActive=true">
            <div class=columns>

              <div class="column is-two-thrid"> 
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                  <p class="title is-4"> Special Commands </p>
                  <p class="subtitle is-6"> Pay me the money, get revenge !!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>

      </div>
    </section>
<br>


		<div class="wrapper-inline">

      <b-modal :active.sync="isSummonModalActive">
        <div class="container modal-container">
          <section>
            <h1 class="modal-title"> Account # </h1> 
            <h1 class="modal-subtitle is-text-smaller"> {{ web3.coinbase }} </h1> <br>
            <h1 class="modal-title"> {{ ethBalance | numberWithCommas }} ETH </h1> 
            <h1 class="modal-title"> {{ ERC20Balance | numberWithCommas }} {{ ERC20Symbol }} </h1>
          </section>
    <section class="section-padding is-orange" style="padding: 10px 10px;">
      <div class="columns is-multiline is-mobile is-3">

        <div class="column is-one-third-desktop is-one-third-tablet is-half-mobile is-btn">
          <div class="card card-button">
            <a @click="openSummonTxtModal('nuke')">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4"> NUKE USER</p>
                  <p class="subtitle is-4"> 100 TOKEN </p>
                </div>
              </div>
            </div>
          </a>
          </div>
        </div>

        <div class="column is-one-third-desktop is-one-third-tablet is-half-mobile is-btn">
            <div class="card card-button">
              <a @click="openSummonTxtModal('doom')">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4"> DOOM </p>
                    <p class="subtitle is-4"> 500 TOKEN </p>
                  </div>
                </div>
              </div>
              </a>
            </div>
        </div>

        <div class="column is-one-third-desktop is-one-third-tablet is-half-mobile is-btn">
          <div class="card card-button">
            <a @click="openSummonTxtModal('summon')">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4"> SUMMON MONSTER </p>
                  <p class="subtitle is-4"> 200 TOKEN </p>
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>

        <div class="column is-one-third-desktop is-one-third-tablet is-half-mobile is-btn">
          <div class="card card-button">
            <a @click="openSummonTxtModal('jail')">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4"> JAIL USER</p>
                  <p class="subtitle is-4"> 300 TOKEN </p>
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>


        <div class="column is-one-third-desktop is-one-third-tablet is-half-mobile is-btn">
          <div class="card card-button">
            <a @click="openSummonTxtModal('unjail')">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4"> UNJAIL USER</p>
                  <p class="subtitle is-4"> 300 TOKEN </p>
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>

      </div>
    </section>
        </div>
      </b-modal>


      <b-modal :active.sync="isSummonTxtModalActive">
        <div class="container modal-container">
          <section v-if="command === 'summon'">
            <p class="modal-text pa-10"> Enter Monster Name : </p>
            <b-field class="label-head" >
                <b-input placeholder="monster..."
                  ref="summonInput"
                  type="text"
                  rows="1"
                  maxlength="64"
                  rounded
                  :autofocus="true"
                  v-model="summonName"
                >
                </b-input>
            </b-field>
          </section>
          <section v-if="command === 'summon'">
            <p class="modal-text pa-10"> Enter monster quantity to summon: </p>
            <b-field class="label-head" >
                <b-input placeholder="quantity..."
                  ref="summonQntInput"
                  type="text"
                  rows="1"
                  maxlength="64"
                  rounded
                  :autofocus="true"
                  v-model="summonQnt"
                >
                </b-input>
            </b-field>
          </section>
          <section v-if="command !== 'summon'">
            <p class="modal-text pa-10"> Enter Player name : </p>
            <b-field class="label-head" >
                <b-input placeholder="player..."
                  ref="playerInput"
                  type="text"
                  rows="1"
                  maxlength="64"
                  rounded
                  :autofocus="true"
                  v-model="playerName"
                >
                </b-input>
            </b-field>
          </section>
          <section>
              <b-button
                icon-right="money-bill-wave"
                class="button-box"
                @click="submitSummonTxt(); isSummonTxtModalActive = false;"
              >
                Submit
              </b-button>
          </section>
        </div>
      </b-modal>


      <b-modal :active.sync="isQRCodeModalActive">
        <div class="container modal-container">
          <section>
            <qrcode-vue
              :value="web3.coinbase"
              size="250"
              background="#FFFFFF"
              style="padding: 2rem 10px;"
              level="H"
            />
            <h1 class="modal-title"> Account # </h1> 
            <h1 class="modal-subtitle is-text-smaller"> {{ web3.coinbase }} </h1> <br>
            <h1 class="modal-title"> {{ ethBalance | numberWithCommas }} ETH </h1> 
            <h1 class="modal-title"> {{ ERC20Balance | numberWithCommas }} {{ ERC20Symbol }} </h1>
          </section>
          <section>
              <b-button
                icon-right="times"
                class="button-box"
                @click="isQRCodeModalActive = false;"
              >
                Close
              </b-button>
          </section>
        </div>
      </b-modal>

      <b-modal :active.sync="isBuyModalActive">
        <div class="container modal-container">
          <section>
            <h1 class="modal-title"> Account # </h1> 
            <h1 class="modal-subtitle is-text-smaller"> {{ web3.coinbase }} </h1> <br>
            <h1 class="modal-title"> {{ ethBalance | numberWithCommas }} ETH </h1> 
            <h1 class="modal-title"> {{ ERC20Balance | numberWithCommas }} {{ ERC20Symbol }} </h1>
          </section>
          <hr>
          <section>
            <div class="wallet-body">
              <div class="wallet-box">
              <h1 class="modal-title"> Rate: 1 ETH = 1,000 DZENY </h1> <br>

              <b-field class="label-head"
                label="Buy Amount (ETH) : ">
                  <b-input placeholder="Buy Amount..."
                    type="text"
                    pattern="^\d*(\.\d{0,2})?$"
                    ref="tokenAmtInput"
                    v-model="amount"
                  >
                  </b-input>
              </b-field>

              </div>
            </div>
          </section>
          <section>
              <b-button
                icon-right="money-bill-wave"
                class="button-box"
                @click="isPasswordModalActive = true; toAddress = 'BuyToken'"
              >
                Send
              </b-button>
          </section>
        </div>
      </b-modal>

    <b-modal :active.sync="isLoading">
      <div class="container modal-container">
        <section style="background-color: #FFF; border-radius: 20px 20px 0 0;">
          <img src="img/loading.gif" />
          <img src="https://image.flaticon.com/icons/svg/883/883917.svg" style="width: 100px;" />
        </section>
        <section style="background-color: #FFF; border-radius: 0 0 20px 20px;">
          <h1> L O A D I N G . . . </h1>
        </section>
      </div>
    </b-modal>

      <b-modal :active.sync="isPasswordModalActive">
        <div class="container modal-container">
          <section>
            <p class="modal-text pa-10"> Enter your password: </p>
            <b-field class="label-head" >
                <b-input placeholder="password..."
                  type="text"
                  rows="1"
                  maxlength="64"
                  rounded
                  ref="passwordInput"
                  v-model="password"
                >
                </b-input>
            </b-field>
          </section>
          <section>
              <b-button
                icon-right="money-bill-wave"
                class="button-box"
                @click="mint(); isPasswordModalActive = false; password = '';"
              >
                Submit
              </b-button>
          </section>
        </div>
      </b-modal>

		</div>
	</div>

</template>

<script>
import NavBar from '@/components/NavBar'
import SmartContract from '@/util'
import { mapState, mapActions } from 'vuex'
import UserDataPersistance from '@/userData/persistance'
import QrcodeVue from 'qrcode.vue'

const smartContract = new SmartContract()

export default {
  name: 'home',
  data: () => ({
    contractAddr: process.env.VUE_APP_TOKEN_CONTRACT_ADDR,
    isLoading: false,
    isQRCodeModalActive: false,
    isBuyModalActive: false,
    isPasswordModalActive: false,
    isSummonModalActive: false,
    isSummonTxtModalActive: false,
    command: null,
    summonName: null,
    summonQnt: null,
    playerName: null,
    password: '',
    ethBalance: '0',
    balance: '',
    account: '',
    network: [],
    block: [],
    userData: null,
    ERC20Balance: '0',
    decimals: '',
    ERC20Symbol: '-',
    toAddress: '',
    amount: '0',
    trfResult: '',
    cryptoData: [],
    crowdsaleAddr: process.env.VUE_APP_CROWDSALE_CONTRACT_ADDR,
  }),
  components: {
    NavBar,
    QrcodeVue
  },
  async mounted() {
    this.userData = new UserDataPersistance()
  },
  computed: {
    ...mapState({
      web3: state => state.web3,
      wallet: state => state.wallet
    })
  },
  watch:{
  },
  filters: {
    numberWithCommas (x) {
      if (x !== undefined && x!== null ) {
        let parts = x.toString().split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return parts.join('.')
      }
    }
  },
  methods: {
    ...mapActions({
      updateWeb3: 'updateWeb3',
      createWallet: 'createWallet',
      updateNetworkId: 'updateNetworkId',
      updateBalance: 'updateBalance'
    }),
    async updateWallet () {
      let _this = this
      this.userData = new UserDataPersistance()

      this.network = await smartContract.getNetID()
      this.updateNetworkId(this.network.name)
      this.block = await smartContract.getBlock()

      this.account = await smartContract.loadUserAddress()
      if (this.account == null) {
        this.account = this.userData.userAddress
        this.loadLocal = true
      }

      if (this.account) {
        this.updateWeb3({
          'coinbase': this.account,
          'balance': this.balance,
          'mnemonic': this.userData.mnemonic,
          'networkId': this.network.name
        })

        try {
          this.balance = await smartContract.getBalance(this.account)
        } catch {
          this.account = this.userData.balance
        }

        if (this.balance > 0) { this.balance = Number(this.balance).toFixed(4) }
        this.updateERC20Balance()
            
        if (!this.loadLocal) {
          window.ethereum.on('accountsChanged', async function (accounts) {
            console.log("change", accounts[0])
            this.network = await smartContract.getNetID()
            try {
              this.balance = await smartContract.getBalance(accounts[0])
            } catch {
              this.balance = '0'
            }
            if (this.balance > 0) { this.balance = Number(this.balance).toFixed(4) }

            this.updateERC20Balance()
            this.updateWeb3({
              'coinbase': accounts[0],
              'balance': this.balance,
              'networkId': this.network.name
            })
          })
        }

      } else {
        if (this.userData.userAddress) {
          console.log("Update UserAddress");
          let balance = await smartContract.getBalance(this.userData.userAddress)
          this.updateBalance({
            'address': this.userData.userAddress,
            'balance': balance
          })
          await this.updateUserBalance(balance)
        } else {
          console.log("Create UserAddress");
          // let account = await smartContract.createAccount()
          // console.log ('Wallet: ', account)

          this.account = await smartContract.generateSeed() 
          console.log('Address & Key from Seed: ', this.account)
          this.seed = this.account.mnemonic
          this.isSeedModalActive = true
        }
      }
    },
    async updateERC20Balance () {
      console.log('Acct: ', this.account)
      this.ERC20Balance = await smartContract.getERC20Balance(this.account)
      this.decimals = await smartContract.getERC20Decimals(this.account)
      this.ERC20Balance = (this.ERC20Balance/ Math.pow(10, this.decimals).toFixed(4))
      this.ERC20Symbol = await smartContract.getERC20Symbol(this.account)

      this.$emit('updateBalance', this.balance, this.ERC20Balance, this.ERC20Symbol)
    },
    handleBalance(balance, ERC20Balance, ERC20Symbol) {
      this.ethBalance = balance
      this.ERC20Balance = ERC20Balance
      this.ERC20Symbol = ERC20Symbol
    },
    async updatePersistance (userAddress, balance, mnemonic) {
      this.userData.update(userAddress, balance, mnemonic)
      this.userData.save()
    },
    async mint() {
      this.isLoading = true
      let mintAmt = await smartContract.mint(this.web3.coinbase, this.amount)
      this.account = this.web3.coinbase
      console.log("Minted: " , mintAmt)
      this.isLoading = false
      this.isSendModalActive = false
      this.isBuyModalActive = false
      this.updateERC20Balance()
    },
    async burn(amt, txt) {
      this.isLoading = true
      console.log('To be burned: ', this.web3.coinbase, amt, txt)
      let burnAmt = await smartContract.burn(this.web3.coinbase, amt, txt)
      this.account = this.web3.coinbase
      console.log("Burned: " , burnAmt)
      this.isLoading = false
      this.isSummonModalActive = false
      this.isSummonTxtModalActive = false
      this.isBuyModalActive = false
      this.updateERC20Balance()
    },
    async transferEther () {
      this.isLoading = true
      let privKey = await smartContract.decPrivateKey(this.web3.mnemonic, this.password)
      if (this.toAddress == "BuyToken") { this.toAddress = this.crowdsaleAddr }
      let result = await smartContract.transferEther(this.web3.networkId, this.web3.coinbase, privKey, this.toAddress, this.amount)
      // console.log("Transfer ETH: ", result)
      this.isLoading = false
      this.isSendModalActive = false
      this.isBuyModalActive = false
      this.isResultModalActive = true
      this.trfResult = result.transactionHash
    },
    onDecode (result) {
      // const qrString = result
      this.toAddress = result
    },
    openSummonTxtModal (txt) {
      console.log("Command: ", txt)
      this.command = txt
        if (txt == 'doom') {
          this.burn(500, '@doom')
        } else {
          this.isSummonTxtModalActive = true
        }
    },
    async submitSummonTxt () {
      let amt = 0
      let cmd = this.command

      switch (cmd) {
        case 'nuke': 
          amt = 100
          cmd = '@'+ cmd + ' ' + this.playerName
          break
        case 'summon': 
          amt = 200
          cmd = '@'+ cmd + ' ' + this.summonName + ' ' + this.summonQnt
          break
        case 'jail': 
          amt = 300
          cmd = '@'+ cmd + ' ' + this.playerName
          break
        case 'unjail': 
          amt = 300
          cmd = '@'+ cmd + ' ' + this.playerName
          break
      }

      await this.burn(amt, cmd)
      this.command = ''
    }
  }
}
</script>

<style lang="scss">
/* Font */
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,700');

/* Design */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: #ecf9ff;
}

body {
  // color: #272727;
  // font-family: 'Quicksand', serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  padding: 1rem;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem;
}

.card-button {
  border-radius: 20px;
  background: #ffe259; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffe259, #ffa751); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffe259, #ffa751);
}

.card {
  width: 100%;
  max-height: 100px;
}
.card-content {
  padding: 0 1.5rem;
  padding-bottom: 20px;
}
.card-image {
  padding-top: 20px;
}
.media-content{
  overflow: hidden;
}
.is-2by1 {
  width: 80px;
  margin: 0 auto;
}


[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;

  &:hover {
    background-color: darken(#f15d22, 10%);
  }

  &.btn-2 {
    background-color: #99c793;
    border-radius: 50px;
    overflow: hidden;

    &::before {
      color: #fff;
      content: "\f382";
      font-family: "Font Awesome 5 Pro";
      font-size: 100%;
      height: 100%;
      right: 130%;
      line-height: 3.3;
      position: absolute;
      top: 0px;
      transition: all 0.3s;
    }

    &:hover {
      background-color: darken(#99c793, 30%);

      &::before {
        right: 75%;
      }
    }
  }
}

.button-color {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: 'Poppins', sans-serif;
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  padding-bottom: 3rem;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;

  &:hover {
    background-color: darken(#f15d22, 10%);
  }

  &.btn-1 {
    background-color: #f79159;
    box-shadow: 0 6px darken(#f79159, 10%);
    transition: none;

    &:hover {
      box-shadow: 0 4px darken(#f79159, 10%);
      top: 2px;
    }
  }

  &.btn-2 {
    background-color: #99c793;
    border-radius: 50px;
    overflow: hidden;

    &::before {
      color: #fff;
      content: "\f382";
      font-family: "Font Awesome 5 Pro";
      font-size: 100%;
      height: 100%;
      right: 130%;
      line-height: 3.3;
      position: absolute;
      top: 0px;
      transition: all 0.3s;
    }

    &:hover {
      background-color: darken(#99c793, 30%);

      &::before {
        right: 75%;
      }
    }
  }

  &.btn-3 {
    background-color: #ee6d9e;
    border-radius: 0;
    overflow: hidden;

    span {
      display: inline-block;
      height: 100%;
      transition: all 0.3s;
      width: 100%;
    }

    &::before {
      color: #fff;
      content: "\f382";
      font-family: "Font Awesome 5 Pro";
      font-size: 130%;
      height: 100%;
      left: 0;
      line-height: 2.6;
      position: absolute;
      top: -180%;
      transition: all 0.3s;
      width: 100%;
    }

    &:hover {
      background-color: darken(#ee6d9e, 30%);

      span {
        transform: translateY(300%);
      }

      &::before {
        top: 0;
      }
    }
  }
}

</style>
