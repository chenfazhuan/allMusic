// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import '../src/common/js/hotcss'
import VueLazyload from 'vue-lazyload'

import 'mint-ui/lib/style.css'
Vue.use(Mint)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./common/image/loading.gif'),
  loading: require('./common/image/loading.gif'),
  attempt: 1
});

Vue.config.productionTip = false
const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
