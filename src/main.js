// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import '../src/common/js/hotcss'
import store from './store'
import 'mint-ui/lib/style.css'
import 'vue2-animate/dist/vue2-animate.min.css';

Vue.use(Mint)
// Vue.component(Range.name, Range);

Vue.config.productionTip = false
const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
