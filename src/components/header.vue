<template>
  <div class="header" v-if="showme" :style="{background: 'rgb(' +this.$store.state.h_bg+ ')'}">

    <transition name="fade">
      <div class="top" v-if="show">
        <i class="iconfont icon-shezhi"></i>
        <i class="iconfont icon-m" @click="showchoose"></i>
        <i class="iconfont icon-character-avatar"></i>
        <div class="choose" v-show="show_choose">
          <div style="display: flex;flex-direction: column">
            <div class="triangle-up"></div>
          </div>
          <div class="choose_way">

            <img src="../assets/qq_logo.svg" @click="choose('qq')" alt="">
            <img src="../assets/wy_logo.jpg" @click="choose('ne')" alt="">
            <img
              src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1137283699,4138679640&fm=58&bpow=270&bpoh=270&u_exp_0=950304595,3821912507&fm_exp_0=86"
              @click="choose('xiami')" alt="">
            <img src="../assets/logo_kugou.png" @click="choose('kg')" alt="">

          </div>
        </div>
      </div>
    </transition>


    <div class="search" :style="{background: 'rgb(' +this.$store.state.h_bg+ ')'}">
      <input type="text" ref='in_search' @click.stop="find" :class="click_input ? 'bg_input':''" v-model="s_write"
             :style="{background: 'rgb(' +this.$store.state.in_bg+ ')'}"
             @keypress.stop.prevent.13="submit_key(s_write)">
      <div class="search-font" :class="click_input ? 'font_show':'font_close'" @click="goback">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="search-font" v-show="show_s" @click="find">
        <i class="iconfont icon-chaxun"></i>
        搜索
      </div>
    </div>


  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        showme: true,
        show: true,
        click_input: false,
        show_s: true,
        s_write: '',
        show_choose: false,
        bg1: '',
        i: 0,
        k: []
      }
    },
    props: {keyword: {type: String, default: ''}},
    computed: {
      setkey() {
        return this.keyword
      },
      ...mapGetters([
        'way',
        'h_bg',
        'in_bg'
      ])
    },
    watch: {
      setkey(val) {
        this.s_write = val
      },
      "$route": "showheader"
    },
    methods: {
      ...mapMutations({
        SET_way: 'SET_way',
        SET_h_bg: 'SET_h_bg',
        SET_in_bg: 'SET_in_bg'
      }),
      submit_key(key) {
        let a = key
        if (a == '') {
          return
        }
        if (localStorage['cfzkeyword']) {
          this.k = JSON.parse(localStorage['cfzkeyword'])
        }else{
          this.k=[]
        }
        this.$emit('searchkey', key)
        this.$emit('searchnum', this.i++)
        let b = this.k.find((value) => {
          return Object.is(a, value)
        })
        this.k.push(a)
        if (b) {
          return
        }else{
          localStorage.setItem('cfzkeyword', JSON.stringify(this.k))
        }
      },
      showheader() {
        if (this.$route.path == '/index') {
          this.show = true
        }
        else if (this.$route.path == '/search' || this.$route.path == '/sheetDetail') {
          this.show = false
        }
        if (this.$route.path == '/sheet' || this.$route.path == '/rank' || this.$route.path == '/sheetDetail' || this.$route.path == '/player'|| this.$route.path == '/singer'||this.$route.path == '/singerlist') {
          this.showme = false
        } else {
          this.showme = true
        }
      },
      goback() {
        this.show = true;
        this.show_s = true;
        this.click_input = false;
        this.s_write = '';
        this.$router.go(-1)
      },
      choose(code) {
        this.SET_way(code)
        localStorage.setItem('cfzmusic', code)
        if (code == 'qq') {
          this.SET_h_bg('49,194,124')
          this.SET_in_bg('41,132,70')
        } else if (code == 'ne') {
          this.SET_h_bg('212,62,54')
          this.SET_in_bg('204,0,0')
        } else if (code == 'xiami') {
          this.SET_h_bg('250,135,35')
          this.SET_in_bg('240,73,0')
        } else {
          this.SET_h_bg('22,154,243')
          this.SET_in_bg('14,92,190')
        }

        this.show_choose = false
      },
      showchoose() {
        this.show_choose = !this.show_choose
      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 280) {
          this.show = false
          this.show_choose = false
        } else if (this.click_input != true) {
          this.show = true
        }
      },
      find() {
        this.$router.push('/search')
        this.show = false;
        this.show_s = false;
        this.click_input = true;
        this.$refs.in_search.focus()
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;
  .triangle-up {
    align-self: center;
    width: 0;
    height: 0;
    border-left: px2rem(30) solid transparent;
    border-right: px2rem(30) solid transparent;
    border-bottom: px2rem(30) solid #fff;
  }

  .font_close {
    display: none !important;
  }

  .choose_way {
    display: flex;
    background: #fff;
    border-radius: px2rem(10);
    img {
      width: px2rem(100);
      height: px2rem(100);
      padding: px2rem(20);
    }
  }

  .choose {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: px2rem(50);
    z-index: 900;
  }

  .font_show {
    left: px2rem(40) !important;
    i {
      font-size: 1rem !important;
    }

  }

  /*.bg_input {*/
  /*background: #D43E36 !important;*/
  /*}*/

  .fade-enter-active, .fade-leave-active {
    transition: all 0.1s;
    transition-timming-function: liner
  }

  .fade-enter, .fade-leave-active {
    height: 0;
    opacity: 0;
  }

  .header {
    position: fixed;
    z-index: 100;
    top: 0;
    width: px2rem(750);
    /*background: #D43E36;*/
    color: #fff;
    padding: 0.4rem 0;
  }

  .top {
    padding: 0 0.4rem;
    padding-bottom: 0.4rem;
    width: 100%;
    display: flex;
    position: relative;
  }

  .search {
    padding: 0 0.4rem;
    position: relative;
    /*background: #D43E36;*/
    > input {
      display: block;
      outline: none;
      border: none;
      height: 1.3rem;
      width: 100%;
      padding: 0 0.2rem;
      background: #CC0000;
      border-radius: 0.15rem;
      font-size: 0.8rem;
      color: #fff;
      padding-left: px2rem(70);
    }
    > .search-font {
      display: inline-block;
      font-size: 0.7rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      > i {
        font-size: 0.7rem;
      }
    }
  }

  .iconfont {
    font-size: 1rem;
  }

  .icon-shezhi {
    float: left;
  }

  .icon-m {
    margin: 0 auto;
    display: inline-block;
  }

  .icon-character-avatar {
    float: right;
  }
</style>
