<template>
  <div>
    <div>
      <div class="singer_h" data-0='background-color:rgba(0,0,0,0.1)' data-400='background-color:rgba(255,255,255,1)'>
        <div data-0='border-bottom:1px solid transparent' data-400='border-bottom:1px solid #ddd'>
          <i class="iconfont icon-back" data-0='color:rgb(255,255,255);' data-400="color:rgb(0,0,0)"
             @click='goback()'></i>
          <span data-0='color:rgb(255,255,255);' data-400="color:rgb(0,0,0)">{{singername}}</span>
          <i class="iconfont icon-back" style="opacity: 0"></i>
        </div>
      </div>
      <div class="singer_pic">
        <img :src=pic alt="">
      </div>
    </div>
    <div class="singer_s" id="skrollr-body">
      <div class="playall" @click="playall">
        <i class="iconfont icon-yuanxingbofang"></i>
        <span>播放全部</span>
      </div>
      <div class="hotsong">
        <div>热门歌曲</div>
        <ul>
          <li v-for="(item,index) in data" @click="playmusic(index)">
            <div class="song_img">
              <img :src=item.img_url alt="">
            </div>
            <div class="">
              <p>{{item.title}}</p>
              <p>{{item.artist}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import skrollr from 'skrollr'
  import {mapGetters} from 'vuex'
  import {getQQ_singer} from 'api/transformation'
  import {mapActions} from 'vuex'
  import {Indicator} from 'mint-ui'

  export default {
    data() {
      return {
        s: "",
        data: [],
        id: '',
        pic: "",
        singername: '',
        total: 0
      }
    },
    watch: {
      '$route': 'pageload'
    },
    computed: {
      ...mapGetters({
        way: 'way'
      })
    },
    methods: {
      ...mapActions({
        selectPlay: 'selectPlay',
      }),
      goback() {
        this.s.destroy()
        this.$router.go(-1)
      },
      playmusic(i) {
        this.selectPlay({
          list: this.data, index: i
        })
      },
      playall() {
        this.playmusic(0)
      },
      qqsinger(data) {
        let d = JSON.parse(data.slice('MusicJsonCallbacksinger_track(('.length, -')'.length)).data
        this.total = d.total
        this.singername = d.singer_name
        let r = []
        for (let i = 0; i < d.list.length; i++) {
          let default_track = {
            'way':'qq',
            'id': '',
            'title': '',
            'artist': '',
            'source_url': 'http://www.xiami.com/soing/0',
            'img_url': '',
          };
          default_track.id = d.list[i].musicData.songmid
          default_track.source = 'qq'
          default_track.img_url = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + d.list[i].musicData.albummid + '.jpg?max_age=2592000'
          default_track.title = d.list[i].musicData.songname
          default_track.artist = d.list[i].musicData.singer[0].name
          default_track.source_url = `http://ws.stream.qqmusic.qq.com/${d.list[i].musicData.songid}.m4a?fromtag=46`
          r.push(default_track)
        }
        return r
      },
      pageload() {
        if (this.$route.path != '/singer') {
          return
        }
        let that = this
        let n = 0
        this.id = this.$route.query.id
        this.pic = "https://y.gtimg.cn/music/photo_new/T001R500x500M000" + this.id + ".jpg?max_age=2592000";
        getQQ_singer(n, this.id)
          .then((data) => {
            this.data = this.qqsinger(data)
          })
          .then(() => {
            this.s = skrollr.init({
              smoothScrolling: true,
              smoothScrollingDuration: 200,
              forceHeight: true,
              render: function (data) {
                if (data.curTop == data.maxTop) {
                  Indicator.open({
                    text: '拼命加载中...',
                    spinnerType: 'fading-circle'
                  });
                  n += 30
                  if (n > that.total) {
                    Indicator.close()
                    return
                  }
                  getQQ_singer(n, that.id).then((data) => {
                    let d = that.qqsinger(data)
                    let dd = that.data
                    that.data = dd.concat(d)
                  })
                    .then(() => {
                      that.s.refresh()
                    })
                    .then(() => {
                      Indicator.close()
                    })
                }
              }
            })
          })

      }
    }
    ,
    mounted() {
      this.pageload()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;
  .singer_h {
    position: fixed;
    top: 0;
    width: 100%;
    height: px2rem(100);
    line-height: px2rem(100);
    background: transparent;
    padding: 0 px2rem(20);
    z-index: 10;
    > div {
      display: flex;
      justify-content: space-between;
      color: #fff;
    }

    .iconfont {
      font-size: px2rem(40);
      font-weight: 600;
    }
  }

  .singer_pic {
    width: 100%;
    height: px2rem(500);
    overflow: hidden;
    position: fixed;
    z-index: 8;
    img {
      width: 100%;
    }
  }

  .singer_s {
    position: absolute;
    top: px2rem(400);
    z-index: 8;
    width: 100%;
    margin-bottom: px2rem(110);
    .playall {
      color: #fff;
      font-size: px2rem(40);
      padding: px2rem(20);
      display: flex;
      height: px2rem(110);
      /*background-color: transparent;*/
      /*background:linear-gradient(top ,#fff, #eee);*/
      .iconfont {
        display: inline-block;
        font-size: px2rem(70);
        align-self: center;
        margin-top: px2rem(-10);
      }
      span {
        display: inline-block;
        align-self: center;
        margin-left: px2rem(20);
      }
    }
    .hotsong {
      background: #fff;
      min-height: px2rem(300);
      padding: px2rem(20) px2rem(20) 0;
      font-size: px2rem(40);
      ul {
        margin-top: px2rem(10);
        li {
          display: flex;
          height: px2rem(120);
          padding: px2rem(10) 0;
          font-size: px2rem(32);
          border-bottom: 1px solid #999;
          div:last-child {
            line-height: normal;
            margin-left: px2rem(20);
            height: px2rem(120);
            p:last-child {
              height: px2rem(60);
              line-height: px2rem(60);
              color: #CDCDCD;
              font-size: px2rem(26);
            }
          }
          .song_img {
            img {
              width: px2rem(100);
              height: px2rem(100);
            }
          }
        }
      }
    }
  }

</style>
