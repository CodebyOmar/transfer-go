import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/redirectpay',
      name: 'redirectpay',
      component: () => import('./views/redirectpayment.vue')
    },
    {
      path: '/claim-funds',
      name: 'claim-funds',
      component: () => import('./views/claimfunds.vue')
    }
  ]
})
