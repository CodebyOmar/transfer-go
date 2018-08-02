<template>
  <div class="modal-content verify-modal-card">
    <span class="payment-modal-logo-text">
      <span>Transfer</span>
      <i> go</i>
    </span>

    <div class="card-details">
      <div class="field">
        <label class="card-label">PIN</label>
        <p class="control">
          <input class="input" type="password" placeholder="0000" v-model="pin">
        </p>
      </div>
    </div>

    <footer class="verify-modal-footer">
        <a :class="btnClasses" @click="initPinVerification">Verify</a>
    </footer>  
  </div>
</template>

<script>

export default {
  name: 'verify-pin',

  props: {
    verifying: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      pin: ""
    }
  },

  methods: {
    initPinVerification() {
      if(this.pin !== "") {
        this.$emit('submitted', this.pin)
      }else {
        this.$emit('error', 'Card pin must be provided.')
      }
    }
  },

  computed: {
    btnClasses() {
      return {
        'button':true, 
        'is-primary': true, 
        'is-fullwidth': true,
        'is-loading': this.verifying
      }
    }
  }
}
</script>
