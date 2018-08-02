<template>
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="modal-content claim-funds-modal-card">
      <span class="payment-modal-logo-text">
        <span>Transfer</span>
        <i> go</i>
      </span>

      <div class="has-text-centered">
        {{info}}
      </div>

      <div class="card-details">

        <div class="field">
          <label class="card-label">Name</label>
          <p class="control">
            <input class="input" type="text" v-model="receiver" disabled>
          </p>
        </div>

        <div class="field">
          <label class="card-label">BANK</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="details.account_bank" required :disabled="disable_fields">
                <option value="undefined">Select bank</option>
                <option :value="bank.code" v-for="(bank, index) in banks" :key="index">  
                  {{ bank.name }}
                </option>
              </select>
            </div>
          </div>
        </div> 

        <div class="field">
          <label class="card-label">ACCOUNT NUMBER</label>
          <p class="control">
            <input 
              class="input" 
              type="text" 
              placeholder="0000000000" 
              v-model="details.account_number" 
              :disabled="disable_fields">
          </p>
        </div>
      </div>

      <footer class="claim-funds-modal-footer" @click="claimFunds">
          <a :class="btnClasses">Continue</a>
      </footer>  
    </div>
  </div>
</div>
</template>


<script>
import { GET_BANKS, GET_TRANSACTION, CLAIM_FUNDS } from '../API/transfers'

export default {
  name: 'claim-funds',

  created() {
    this.getTransactionDetails()
    this.getBanks()
  },

  data() {
    return {
      details: {
        account_bank: undefined,
        account_number: ""
      },
      receiver: "",
      amount: 0.00,
      banks: null,
      message: "Please wait..",
      transaction: null,
      disable_fields: false,
      initiating: false
    }
  },

  methods: {
    getBanks() {
      GET_BANKS().then(response => {
        if(response.data.status === 'success') {
          this.banks = response.data.data
        }
      }).catch(err => {
        this.banks = []
      })
    },

    getTransactionDetails() {
      let qs = {}
      let params = window.location.search.substring(1).split('&');
      for (var i = params.length - 1; i >= 0; i--) {
          let key = params[i].split('=')[0]
          let val = params[i].split('=')[1]
          qs[key] = decodeURIComponent(val)
      };  

      GET_TRANSACTION(qs.txref).then(response => {
        if(response.status === 'success') {
          this.transaction = response.data
          this.receiver = response.data.receiver.name
          this.amount = response.data.currency.concat(" "+response.data.amount)
        }else {
          this.message = response.message
        }
      }).catch(err => {
          this.disable_fields = true
          this.message = err.response.data.message || "Service unavailable"
      })
    },

    claimFunds() {
      if(this.details.account_bank !== undefined && this.details.account_number !== "") {
        this.initiating = true
        let { amount, currency, _id } = this.transaction
        let payload = {
          amount: parseInt(amount),
          currency,
          meta: [{ transaction_id: _id }],
          narration: "funds claimed by ".concat(this.receiver),
          ...this.details
        }

        CLAIM_FUNDS(payload).then(response => {
          this.initiating = false

          if(response.status === 'success') {
            this.disable_fields = true
            this.message = response.data.message || response.message
            this.amount = 0.00
          }else {
            this.message = response.message
            this.amount = 0.00
            setTimeout(() => {
              this.amount = this.transaction.currency.concat(" "+this.transaction.amount)
            }, 5000);
          }
        }).catch(err => {
          console.log(err.response)
          this.initiating = false
          this.message = err.response.data.message || "Service unavailable."
          this.amount = 0.00
          setTimeout(() => {
            this.amount = this.transaction.currency.concat(" "+this.transaction.amount)
          }, 5000);
        })
      }else {
        this.message = "Fill in account details"
        this.amount = 0.00
        setTimeout(() => {
          this.amount = this.transaction.currency.concat(" "+this.transaction.amount)
        }, 5000);
      }
    }
  },

  computed: {
    btnClasses() {
      return {
        'button':true, 
        'is-primary': true, 
        'is-fullwidth': true,
        'is-loading': this.initiating
      }
    },

    info() {
      if (this.amount !== 0.00) {
        return this.amount
      }else {
        return this.message
      }
    }
  }
}
</script>
