<template>
  <div class="modal-content verify-modal-card">
    <span class="payment-modal-logo-text">
      <span>Transfer</span>
      <i> go</i>
    </span>
 
    <span v-if="!successful">
      <div class="card-details">
        <div class="field">
          <label class="card-label">OTP</label>
          <p class="control">
            <input class="input" type="password" placeholder="********" v-model="otp">
          </p>
        </div>
      </div>

      <div class="helper-text-otp">Please enter OTP sent to your phone.</div>

      <footer class="verify-modal-footer" @click="initOtpVerification">
          <a :class="btnClasses" :aria-disabled="!verifying"> Verify </a>
      </footer>  
    </span>

    <span v-else-if="successful">
      <div class="has-text-centered">
        <font-awesome-icon :icon="successIcon" color="#38C172" size="6x"/>
      </div>

      <footer class="verify-success-modal-footer">
         <button class="button is-primary is-static is-fullwidth is-medium">{{successMessage}}</button>
      </footer>
    </span>
  </div>
</template>

<script>
export default {
  name: 'verify-otp',

  props: {
    verifying: {
      type: Boolean,
      default: false
    },
    successful: {
      type: Boolean,
      default: false
    },
    messageSuccess: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      otp: null
    }
  },

  methods: {
    initOtpVerification() {
      if(this.otp !== "" && this.otp !== null) {
        this.$emit('submitted', this.otp)
      }else {
        this.$emit('error', "Please provide OTP sent to your mobile phone.")
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
    },

    successIcon() {
      if(this.successful && this.messageSuccess) {
        return "paper-plane"
      }else {
        return "check-circle"
      }
    },

    successMessage() {
      if(this.successful && this.messageSuccess) {
        return "Funds Sent"
      }else {
        return "Payment Successful"
      }
    }
  }
}
</script>
