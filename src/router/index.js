import Vue from 'vue'
import Router from 'vue-router'


const index = (resolve) => {
  import('@/components/index').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    }
  ]
})
