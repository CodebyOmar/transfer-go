<template>
  <div class="modal-content payment-modal-card">
    <span class="payment-modal-logo-text">
      <span>Transfer</span>
      <i> go</i>
    </span>

    <div class="card-details">
      <div class="field">
        <label class="card-label">ZIP</label>
        <p class="control">
          <input class="input" type="text" placeholder="eg.230910" v-model="billing_information.billingzip">
        </p>
      </div>

      <div class="field">
        <label class="card-label">CITY</label>
        <p class="control">
          <input class="input" type="text" placeholder="eg.Ohio" v-model="billing_information.billingcity">
        </p>
      </div>

      <div class="field">
        <label class="card-label">ADDRESS</label>
        <p class="control">
          <input class="input" type="text" placeholder="eg.04 west hill" v-model="billing_information.billingaddress">
        </p>
      </div>

      <div class="field">
        <label class="card-label">STATE</label>
        <p class="control">
          <input class="input" type="text" placeholder="Texas" v-model="billing_information.billingstate">
        </p>
      </div>

     <div class="field">
        <label class="card-label">COUNTRY</label>
        <p class="control">
          <input class="input" type="text" placeholder="America" v-model="billing_information.billingcountry">
        </p>
      </div>     
    </div>

    <footer class="payment-modal-footer" @click="submitBillingInfo">
        <a :class="btnClasses" :aria-disabled="!billing"> Continue </a>
    </footer>  
  </div>
</template>

<script>
export default {
  name: 'billing-info',

  props: {
    billing: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      billing_information: {
        "billingzip": "",
        "billingcity": "",
        "billingaddress": "",
        "billingstate": "",
        "billingcountry": "",
      }
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

    submitBillingInfo() {
      if( this.paramsIsNotEmpty( this.billing_information ) ) {
        this.$emit("submitted", this.billing_information)
      }else {
        this.$emit("error", "Incomplete Billing information.")
      }
    }
  },

  computed: {
    btnClasses() {
      return {
        button: true, 
        'is-primary': true, 
        'is-fullwidth': true,
        'is-loading': this.billing
      }
    }
  }
}
</script>
