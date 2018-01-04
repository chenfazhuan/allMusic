<template>
  <div>
    <div class="footer" v-if="showme" @click="full">
      <div>
        <img
          :src="currentSong.img_url"
          alt="">
        <div>
          <p>{{currentSong.artist}}</p>
          <p class="f_singer">{{currentSong.title}}</p>
        </div>
      </div>
      <div>
        <p><i class="iconfont" :class="[playing?'icon-bofang':'icon-yuanxingbofang']" @click.stop="togglePlaying"></i>
        </p>
        <p><i class="iconfont icon-liebiao01" @click.stop="showlist"></i></p>
      </div>
    </div>
    <playlist></playlist>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import playlist from './playlist'

  export default {
    data() {
      return {
        showpl: false,
        showme: true
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'currentSong',
        'playing',
        'allskrollr'
      ])
    },
    watch: {
      "$route": "show"
    },
    methods: {
      pi(data) {
        return data = this.playlist.length
      },
    ...mapMutations({
      SET_fullScreen: 'SET_fullScreen',
      SET_playing: 'SET_playing',
      SET_showlist:'SET_showlist'
    }),
    full() {
      if (this.currentSong.img_url) {
        this.SET_fullScreen(true)
      }
    },
    togglePlaying() {
      if (this.currentSong.img_url) {
        this.SET_playing(!this.playing)
      }
    },
    show() {
      if (this.$route.path == '/sheet' || this.$route.path == '/player') {
        this.showme = false
      }
      else {
        this.showme = true
      }
    },
    showlist() {
      this.SET_showlist(true)
    },
    },
    components: {
      playlist
    }
  }
</script>
<style lang="scss">
  @import "../common/css/px2rem";

  $designWidth: 750;
  .footer p{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .footer {
    z-index: 11;
    padding: px2rem(10);
    background: rgba(255, 255, 255, .98);
    border-top: px2rem(1) solid #F1F1F2;
    position: fixed;
    width: px2rem(750);
    bottom: 0;
    display: flex;
    font-size: px2rem(30);
    height: px2rem(110);
    justify-content: space-between;
    .iconfont {
      font-size: px2rem(50);
    }
    img {
      width: px2rem(90);
      height: px2rem(90);
      display: block;
      margin-right: px2rem(10);
    }

    > div {
      display: flex;
      > div {
        display: inline-block;
        align-self: center;

      }
    }
    > div:nth-child(2) {
      p {
        display: flex;
        i {
          align-self: center;
        }
        i:first-child {
          margin-right: px2rem(30);
        }
      }
    }
  }

  .f_singer {
    font-size: px2rem(25);
    color: #888;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
</style>
