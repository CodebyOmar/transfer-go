<template src="./paymentModal.html">
  
</template>


<script>
import cardDetails from "./card-details";
import verifyPin from "./verify-pin"
import verifyOtp from './verify-otp'
import billingInfo from './billing-info';

import {INIT_TRANSFER, VERIFY_LOCAL_CARD, VERIFY_OTP, SEND_SMS, SEND_BILLING_INFO} from '../../../API/transfers'

export default {
  name:'paymentModal',

  props: {
    show: {
      type: Boolean,
      default: false
    },

    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      stage: 'card',
      transferData: null,
      transaction_reference: null,
      showErr: false,
      error: "",
      transfering: false,
      verifying_pin: false,
      verifying_otp: false,
      otp_success: false,
      message_success: false,
      billing: false
    }
  },

  methods: {
    close() {
      this.$emit('close')
      this.stage = "card"
    },

    redirectVerification(response) {
      let { authurl, status }  = response.data.rave_response.data

      this.displayError(status.concat(" "+"Redirecting..."));
      // this.transfering = true
      
      setTimeout(() => {
        this.transfering = false;
        this.close()
        this.$emit('reset')
        window.open(authurl)
      }, 3000);
    },

    verificationRequired(response) {
      let {suggested_auth} = response.data.rave_response.data

      this.transferData.suggested_auth = suggested_auth
      this.transferData.txRef = response.data.txRef
      this.stage = suggested_auth
    },

    sendCard(details) {
      let transferData = {...details, ...this.data}
      this.transferData = transferData
      this.transfering = true

      INIT_TRANSFER(transferData).then(response => {
        this.transfering = false

        if(response.status === 'success') {
          let { suggested_auth, authModelUsed } = response.data.rave_response.data

          suggested_auth === undefined 
          ? this.redirectVerification(response)
          : this.verificationRequired(response)
        }else {
          this.displayError(response.message)
        }
      }).catch(err => {
        this.transfering = false
        this.displayError("Service unavailable.")
      })
    },

    verifyPin(pin) {
      this.transferData.pin = pin
      this.verifying_pin = true

      VERIFY_LOCAL_CARD(this.transferData).then(response => {
        this.verifying_pin = false
        let rave_data = response.rave_response.data

        if(response.status === 'success') {
          this.displayError(rave_data.chargeResponseMessage)

          if(rave_data.chargeResponseCode == '02') {
            this.stage = 'otp'
            this.transaction_reference = rave_data.flwRef
          }
        }else {
          this.displayError(rave_data.chargeResponseMessage || "Failed.")
        }
      }).catch(err => {
        this.verifying_pin = false
        this.displayError("Service unavailable")
      })
    },

    verifyOtp(otp) {
       this.displayError(null) //clear error
       let { transaction_reference, verifying_otp } = this 
       const payload = { transaction_reference, otp }
       this.verifying_otp = true

       VERIFY_OTP(payload).then(response => {
         this.verifying_otp = false
         this.otp_success = true
         this.displayError("Do not close. Sending funds to recipient...")

         // send message to recipient
         SEND_SMS(response.data.txref).then(res => {
           if(res.status === 'success') {
             this.displayError(null)
             this.message_success = true
             this.$emit('transaction:done')
           }else {
             this.displayError(res.message)
           }
         }).catch(err => this.displayError("Failed to transfer funds"))

       }).catch(err => {
         this.verifying_otp = false
         this.displayError("Service unavailable.")
       })
    },

    sendBillingInfo(info) {
      this.billing = true
      let details = {...this.transferData, ...info}

      SEND_BILLING_INFO(details).then(response => {
        this.billing = false
        console.log(response)
      }).catch(err => {
        this.billing = false
        this.displayError("Service unavailable")
      })
    },

    displayError(err) {
      this.error = err
      this.showErr = true
      setTimeout(() => this.showErr = false , 15000);
    }
  },

  computed: {
    modalClasses() {
      return {
        modal: true,
        'is-active': this.show
      }
    }
  },

  components: {
    cardDetails,
    verifyPin,
    verifyOtp,
    billingInfo
  }
}
</script>
