import Vue from 'vue'
import Router from 'vue-router'
import {mode} from "../store/getters";

const index = (resolve) => {
  import('@/components/index').then((module) => {
    resolve(module)
  })
}
const search=(resolve)=>{
  import('@/components/search').then((module)=>{
    resolve(module)
  })
}
const sheet=(resolve)=>{
  import('@/components/sheet').then((module)=>{
    resolve(module)
  })
}
const rank=(resolve)=>{
  import('@/components/rankingList').then((module)=>{
    resolve(module)
  })
}
const sheetDetail=(resolve)=>{
  import('@/components/sheet_detail').then((module)=>{
    resolve(module)
  })
}
const player=(resolve)=>{
  import('@/components/player').then((module)=>{
    resolve(module)
  })
}
const playlist=(resolve)=>{
  import('@/components/playlist').then((module)=>{
    resolve(module)
  })
}
const singer=(resolve)=>{
  import('@/components/singer').then((module)=>{
    resolve(module)
  })
}
const singerlist=(resolve)=>{
  import('@/components/singerlist').then((module)=>{
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path:'/search',
      component:search
    },
    {
      path:'/sheet',
      component:sheet
    },
    {
      path:'/rank',
      component:rank
    },
    {
      path:'/sheetDetail',
      component:sheetDetail
    },
    {
      path:'/singer',
      component:singer
    },
    {
      path:'/singerlist',
      component:singerlist
    }
  ]
})
