<template>
  <div class="sub-title">{{message}}</div>
</template>


<script>
import {SEND_SMS} from '../API/transfers'

export default {
  name: 'redirectpayment',

  created() {
    let qs = {}
    let params = window.location.search.substring(1).split('&');
    for (var i = params.length - 1; i >= 0; i--) {
        let key = params[i].split('=')[0]
        let val = params[i].split('=')[1]
        qs[key] = decodeURIComponent(val)
    };

    if(qs.status === 'success' && qs.data.chargeResponseCode === '00') {
      SEND_SMS(qs.sata.txref).then(res => {
        this.message = res.message        
      }).catch(err => {
        this.message = "Payment successful, failed to send SMS to recipient.."
      })
    }else {
        this.message = "Payment failed.."
    }
  },
  
  data() {
    return {
      message: "Redirecting"
    }
  }
}  
</script>

