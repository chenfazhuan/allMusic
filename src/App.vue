<template>
  <div id="app">

    <myHeader :keyword="keyword" @searchkey="getkey" @searchnum="getnum"></myHeader>

    <keep-alive>
      <router-view @searchkey="getkey" :keyword="keyword" :searchnum="num"></router-view>
    </keep-alive>

    <player></player>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import myFooter from '@/components/footer'
  import player from '@/components/player'
  import playlist from '@/components/playlist'
  import {mapMutations} from 'vuex'

  export default {
    name: 'app',
    data(){
      return{
        keyword:'',
        num:0
      }
    },
    components: {
      myHeader,
      myFooter,
      player,
      playlist
    },
    methods: {
      ...mapMutations({
        SET_way: 'SET_way',
        SET_h_bg:'SET_h_bg',
        SET_in_bg:'SET_in_bg'
      }),
      getkey(data){
        this.keyword=data
      },
      getnum(data){
        this.num=data
      }
    },
    created(){
      if(!localStorage ['cfzmusic']){
        localStorage.setItem('cfzmusic',this.$store.state.way)
      }else{
        this.SET_way(localStorage ['cfzmusic'])
      }
      if(localStorage ['cfzmusic']=='qq'){
        this.SET_h_bg('49,194,124')
        this.SET_in_bg('41,132,70')
      }else if(localStorage ['cfzmusic']=='ne'){
        this.SET_h_bg('212,62,54')
        this.SET_in_bg('204,0,0')
      }else if(localStorage ['cfzmusic']=='xiami'){
        this.SET_h_bg('250,135,35')
        this.SET_in_bg('240,73,0')
      }else{
        this.SET_h_bg('22,154,243')
        this.SET_in_bg('14,92,190')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "common/css/px2rem";

  $designWidth: 750;
  a{
    color: #000;
  }
  a:link,a:visited{
    text-decoration: none;
  }
  #app {
    width: px2rem(750);
    margin: 0 auto;
    background: #FCFCFD;
    height: 100%;
  }
  div[lazy=loading] {
    width: 100%;
    height: px2rem(400);
    margin: auto;
    background-repeat:no-repeat ;
    background-image:url("./common/image/loading.gif")!important;
  }
  img[lazy=loading] {
    width: 100%;
    height: 100%;
    margin: auto;
    background-repeat:no-repeat ;
    background-image:url("./common/image/loading.gif")!important;
  }
  a>img[lazy=loading] {
    width: 100%;
    min-height: px2rem(280);
    margin: auto;
    background-repeat:no-repeat ;
    background-image:url("./common/image/loading2.gif")!important;
  }
</style>
