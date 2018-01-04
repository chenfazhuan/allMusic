<template>

  <div class="playlist_header" v-show="showlist">
    <div class="playlist">
      <div class="playlist_top">
        <div>播放列表({{pi}})</div>
        <div>
          <i class="iconfont icon-delete" @click.stop="dellist"></i>
        </div>
      </div>
      <Scroll class="ul_list"
              ref="plist"
              :data="playlist"
              >
        <ul>
          <li v-for="(item,index) in playlist" :class="index==currentIndex?'choosebg':''"
          ref="pl">
            <div @click.stop="addthis(index)">
              <span class="playlist_song">{{item.title}}</span>
              <span class="playlist_singer">- {{item.artist}}</span>
            </div>
            <div @click.stop="closeone(index)">
              <i class="iconfont icon-close"></i>
            </div>
          </li>
        </ul>
      </Scroll>
      <div class="close" @click.stop="closelist">
        关闭
      </div>
    </div>
  </div>
</template>
<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  import Scroll from './scroll'
  import {MessageBox} from 'mint-ui';

  export default {
    props: {showpl: {type: Boolean, default: false}},
    data() {
      return {
        s: "",
      }
    },
    watch: {
      'showlist': 'moveto',
    },
    computed: {
      ...mapGetters({
        playlist: 'playlist',
        showlist: 'showlist',
        currentIndex: 'currentIndex'
      }),
      pi(data) {
        return data = this.playlist.length
      }
    },
    methods: {
      ...mapMutations({
        SET_playlist: 'SET_playlist',
        SET_showlist: 'SET_showlist',
        SET_currentIndex: 'SET_currentIndex',
        SET_fullScreen: 'SET_fullScreen',
        SET_playing: 'SET_playing'
      }),
      ...mapActions({
        delOne: 'delOne'
      }),
      moveto() {
        this.$nextTick(() => {
          this.$refs.plist.refresh()
          let line=this.$refs.pl[this.currentIndex]
          this.$refs.plist.scrollToElement(line,100)
        })
      },
      closeone(i) {
        this.delOne(i)
      },
      addthis(i) {
        this.SET_currentIndex(i)
      },
      dellist() {
        MessageBox.confirm('确定执行此操作?', '-_-').then(action => {
          this.SET_playlist([])
          this.SET_fullScreen(false)
          this.SET_playing(false)
        });
      },
      closelist() {
        this.SET_showlist(false)
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/css/px2rem";

  $designWidth: 750;
  .close {
    width: 100%;
    text-align: center;
    border-top: 1px solid #ddd;
  }

  .choosebg {
    background-color: #ddd;
  }

  .playlist_header {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1000;
    .playlist {
      overflow: hidden;
      background: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 65%;
      padding: px2rem(20);
      padding-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .ul_list {
        flex-grow: 1;
        overflow: hidden;
      }
      .playlist_top {
        position: relative;
        z-index: 9999999;
        background-color: #fff;
        /*display: flex;*/
        font-size: px2rem(40);
        /*justify-content: space-between;*/
        border-bottom: 1px solid #ddd;
        padding: px2rem(20) px2rem(10) px2rem(10);
        > div:first-child {
          float: left;
        }
        > div:nth-child(2) {
          float: right;
        }
        .iconfont {
          font-size: px2rem(40);
        }
      }
      ul {
        li {
          display: flex;
          justify-content: space-between;
          line-height: px2rem(70);
          border-bottom: 1px solid #ddd;
          padding: 0 px2rem(10);
          .playlist_song {
            font-size: px2rem(35);
          }
          .playlist_singer {
            font-size: px2rem(28);
            color: #999;
          }
          .iconfont {
            font-size: px2rem(35);
          }
        }
      }
    }
  }
</style>
