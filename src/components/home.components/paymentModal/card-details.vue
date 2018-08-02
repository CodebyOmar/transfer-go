<template>
  <div class="modal-content payment-modal-card">
    <span class="payment-modal-logo-text">
      <span>Transfer</span>
      <i> go</i>
    </span>

    <div class="card-details">
      <div class="field">
        <label class="card-label">CARD NUMBER</label>
        <p class="control">
          <input class="input" type="text" placeholder="0000 0000 0000 0000" v-model="details.cardno">
        </p>
      </div>

      <div class="columns is-variable is-1 is-mobile">
        <div class="column is-one-quarter">
          <div class="field">
            <label class="card-label">MM/YY</label>
            <p class="control">
              <input class="input" type="text" placeholder="03/19" v-model="expiry">
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="card-label">PHONE NUMBER</label>
            <p class="control">
              <input class="input" type="text" placeholder="+2348139120029" v-model="details.phonenumber">
            </p>
          </div>
        </div>
      </div>

      <div class="columns is-variable is-1 is-mobile">

        <div class="column">
          <div class="field">
            <label class="card-label">COUNTRY</label>
            <p class="control">
              <div class="select is-fullwidth">
                <select v-model="details.country" required>
                  <option value="NG">NG</option>
                  <option value="GH">GH</option>
                  <option value="KE">KE</option>
                  <option value="ZA">ZA</option>
                </select>
              </div>
            </p>
          </div> 
        </div>

        <div class="column">
          <div class="field">
            <label class="card-label">CVV</label>
            <p class="control">
              <input class="input" type="text" placeholder="345" v-model="details.cvv">
            </p>
          </div>
        </div>
      </div>

      <div class="columns is-variable is-1 is-mobile">
        <div class="column">
          <div class="field">
            <label class="card-label">FIRST NAME</label>
            <p class="control">
              <input class="input" type="text" placeholder="Ali" v-model="details.firstname">
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="card-label">LAST NAME</label>
            <p class="control">
              <input class="input" type="text" placeholder="Mohammed" v-model="details.lastname">
            </p>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="card-label">EMAIL</label>
        <p class="control">
          <input class="input" type="text" placeholder="user@gmail.com" v-model="details.email">
        </p>
      </div>
    </div>

    <footer class="payment-modal-footer" @click="submitDetails">
        <a :class="btnClasses">Pay NGN {{ amount  }}</a>
    </footer>  
  </div>
</template>

<script>
export default {
  name: 'card-details',

  props: {
    amount: {
      type: String,
      default: "0.00"
    },
    transfering: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      details: {
        "cardno": "",
        "cvv": "",
        "expirymonth": "",
        "expiryyear": "",
        "country": "NG",
        "email": "",
        "phonenumber": "",
        "firstname": "",
        "lastname": "",
      },
      expiry: ""
    }
  },

  methods: {
    paramsIsNotEmpty(obj) {
      let res = true;

      Object.keys(obj).map((param) => {
        if(obj[param] === "" || obj[param] === undefined){
          res =  false
          return;
        }
      })

      return res;
    },

    submitDetails() {
      let expiry = this.expiry.split("/", 2)
      this.details.expirymonth = expiry[0]
      this.details.expiryyear = expiry[1]

      if(this.paramsIsNotEmpty(this.details) && !this.transfering) {
        this.$emit("submitted", this.details)
      }else if(!this.paramsIsNotEmpty(this.details)){
        this.$emit("error", "Details not complete.")
      }
    }
  },

  computed: {
    btnClasses() {
      return {
        button:true,
        'is-primary':true, 
        'is-fullwidth': true,
        'is-loading': this.transfering
      }
    }
  }
}
</script>
