<template>
<div class="container">

  <div class="header">
    <span>
      <div class="header-box">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <b-taglist>
                <b-tag type="is-medium is-info"> Network: {{ web3.networkId }} </b-tag>
              </b-taglist>
              <b-taglist>
                <b-tag type="is-medium is-orange"> Account: </b-tag>
                <b-tag type="is-small is-smaller is-orange"> {{ web3.coinbase }} </b-tag>
              </b-taglist>
            </div>
          </div>
          <div class="media-right" @click="menuOpen = true">
            <figure class="image is-64x64">
              <img v-if=profile.pictureUrl class="is-rounded" :src=profile.pictureUrl alt="Image">
              <img v-else class="is-rounded" src="https://image.flaticon.com/icons/svg/2152/2152539.svg" alt="img" style="width: 50px;    margin: 0 auto;">
              <br><div class="title-text is-smaller"> {{ profile.displayName }} </div>
            </figure>

              <b-sidebar
                type="is-light"
                fullheight
                overlay
                right
                :open.sync="menuOpen"
              >
                <div class="pa-20 ma-50">
                  <span style="float: right;">
                    {{ version }}
                  </span>
                  <img class="pa-10" style="width: 100px;"
                    src="https://image.flaticon.com/icons/svg/1958/1958778.svg"
                    alt="DEFI Wallet"
                  />
                  <b-menu>
                    <b-menu-list label="">
                      <b-menu-item icon="home" label="Home" @click="$router.push('/'); menuOpen = false"></b-menu-item>
                      <b-menu-item icon="user" label="My Account">
                        <b-menu-item label="Profile"></b-menu-item>
                        <b-menu-item label="Import Account" @click="isImportSeedModalActive = true; menuOpen = false"></b-menu-item>
                        <b-menu-item label="Delete Account" @click="deleteAccount(); menuOpen = false"></b-menu-item>
                      </b-menu-item>
                    </b-menu-list>
                  </b-menu>

                </div>
              </b-sidebar>
              
          </div>
        </article>
      </div>
    </span>
  </div>

  <div class="row">

      <b-modal :active.sync="isSeedModalActive">
        <div class="container modal-container">
          <section>
            <h1 class="modal-title"> Your seed phases </h1> 
            <h1 class="modal-subtitle"> Please write them down and keep them safe </h1> 
          </section>
          <section>
            <div class="container info-box">
              <p class="modal-text pa-10"> {{ seed }} </p>
            </div>
          </section>
          <section>
            <p class="modal-text pa-10"> Enter your password: </p>
            <b-field class="label-head" >
                <b-input placeholder="password..."
                  type="password"
                  maxlength="64"
                  password-reveal
                  rounded
                  v-model="password"
                >
                </b-input>
            </b-field>
          </section>
          <section>
              <b-button
                icon-right="times"
                class="button-box"
                @click="updatePrivKey()"
              >
                Close
              </b-button>
          </section>
        </div>
      </b-modal>

      <b-modal :active.sync="isImportSeedModalActive">
        <div class="container modal-container">
            <section>
              <h1 class="modal-title"> Import your seed phases </h1> 
            </section>
            <section>
              <div class="container">
                <div class="columns is-multiline is-mobile is-3">
                  <div class="column is-one-fifth-desktop is-one-third-tablet is-half-mobile is-btn" v-for="(index) in 12" :key="index">
                    <b-input
                      :placeholder="'Seed Phase, ' + index" size="is-small" 
                      rounded 
                      required 
                      v-model="importedSeed[index]">
                    </b-input>
                  </div>
       
                </div>
              </div>
            </section>
            <section>
              <p class="modal-text pa-10"> Enter your password: </p>
              <b-field class="label-head" >
                <b-input placeholder="password..."
                  type="password"
                  required
                  maxlength="64"
                  password-reveal
                  rounded
                  v-model="password"
                >
                </b-input>
              </b-field>
            </section>
            <section>
                <b-button
                  icon-right="upload"
                  class="button-box"
                  @click="isImportSeedModalActive = false; importSeed(); "
                >
                  Import
                </b-button>
            </section>
        </div>
      </b-modal>

  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SmartContract from '@/util'
import UserDataPersistance from '@/userData/persistance'
import { ToastProgrammatic as Toast } from 'buefy'

const smartContract = new SmartContract()

export default {
  name: 'NavBar',
  props: {
  },
  data: () => ({
    version: null,
    menuOpen: false,
    account: null,
    block: null,
    balance: null,
    seed: null,
    isSeedModalActive: false,
    isImportSeedModalActive: false,
    importedSeed: [{seed: ''}],
    profile: {
      userId: '',
      displayName: '',
      pictureUrl: '',
      statusMessage: ''
    },
    mnemonic: '',
    loadLocal: false,
    password: '',
    account: null,
    ERC20Balance: null,
    decimals: null,
    ERC20Symbol: null,
  }),
  async mounted () {
    this.version = process.env.VUE_APP_VERSION
    setTimeout(() => {
      if (this.$liff.isInClient()) {
        this.getProfile()
      }
    }, 1000)
    this.isLoading = false
  },
  computed: {
    ...mapState({
      web3: state => state.web3
    })
  },
  async created () {
    // Load from local storage
    this.updateWallet()
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

        this.ERC20Balance = await smartContract.getERC20Balance(this.account)
        this.decimals = await smartContract.getERC20Decimals(this.account)
        this.ERC20Balance = (this.ERC20Balance/ Math.pow(10, this.decimals).toFixed(4))
        this.ERC20Symbol = await smartContract.getERC20Symbol(this.account)

        this.$emit('updateBalance', this.balance, this.ERC20Balance, this.ERC20Symbol)
        
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

            this.ERC20Balance = await smartContract.getERC20Balance(this.account)
            this.decimals = await smartContract.getERC20Decimals(this.account)
            this.ERC20Balance = (this.ERC20Balance/ Math.pow(10, this.decimals).toFixed(4))
            this.ERC20Symbol = await smartContract.getERC20Symbol(this.account)

            this.$emit('updateBalance', this.balance, this.ERC20Balance, this.ERC20Symbol)
            
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

          this.account = await smartContract.generateSeed() 
          console.log('Address & Key from Seed: ', this.account)
          this.seed = this.account.mnemonic
          this.isSeedModalActive = true
        }
      }
    },
    async updatePersistance (userAddress, balance, mnemonic) {
      this.userData.update(userAddress, balance, mnemonic)
      this.userData.save()
    },
    async updateUserBalance (balance) {
      this.userData.updateUserBalance(balance)
      this.userData.save()
    },
    async deleteAccount () {
      await this.updatePersistance('','','')
    },
    async updatePrivKey () {
        let encPrivatekey = await smartContract.encPrivateKey(this.account.privateKey, this.password)
        this.createWallet({
          'address': '0x' + this.account.address,
          'balance': 0,
          'mnemonic': encPrivatekey
        })
        await this.updatePersistance('0x' + this.account.address, 0, encPrivatekey)
        this.password = ''
        this.isSeedModalActive = false
    },
    async importSeed () {
      console.log("SEED: ", this.importedSeed)
      let mnemonic = ''
      for (let i=1; i < 13; i++) {
        mnemonic = mnemonic + this.importedSeed[i] + ' '
      }
      mnemonic = mnemonic.toLowerCase()
      console.log("MNE: ", mnemonic.substring(0,mnemonic.length-1))
      let account = await smartContract.importSeed(mnemonic.substring(0,mnemonic.length-1),this.password) 
      console.log('Address & Key from Seed: ', account)
      let balance = await smartContract.getBalance('0x' + account.address)
      console.log('Seed balance: ', balance)

      this.createWallet({
        'address': '0x' + account.address,
        // 'balance': 0,
        'mnemonic': account.privateKey
      })
      this.password = ''
      await this.updatePersistance('0x' + account.address, balance, account.privateKey)
      // this.$emit('updateBalance', this.balance, this.ERC20Balance, this.ERC20Symbol)
      this.updateWallet()
    },
    getProfile () {
      let _this = this
      this.$liff.getProfile().then(function (profile) {
        _this.profile = profile
        _this.isLoading = false
        setTimeout(() => {
          _this.fetched = true
        }, 3000)
      }).catch(function (error) {
        Toast.open({
          message: 'Error getting profile: ' + error,
          type: 'is-danger'
        })
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navbar {
  width: 100%;
  background-color: transparent;
}

</style>

<style>
.b-sidebar .sidebar-content.is-fixed.is-right {
  background-color: #FCFCFC;
  border-radius: 100px 0 0 100px;

}
@media only screen and (max-width: 400px) {
  .b-sidebar .sidebar-content.is-fixed.is-right {
    max-width: 200px;
  }
}
</style>
