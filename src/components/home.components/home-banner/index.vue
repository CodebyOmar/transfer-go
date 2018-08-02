<template src='./home-banner.html'>
  
</template>


<script>
import Navbar from "@/components/layout/navbar";
import payModal from "../paymentModal"

export default {
  name: 'home-banner',

  data() {
    return {
      showPopup: false,
      error: "",
      displayError: false,
      d: {
        meta: [{ name: "", phonenumber: 234 }],
        amount: undefined,
        currency: undefined
      }
    }
  },

  methods: {
    initPay() {
      let {meta, amount, currency} = this.d

      if(meta[0].name === "" || meta[0].phonenumber === "" || amount === "" || currency === "") {
        this.error = "All fields are required"
        this.displayError = true
        setTimeout(() => this.displayError = false, 15000);
      } else {
        this.showPopup = true
      }
    },

    closePopUp() {
      this.showPopup = false
    },

    clearForm() {
      this.d = {
        meta: [{ name: "", phonenumber: 234 }],
        amount: undefined,
        currency: undefined
      }
    }
  },

  components: {
    Navbar,
    payModal
  }
}
</script>
