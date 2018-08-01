<template src="./paymentModal.html">
  
</template>


<script>
export default {
  name:'paymentModal',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close() {
      this.$emit('close')
    }
  },

  computed: {
    modalClasses() {
      return {
        modal: true,
        'is-active': this.show
      }
    }
  }
}
</script>
