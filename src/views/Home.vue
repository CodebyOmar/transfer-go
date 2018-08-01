<template>
  <div class="home">
    <home-banner></home-banner>
    <div style="margin-top:50px;">
    <bottom-level></bottom-level>
    </div>
  </div>
</template>

<script>
import HomeBanner from '@/components/home.components/home-banner'
import BottomLevel from '@/components/layout/footer'

export default {
  name: 'home',
  components: {
    HomeBanner,
    BottomLevel
  }
}
</script>
