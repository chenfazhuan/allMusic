<template>
  <div class="pl">
    <transition-group name='bounce'
                      enter-active-class='bounceInLeft'
                      leave-active-class='bounceOutDown'>
      <div v-show="fullScreen" :key="1" style="height: 100%">
        <div class="player">
          <div class="header">
            <div @click="small">
              <i class="iconfont icon-moreunfold"></i>
            </div>
            <div>
              {{currentSong.title}}
            </div>
            <div style="opacity: 0">
              <i class="iconfont icon-moreunfold"></i>
            </div>
          </div>
          <div class="singer">
            {{currentSong.artist}}
          </div>
          <div class="middle" @touchstart.prevent="l_touchstart"
               @touchmove.prevent="l_touchmove" @touchend.prevent="l_touchend">
            <div ref="middleL" class="song" @click="togglePlaying">
              <img src="http://s3.music.126.net/m/s/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862" alt=""
                   class="zhizheng">
              <div class="cd">
                <div class="cdd" :class="playing?'rotate':'rotate paused'">
                  <img src="http://s3.music.126.net/m/s/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f" alt=""
                       class="song_bg">
                  <img
                    :src="currentSong.img_url"
                    alt="">
                  <i class="iconfont icon-zanting" v-show="!playing"></i>
                </div>
              </div>
            </div>
            <scroll class="middle-r" ref="lyricList" :data="lyric && lyric.lines">
              <div class="lyric-wrapper">
                <div v-if="lyric">
                  <p ref="lyricLine"
                     class="text"
                     :class="{'current': currentLineNum ===index}"
                     v-for="(line,index) in lyric.lines">{{line.txt}}</p>
                </div>
              </div>
            </scroll>
          </div>
          <div class="play_footer">
            <div>
              <mt-range v-model="rangeValue" :bar-height="2" @change="ranmove">
                <div slot="start">{{format(currentTime)}}</div>
                <div slot="end">{{format(duration)}}</div>
              </mt-range>
            </div>
            <div class="playing">
              <div>
                <i class="iconfont" :class="changeicon" @click="changemode"></i>
              </div>
              <div class="choose">
                <i class="iconfont icon-kuaitui" @click="prev"></i>
                <i class="iconfont" @click="togglePlaying" :class="[playing?'icon-bofang':'icon-zanting']"></i>
                <i class="iconfont icon-kuaijin" @click="next"></i>
              </div>
              <div>
                <i class="iconfont icon-liebiao01" @click.stop="showlist"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="bg">
          <div class="bg-img">
            <img
              :src="currentSong.img_url"
              alt="">
          </div>
          <div class="tm"></div>

        </div>
      </div>
    </transition-group>
    <!--<audio v-if="way=='qq'" ref="audio" @play="ready" @error="error" :src=source_url?source_url:currentSong.source_url @timeupdate="updateTime"-->
    <!--@ended="end"></audio>-->
    <audio ref="audio" @canplay="ready" @error="error" :src="currentSong.source_url" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>
<script>
  import {getQQ_singer} from 'api/transformation'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {Toast} from 'mint-ui';
  import {shuffle} from 'api/util'
  import Lyric from 'lyric-parser'
  import {getlyric} from 'api/lyric'
  import Scroll from './scroll'

  import {getQQ_song} from 'api/transformation'

  export default {
    data() {
      return {
        rangeValue: 0,
        show: true,
        songReady: false,
        currentTime: '',
        duration: '',
        ischange: false,
        lyric: null,
        currentLineNum: 0,
        showcd: true,
        source_url: "",
        touch: {}
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList',
        'way'
      ]),
      changeicon() {
        return this.mode == 0 ? 'icon-liebiaoxunhuan' : this.mode == 1 ? 'icon-danquxunhuan' : 'icon-suiji'
      }
    },
    watch: {
      playing(p) {
        let that = this
        this.$nextTick(()=>{
          p ? that.$refs.audio.play() : that.$refs.audio.pause()
        })
      },
      currentSong(newSong, oldSong) {
        let that=this
        if (!newSong.id) {
          this.lyric = null
          return
        }
        if (newSong.id === oldSong.id) {
          this.lyric = null
          return
        }
        if (this.lyric) {
          this.currentTime = 0
          this.lyric.stop()
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(function () {
          that.getlyric()
          that.$refs.audio.play()
        }, 200)
      }
    },
    methods: {
      getqqmusic(){
        let that = this
        if(that.way=='qq'||that.currentSong.way=='qq'){
          getQQ_song(that.currentSong.id)
            .then((data)=>{
              let key=JSON.parse(data.slice('MusicJsonCallback('.length,-')'.length))
              key=key.data.items[0].vkey
              that.source_url=`http://dl.stream.qqmusic.qq.com/C400${that.currentSong.id}.m4a?vkey=${key}&guid=8284612410&uin=0&fromtag=66`
              that.SET_currentS(this.source_url)
            })
        }
      },
      showlist() {
        this.SET_showlist(true)
      },
      l_touchstart(e) {
        this.touch.initiated = true
        this.touch.moved = false
        let a = e.touches[0];
        this.touch.startX = a.pageX
        this.touch.startY = a.pageY
      },
      l_touchmove(e) {
        if (!this.touch.initiated) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        let a = e.touches[0];
        const deltaX = a.pageX - this.touch.startX
        const deltaY = a.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        const left = this.showcd ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style.transitionDuration = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style.transitionDuration = 0
      },
      l_touchend() {
        if (!this.touch.moved) {
          return
        }
        let offsetWidth
        let opacity
        if (this.showcd) {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.showcd = false
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.showcd = true
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }

        this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style.transitionDuration = '300ms'
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style.transitionDuration = '300ms'
        this.touch.initiated = false
      },
      getlyric() {
        if (this.currentSong.source == 'qq' || this.currentSong.source == 'netease') {
          getlyric(this.currentSong.source, this.currentSong.id)
            .then((data) => {
              this.lyric = new Lyric(data, this.handleLyric)
              this.lyric.play()
            })
            .catch(() => {
              this.lyric = null
              this.currentLineNum = 0
            })
        }
      },
      handleLyric({lineNum, txt}) {
        let that = this
        this.currentLineNum = lineNum
        this.$nextTick(() => {
          if (lineNum > 5) {
            let lineEl = this.$refs.lyricLine[lineNum - 5]
            that.$refs.lyricList.scrollToElement(lineEl, 1000)
          }
          else {
            that.$refs.lyricList.scrollTo(0, 0, 1000)
          }
        })
//        this.playingLyric = txt
      },
      end() {
        if (this.mode == 1) {
          this.loop()
          return
        } else {
          this.next()
        }
      },
      changemode() {
        let mode = this.mode + 1
        this.SET_mode(mode % 3)
        let list = ''
        if (mode == 2) {
          list = shuffle(this.sequenceList)
          this.handleLyric()
        } else {
          list = this.sequenceList
        }
        this.resetcurrent(list)
        this.SET_playlist(list)
      },
      resetcurrent(list) {
        let index = list.findIndex((item) => {
          return item.id == this.currentSong.id
        })
        this.SET_currentIndex(index)
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
        if (!this.ischange) {
          this.rangeValue = Math.round(this.currentTime / this.duration * 100)
        }
      },
      ranmove(d) {
        this.ischange = true
        this.rangeValue = d
        this.currentTime = d
        this.$refs.audio.currentTime = this.duration * d / 100
        this.$nextTick(() => {
          this.ischange = false
        })
        if (this.lyric) {
          this.lyric.seek(this.duration * d * 10)
        }

      },
      format(time) {
        time = time | 0
        let m = time / 60 | 0
        let s = this.pad(time % 60)
        return `${m}:${s}`
      },
      pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.SET_playing(!this.playing)
        if (this.lyric) {
          this.lyric.togglePlay()
        }
      },
      ready() {
        this.songReady = true
        this.duration = this.$refs.audio.duration
      },
      error() {
        this.songReady = true
        this.lyric = null
        Toast({
          message: '无法获取歌曲地址',
          duration: 1000
        });
        this.SET_playing(false)
      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        if (this.lyric) {
          this.lyric.seek(0)
        }
      },
      next() {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if (index == this.playlist.length) {
          index = 0
        }
        this.SET_currentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      prev() {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index == -1) {
          index = this.playlist.length - 1
        }
        this.SET_currentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      small() {
        this.SET_fullScreen(false)
      },
      ...mapMutations({
        SET_fullScreen: 'SET_fullScreen',
        SET_playing: 'SET_playing',
        SET_currentIndex: 'SET_currentIndex',
        SET_mode: 'SET_mode',
        SET_playlist: 'SET_playlist',
        SET_showlist: 'SET_showlist',
        SET_currentS: 'SET_currentS'
      }),
    },
    components: {Scroll}
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;
  .mint-toast-text {
    font-size: px2rem(50);
  }

  @keyframes circle {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  .songs {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: px2rem(600)
  }

  .cd {
    width: px2rem(600);
    height: px2rem(600);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: px2rem(-40);
  }

  .cdd {
    width: 100%;
    height: 100%;
  }

  .rotate {
    animation: circle 20s linear infinite;
  }

  .paused {
    animation-play-state: paused
  }

  .pl {
    position: fixed;
    top: 0;
    z-index: 1000;
    height: 100%;
  }

  .iconfont {
    font-size: px2rem(50);
    font-weight: 600;
  }

  .mt-range {
    font-size: px2rem(20);
    font-weight: 500;
    div:first-child {
      margin-right: px2rem(20);
    }
    div:last-child {
      margin-left: px2rem(20);
    }
  }

  .player {
    position: relative;
    z-index: 1;
    color: #fff;
    width: px2rem(750);
    height: 100%;
    .singer {
      font-size: px2rem(30);
      text-align: center;
      padding-bottom: px2rem(30);
      border-bottom: 1px solid #ddd;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .song {
      height: px2rem(600);
      position: relative;
      margin-top: px2rem(150);
      /*display: none;*/
      display: inline-block;
      width: 100%;
      img {
        display: block;
      }
      .zhizheng {
        position: absolute;
        width: px2rem(200);
        z-index: 30;
        left: 50%;
        transform: translateX(-20%);
        top: px2rem(-150);
      }
      div {
        img:first-child {
          position: absolute;
          top: 0;
          left: 50%;
          height: px2rem(600);
          width: px2rem(600);
          transform: translateX(-50%);
          z-index: 10;
        }
        img:nth-child(2) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          border-radius: 50%;
          width: px2rem(380);
          height: px2rem(380);
        }
        i {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          z-index: 20;
          font-size: px2rem(100);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: px2rem(20) px2rem(30);
    font-size: px2rem(40);
    > div:nth-child(2) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }

  .play_footer {
    margin-top: px2rem(80);
    width: px2rem(750);
    padding: px2rem(20) px2rem(30);
    .iconfont {
      font-size: px2rem(80);
      font-weight: 500;
      color: rgb(255, 255, 255);
    }
    .playing {
      display: flex;
      justify-content: space-between;
      padding: px2rem(50) 0 px2rem(20);
      div:not(:nth-child(2)) {
        width: 20%;
      }
      div:first-child {
        text-align: left;
      }
      div:last-child {
        text-align: right;
      }
    }
    .choose {
      flex-basis: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 px2rem(20);
      i {
        display: block;
      }
    }
  }

  .bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    .bg-img {
      filter: blur(20px);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tm {
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    img {
      width: 100%;
      /*transform: scale(1.5);*/
      height: 100%;
    }
  }

  .middle {
    white-space: nowrap;
    width: 100%;
    height: 60%;
  }

  .middle-r {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 99%;
    overflow: hidden;
    margin-top: px2rem(35);
    .lyric-wrapper {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      text-align: center;
    }
    .text {
      line-height: px2rem(60);
      color: rgba(255, 255, 255, 0.5);
      font-size: px2rem(26);
    }
    .current {
      color: #fff
    }
  }
</style>
