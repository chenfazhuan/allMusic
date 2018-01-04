<template>
  <div>
    <div class="top">
      <div class="header" :data-0=h_bg1 :data-400=h_bg2>
        <div @click="goback">
          <i class="iconfont icon-back"></i>
        </div>
        <div data-400="opacity:0" data-600="opacity:1">
          <div id="demo" class="qimo8">
            <div class="qimo">
              <div id="demo1">
                <ul>
                  <li>{{sheet_head.title}}</li>
                </ul>
              </div>
              <div id="demo2">
              </div>
            </div>
          </div>
        </div>
        <div style="opacity: 0">
          <i class="iconfont icon-shuaxin"></i>
        </div>
      </div>
    </div>
    <div>
      <div class="top">
        <p :style="'backgroundImage:url('+sheet_head.img+')'"></p>
        <div class="top_main">
          <div class="top_main_img">
            <img :src="sheet_head.img" alt="">
            <div>歌单</div>
          </div>
          <div class="top_main_font">
            <div>{{sheet_head.title}}</div>
            <div>

              <img :src="sheet_head.p_img" alt="">

              <span>{{sheet_head.platform}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sheet_main" id="skrollr-body">
        <div class="main_header" @click="playall">
        <span>
          <i class="iconfont icon-yuanxingbofang"></i>
        </span>
          <span>播放全部</span>
          <span>({{tracks.length}})首</span>
        </div>
        <ul>
          <li v-for="(item,index) in tracks" @click="playmusic(index)">
            <div class="num">
              {{index + 1}}
            </div>
            <div class="song">
              <div>{{item.title}}</div>
              <div>{{item.artist}}·{{item.album}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import skrollr from 'skrollr'
  import $ from 'jquery'
  import {getNe_SheetDetail} from 'api/transformation'
  import {getQQ_SheetDetail} from 'api/transformation'
  import {getXiami_SheetDetail} from 'api/transformation'
  import {getKg_SheetDetail} from 'api/transformation'
  import {getkg_music} from 'api/transformation'
  //  import {getlyric} from 'api/lyric'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        way: '',
        h_bg1: '',
        h_bg2: '',
        sheet_head: {},
        tracks: [],
        s: {}
      }
    },
    watch: {
      '$route': 'pageload'
    },
    methods: {
      ...mapActions({
        selectPlay: 'selectPlay',
      }),
      lunbo() {
        var demo = document.getElementById("demo");
        var demo1 = document.getElementById("demo1");
        var demo2 = document.getElementById("demo2");
        demo2.innerHTML = document.getElementById("demo1").innerHTML;

        function Marquee() {
          if (demo.scrollLeft - demo2.offsetWidth >= 0) {
            demo.scrollLeft -= demo1.offsetWidth;
          }
          else {
            demo.scrollLeft++;
          }
        }

        var myvar = setInterval(Marquee, 50);
        demo.onmouseout = function () {
          myvar = setInterval(Marquee, 50);
        }
        demo.onmouseover = function () {
          clearInterval(myvar);
        }
      },
      playmusic(i) {
        this.selectPlay({
          list: this.tracks, index: i
        })
      },
      playall() {
        this.playmusic(0)
      },
      pageload() {
        let that = this;
        if (this.$route.path == '/sheetDetail') {
          this.sheet_head = {}
          this.tracks = []
          let platform = this.$store.state.way
          if (platform == 'ne') {
            getNe_SheetDetail(this.$route.query.id)
              .then((data) => {
                this.sheet_head = {
                  platform: '网易云音乐',
                  img: data.playlist.coverImgUrl,
                  title: data.playlist.name,
                  p_img: 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.webp?imageView&thumbnail=60x0&quality=75&tostatic=0&type=webp'
                }
                document.styleSheets[0].addRule('.header::after', `background-image: url("${this.sheet_head.img}");`);
//                console.log(data)
                for (let i = 0; i < data.playlist.tracks.length; i++) {
                  let default_track = {
                    'id': '0',
                    'title': '',
                    'artist': '',
                    'artist_id': 'neartist_0',
                    'album': '',
                    'album_id': 'nealbum_0',
                    'source': 'netease',
                    'source_url': 'http://www.xiami.com/soing/0',
                    'img_url': '',
                    'url': ''
                  };
                  default_track.id = data.playlist.tracks[i].id;
                  default_track.title = data.playlist.tracks[i].name;
                  default_track.artist = data.playlist.tracks[i].ar[0].name;
//                  default_track.artist_id = 'neartist_' + data.playlist.tracks[i].artists[0].id;
                  default_track.album = data.playlist.tracks[i].al.name;
//                  default_track.album_id = 'nealbum_' + data.playlist.tracks[i].album.id;
                  default_track.source_url = `http://music.163.com/song/media/outer/url?id=${data.playlist.tracks[i].id}.mp3`;
                  default_track.img_url = data.playlist.tracks[i].al.picUrl;
                  default_track.url = default_track.id;
                  this.tracks.push(default_track);
                }
              })
              .then(() => {
                that.lunbo()
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false
                })
                that.s.isMobile()
              })
          }
          else if (platform == 'qq') {
            getQQ_SheetDetail(this.$route.query.id)
              .then((data) => {
                let qqreq = data.slice('jsonCallback('.length, -')'.length);
                qqreq = JSON.parse(qqreq);
                this.sheet_head = {
                  platform: 'QQ音乐',
                  img: qqreq.cdlist[0].logo,
                  title: qqreq.cdlist[0].dissname,
                  p_img: 'http://y.gtimg.cn/mediastyle/mod/mobile/img/logo.svg?max_age=2592000'
                }
                document.styleSheets[0].addRule('.header::after', `background-image: url("${this.sheet_head.img}");`);
                for (let i = 0; i < qqreq.cdlist[0].songlist.length; i++) {
                  let d = qqreq.cdlist[0].songlist;
                  let default_track = {
                    'id': '0',
                    'title': '',
                    'artist': '',
                    'artist_id': 'neartist_0',
                    'album': '',
                    'album_id': 'nealbum_0',
                    'source': 'qq',
                    'source_url': 'http://www.xiami.com/soing/0',
                    'img_url': '',
                    'url': ''
                  };
                  default_track.id = d[i].songmid;
                  default_track.title = d[i].songname;
                  default_track.artist = d[i].singer[0].name;
                  default_track.artist_id = '000KCjXT2PM9JZ';
                  default_track.album = d[i].albumname;
                  default_track.album_id = d[i].songmid;
                  default_track.source_url = `http://ws.stream.qqmusic.qq.com/${d[i].songid}.m4a?fromtag=46`;
                  default_track.img_url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${d[i].albummid}.jpg?max_age=2592000`;
                  default_track.url = '';
                  this.tracks.push(default_track);
                }
              })
              .then(() => {
                that.lunbo()
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false
                })
              })
          }
          else if (platform == 'xiami') {
            getXiami_SheetDetail(this.$route.query.id).then((data) => {
              let xmreq = data.slice('jsonp122('.length, -')'.length);
              xmreq = JSON.parse(xmreq)
              this.sheet_head = {
                platform: '虾米音乐',
                img: xmreq.data.logo,
                title: xmreq.data.collect_name,
                p_img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1137283699,4138679640&fm=58&bpow=270&bpoh=270&u_exp_0=950304595,3821912507&fm_exp_0=86'
              }
              document.styleSheets[0].addRule('.header::after', `background-image: url("${this.sheet_head.img}");`);
              for (let i = 0; i < xmreq.data.songs.length; i++) {
                let d = xmreq.data.songs;
                let default_track = {
                  'id': '',
                  'title': '',
                  'artist': '',
                  'artist_id': 'neartist_0',
                  'album': '',
                  'album_id': 'nealbum_0',
                  'source': 'xiami',
                  'source_url': 'http://www.xiami.com/soing/0',
                  'img_url': '',
                  'url': ''
                };
                default_track.id = d[i].lyric || d[i].song_name;
                default_track.title = d[i].song_name;
                default_track.artist = d[i].singers;
                default_track.artist_id = '';
                default_track.album = d[i].album_name;
                default_track.album_id = '';
                default_track.source_url = d[i].listen_file;
                default_track.source = 'xiami';
                default_track.img_url = d[i].album_logo;
                default_track.url = '';
                this.tracks.push(default_track);
              }
            }).then(() => {
              that.lunbo();
              that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false
                }
              )
              that.s.isMobile()
            })
          }
          else {
            getKg_SheetDetail(this.$route.query.id).then((data) => {
              let req = $.parseHTML(data);
              let logo = $(req).find('#imgBoxInfo img')[0].src
              let collect_name = $(req).find('.page-title')[0].innerHTML
              this.sheet_head = {
                platform: '酷狗音乐',
                img: logo,
                title: collect_name,
                p_img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=406144908,696751785&fm=58'
              }
              document.styleSheets[0].addRule('.header::after', `background-image: url("${this.sheet_head.img}");`);
              let reqi = 0
              $(req).find('.panel-songs-item-name span').each(function (index) {
                reqi = index
                let d = this.innerHTML
                let i = d.indexOf(" - ")
                let a = d.substring(0, i)
                let b = d.substring(i + 2)
                let url = $(this).parent().parent()[0].id
                let id = url.slice('songs_'.length)
                let default_track = {
                  'id': '0',
                  'title': '',
                  'artist': '',
                  'artist_id': 'neartist_0',
                  'album': '',
                  'album_id': 'nealbum_0',
                  'source': 'kg',
                  'source_url': 'http://www.xiami.com/soing/0',
                  'img_url': '',
                  'url': ''
                };
                getkg_music(id)
                  .then((data) => {
                    default_track.id = data.data.play_url;
                    default_track.title = b;
                    default_track.artist = a;
                    default_track.artist_id = '';
                    default_track.album = '';
                    default_track.album_id = '';
                    default_track.source_url = data.data.play_url;
                    default_track.img_url = data.data.img;
                    default_track.url = '';
                  })
                  .then(() => {
                    that.tracks.push(default_track);
                  }).then(() => {
                  if ($(req).find('.panel-songs-item-name span').length == ++reqi) {
                    that.lunbo();
                  }
                })
              })
            })

          }
        }

      },
      goback() {
        if (this.$store.state.way != 'kg') {
          this.s.destroy();
        }
        if (this.$route.query.form == 'index') {
          this.$router.go(-1)
        } else {
          this.$router.push({path: '/sheet', query: {form: 'detail', platform: this.$store.state.way}})
        }
      },
      reload() {
        this.$router.go(0)
      }
    },
    mounted() {
      this.pageload()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;

  .qimo8 {
    overflow: hidden;
    width: px2rem(500);
    text-align: center
  }

  .qimo8 .qimo { /*width:99999999px;*/
    width: 8000%;
    height: px2rem(50);
  }

  .qimo8 .qimo div {
    float: left;
  }

  .qimo8 .qimo ul {
    float: left;
    height: px2rem(50);
    overflow: hidden;
    zoom: 1;
  }

  .qimo8 .qimo ul li {
    float: left;
    line-height: px2rem(50);
  }

  .qimo8 li a {
    margin-right: px2rem(20);
    color: #fff;
  }

  #demo2 {
    margin-left: px2rem(20)
  }

  .iconfont {
    font-size: px2rem(30);
    font-weight: 600;
  }

  .header::after {
    content: " ";
    display: table;
    position: absolute;
    background-color: #fff;
    background-repeat: no-repeat;
    z-index: 10;
    left: 0;
    top: 0;
    height: px2rem(100);
    width: px2rem(750);
    /*background: url("http://music.163.com/api/img/blur/18862121974930552?param=170y170") no-repeat;*/
    filter: blur(20px);
    background-size: cover;
  }

  .top {
    position: relative;
    > p {
      height: px2rem(400);
      background-image: url("http://music.163.com/api/img/blur/18862121974930552?param=170y170");
      filter: blur(20px);
      background-size: cover;
    }
    background-size: cover;
    .header {
      background-color: #fff;
      z-index: 10;
      height: px2rem(100);
      width: px2rem(750);
      overflow: hidden;
      position: fixed;
      top: 0;
      display: flex;
      justify-content: space-between;
      padding: px2rem(20);
      font-size: px2rem(30);
      align-content: center;
      color: #fff;
      div {
        align-self: center;
        z-index: 20;
      }
      > div:nth-child(2) {
        max-width: px2rem(500);
        text-align: center;
        overflow: hidden;
        display: flex;
      }
    }
  }

  .top_main {
    display: flex;
    position: absolute;
    top: px2rem(120);
    left: px2rem(40);
    .top_main_font {
      margin-left: px2rem(32);
      > div:first-child {
        color: #fff;
        font-size: px2rem(34);
        margin-top: px2rem(40);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        padding-right: px2rem(20);
      }
      > div:last-child {
        display: flex;
        margin-top: px2rem(50);

        img {
          display: inline-block;
          width: px2rem(60);
          height: px2rem(60);
          border-radius: 50%;
        }
        span {
          margin-left: px2rem(20);
          color: hsla(0, 0%, 100%, .7);
          font-size: px2rem(28);
          height: px2rem(60);
          line-height: px2rem(60);
        }
      }
    }
    .top_main_img {
      img {
        width: px2rem(252);
        height: px2rem(252);
      }
      div {
        font-size: px2rem(18);
        background-color: rgba(217, 48, 48, .8);
        border-top-right-radius: px2rem(34);
        border-bottom-right-radius: px2rem(34);
        height: px2rem(34);
        line-height: px2rem(34);
        color: #fff;
        padding: 0 px2rem(16);
        width: px2rem(80);
        position: absolute;
        top: px2rem(20);
      }
    }
  }

  .sheet_main {
    font-size: px2rem(34);
    background-color: #fff;
    position: relative;
    ul {
      padding-bottom: px2rem(120);
      li {
        padding-top: px2rem(25);
        display: flex;
        font-size: px2rem(30);
        .num {
          color: #999;
          text-align: center;
          /*width: px2rem(50);*/
          font-size: px2rem(40);
          padding-left: px2rem(25);
        }
        .song {
          flex-basis: 100%;
          margin-left: px2rem(30);
          border-bottom: 1px solid #ddd;
          padding-bottom: px2rem(25);
          > div {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          > div:last-child {
            font-size: px2rem(25);
            color: #999;
            padding-right: px2rem(20);
          }
        }
      }
    }
    .main_header {
      border-bottom: 1px solid #999;
      .iconfont {
        font-size: px2rem(34);
      }
      span:last-child {
        font-size: px2rem(30);
        color: #888;
      }
      padding: px2rem(25) px2rem(25);
      margin-top: px2rem(-10);
    }
  }
</style>
