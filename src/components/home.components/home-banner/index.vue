<template src='./home-banner.html'>
  
</template>


<script>
import Navbar from "@/components/layout/navbar";
import payModal from "../paymentModal"

export default {
  name: 'home-banner',

  data() {
    return {
      showPopup: false
    }
  },

  methods: {
    initPay() {
      this.showPopup = true
    },

    closePopUp() {
      this.showPopup = false
    }
  },

  components: {
    Navbar,
    payModal
  }
}
</script>
