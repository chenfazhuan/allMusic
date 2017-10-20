<template>
  <div class="header">

    <transition name="fade">
      <div class="top" v-show="show">
        <i class="iconfont icon-shezhi"></i>
        <i class="iconfont icon-m"></i>
        <i class="iconfont icon-character-avatar"></i>
      </div>
    </transition>


    <div class="search">
      <input type="text" @click="find" :class="click_input ? 'bg_input':''">
      <div class="search-font" :class="click_input ? 'font_show':'font_close'" @click="goback">
        <i class="iconfont icon-mendian"></i>
      </div>

      <div class="search-font" v-show="show_s">
        <i class="iconfont icon-chaxun"></i>
        搜索
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        show: true,
        click_input: false,
        show_s: true
      }
    },
    methods: {
      goback(){
        this.show = true;
        this.show_s = true;
        this.click_input = false;
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        console.log(scrollTop)
        if (scrollTop > 280) {
          this.show = false
        } else {
          this.show = true
        }
      },
      find() {
        this.show = false;
        this.show_s = false;
        this.click_input = true;
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;
  .font_close {
    display: none !important;
  }

  .font_show {
    left: px2rem(40) !important;
    i {
      font-size: 1rem !important;
    }

  }

  .bg_input {
    background: #D43E36 !important;
  }

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
    background: #D43E36;
    color: #fff;
    padding: 0.4rem 0;
  }

  .top {
    padding: 0 0.4rem;
    padding-bottom: 0.4rem;
    width: 100%;
    display: flex;
  }

  .search {
    padding: 0 0.4rem;
    position: relative;
    background: #D43E36;
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
