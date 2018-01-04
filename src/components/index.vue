<template>
  <div class="in" v-show="!fullScreen">
    <!--<mt-loadmore :top-method="loadTop" ref="loadmore">-->

    <div class="swipe-wrapper">
      <mt-swipe :auto="4000" ref="swipeWrapper">
        <mt-swipe-item class="swip-item-1 item" v-for="(items,index) in slider" :key="index">
          <a :href="items.linkUrl?items.linkUrl:items.url">
            <img alt="" v-lazy="items.picUrl">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="favourite">
      <router-link to="/singerlist">
        <div class="f_title">最爱歌手<i class="iconfont icon-more"></i></div>
      </router-link>

      <div class="f_singer">
        <div @click.stop="gosinger(item.mid)" v-for="item in singerlist">
          <img :src=item.pic alt="">
          <div class="f_name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="favourite sheet">
      <div class="f_title" @click="moresheet">推荐歌单<i class="iconfont icon-more"></i></div>
      <div class="f_singer">
        <div v-for="(items,index) in result_1" @click="sheetDetail(items.id)">
          <img v-lazy="items.cover_img_url"
               alt=""/>
          <i class="iconfont icon-erji"></i>
          <div class="sheet_font">{{items.title}}</div>
        </div>
      </div>
      <div class="f_singer">
        <div v-for="(items,index) in result_2" @click="sheetDetail(items.id)">
          <img v-lazy="items.cover_img_url"
               alt=""/>
          <i class="iconfont icon-erji"></i>
          <div class="sheet_font">{{items.title}}</div>
        </div>
      </div>
    </div>
    <div class="favourite new_music">
      <div class="f_title" @click="gorank">最新音乐<i class="iconfont icon-more"></i></div>
      <ul>
        <li v-for="items,index in newMusic" @click="playmusic(index)">
          <div style="display: flex">
            <div class="new_img">
              <img v-lazy="items.new_img">
            </div>
            <div class="new_font">
              <p class="new_song">
                {{items.new_song}}
              </p>
              <p class="new_singer">
                {{items.new_singer}}
              </p>
            </div>

          </div>
          <p>
            <i class="iconfont icon-yuanxingbofang"></i>
          </p>
        </li>
      </ul>
    </div>
    <div class="no"></div>
    <!--</mt-loadmore>-->

  </div>
</template>

<script>
  import {getQQ_Carousel} from 'api/transformation'
  import {getXiami_Carousel} from 'api/transformation'
  import {getKg_Carousel} from 'api/transformation'
  import {getNe_Carousel} from 'api/transformation'

  import {getQQ_Songsheet} from 'api/transformation'
  import {getNe_Songsheet} from 'api/transformation'
  import {getXiami_Songsheet} from 'api/transformation'
  import {getKg_Songsheet} from 'api/transformation'

  import {getNe_Newmusic} from 'api/transformation'
  import {getXiami_Newmusic} from 'api/transformation'
  import {getKg_Newmusic} from 'api/transformation'
  import {getQQ_Newmusic} from 'api/transformation'
  import {getkg_music} from 'api/transformation'

  import {getQQ_song} from 'api/transformation'

  import $ from 'jquery'
  import {getParameterByName} from 'base/getParameterByName'

  import {mapActions, mapGetters} from 'vuex'
  import {xiami_change} from 'api/jiexi'
  import {Indicator} from 'mint-ui'

  import {getQQ_singerlist} from 'api/transformation'

  export default {
    data() {
      return {
        platform: this.$store.state.way,
        slider: [],
        slider_link: [],
        result_1: [],
        result_2: [],
        newMusic: [],
        singerlist: []
      }
    },
    computed: {
      getWay() {
        return this.$store.state.way
      },
      ...mapGetters([
        'fullScreen'
      ])
    },
    watch: {
      getWay(val) {
        if (this.platform == val) {
          return
        } else {
          this.platform = val
          this.pageload()
        }

      }
    },
    methods: {
      ...mapActions({
        selectPlay: 'selectPlay'
      }),
      gosinger(id) {
        this.$router.push({path:'/singer',query:{id:id}})
      },
      playmusic(i) {
        this.selectPlay({
          list: this.newMusic, index: i
        })
      },
      gorank() {
        this.$router.push('/rank')
      },
      moresheet() {
        this.$router.push({path: '/sheet', query: {platform: this.platform}})
      },
      sheetDetail(i) {
        this.$router.push({path: '/sheetDetail', query: {id: i, form: 'index'}})
      },
      pageload() {
        let p0 = new Promise((resolve, reject) => {
          let re=[]
          getQQ_singerlist(1).then((data) => {
            let list1 = data.slice('GetSingerListCallback(('.length, -')'.length)
            let d = JSON.parse(list1).data.list
            for (let i = 0; i < 3; i++) {
              let r = {id: 0, name: '', mid: '', pic: ''}
              r.id = d[i].Fsinger_id
              r.name = d[i].Fsinger_name
              r.mid = d[i].Fsinger_mid
              r.pic = `https://y.gtimg.cn/music/photo_new/T001R500x500M000${d[i].Fsinger_mid}.jpg?max_age=2592000`
              re.push(r)
            }
            this.singerlist=re
          })
        })
        let platform = this.platform;
        let time = new Date();
        if (platform == 'qq') {
          Indicator.open({
            text: '拼命加载中...',
            spinnerType: 'fading-circle'
          });
          let p1 = new Promise((resolve, reject) => {
            getQQ_Carousel(platform, time).then((data) => {
              this.slider = data.data.slider
              resolve(data)
            })
          })
          let p2 = new Promise((resolve, reject) => {
            getQQ_Songsheet(0, 49).then((data) => {
              let qqreq = data.slice('MusicJsonCallback('.length, -')'.length);
              qqreq = JSON.parse(qqreq);
              this.result_1 = qqreq.data.list;
              let that = this;
              let result = [];
              for (let i = 0; i < qqreq.data.list.length; i++) {
                let default_playlist = {
                  'cover_img_url': '',
                  'title': '',
                  'id': '',
                  'source_url': ''
                };

                default_playlist.cover_img_url = qqreq.data.list[i].imgurl;
                default_playlist.title = qqreq.data.list[i].dissname;
                default_playlist.id = qqreq.data.list[i].dissid;
                result.push(default_playlist);
              }
              this.result_1 = result.slice(0, 3);
              this.result_2 = result.slice(3, 6);
              resolve(result)
            })
          })
          let p3 = new Promise((resolve, reject) => {
            getQQ_Newmusic(platform, time).then((data) => {
              let result = [];
              for (let i = 0; i < 10; i++) {
                let new_music = {
                  new_song: '',
                  new_singer: '',
                  new_img: '',
                  img_url: '',
                  source_url: '',
                  artist: '',
                  title: '',
                  source: '',
                  id: ''
                }

                new_music.new_img = data.topinfo.pic_v12;
                new_music.img_url = data.topinfo.pic_v12;
                let id=data.songlist[i].data.songmid
                getQQ_song(id)
                  .then((data)=>{
                    let key=JSON.parse(data.slice('MusicJsonCallback('.length,-')'.length))
                    key=key.data.items[0].vkey
                    new_music.source_url=`http://dl.stream.qqmusic.qq.com/C400${id}.m4a?vkey=${key}&guid=8284612410&uin=0&fromtag=66`
                  })
//                new_music.source_url = `http://ws.stream.qqmusic.qq.com/${data.songlist[i].data.songid}.m4a?fromtag=46`;
                new_music.new_song = data.songlist[i].data.albumname;
                new_music.title = data.songlist[i].data.albumname;
                new_music.new_singer = data.songlist[i].data.singer[0].name;
                new_music.artist = data.songlist[i].data.singer[0].name;
                new_music.source = 'qq';
                new_music.id = data.songlist[i].data.songmid;
                result.push(new_music);
              }
              this.newMusic = result
              resolve(result)
            })
          })
          Promise.all([p1, p2, p3]).then(function (results) {
            Indicator.close()
          });
        }
        if (platform == 'ne') {
          Indicator.open({
            text: '拼命加载中...',
            spinnerType: 'fading-circle'
          });
          let p1 = new Promise((resolve, reject) => {
            getNe_Carousel().then((data) => {
              let d = String(data)
              let a = d.lastIndexOf('window.Gbanners') + 18
              let b = d.lastIndexOf('monitorClick: ""') + 20
              let r = d.substring(a, b)
              r = eval('(' + r + ')')
              this.slider = r
              resolve(r)
            })
          })
          let p2 = new Promise((resolve, reject) => {
            getNe_Songsheet(35).then((data) => {
              let req = $.parseHTML(data);
              let result = []
              $(req).find('.m-cvrlst li').each(function () {
                let default_playlist = {
                  'cover_img_url': '',
                  'title': '',
                  'id': '',
                  'source_url': ''
                }
                default_playlist.cover_img_url = $(this).find('img')[0].src;
                default_playlist.title = $(this).find('div a')[0].title;
                let url = $(this).find('div a')[0].href;
                let list_id = getParameterByName('id', url);
                default_playlist.id = list_id;
                default_playlist.source_url = 'http://music.163.com/#/playlist?id=' + list_id;
                result.push(default_playlist);
              });
              this.result_1 = result.slice(0, 3);
              this.result_2 = result.slice(3, 6);
              resolve(result)
            })
          })
          let p3 = new Promise((resolve, reject) => {
            getNe_Newmusic(platform).then((data) => {
              let req = $.parseHTML(data);
              let txt = JSON.parse($(req).find('textarea')[0].innerText);
              let result = [];
              let that = this;
              for (let i = 0; i < 10; i++) {
                let new_music = {
                  new_song: '',
                  new_singer: '',
                  new_img: '',
                  title: '',
                  artist: '',
                  img_url: '',
                  source_url: '',
                  id: '',
                  source: ''
                }
                new_music.new_img = txt[i].album.picUrl;
                new_music.id = txt[i].id;
                new_music.source = 'netease';
                new_music.img_url = txt[i].album.picUrl;
                new_music.new_song = txt[i].name;
                new_music.title = txt[i].name;
                new_music.new_singer = txt[i].artists[0].name;
                new_music.artist = txt[i].artists[0].name;
                new_music.source_url = `http://music.163.com/song/media/outer/url?id=${txt[i].id}.mp3`;
                result.push(new_music)
              }
              this.newMusic = result
              resolve(result)
            })
          })
          Promise.all([p1, p2, p3]).then(function (results) {
            Indicator.close()
          });
        }
        if (platform == 'xiami') {
          Indicator.open({
            text: '拼命加载中...',
            spinnerType: 'fading-circle'
          });
          let p1 = new Promise((resolve, reject) => {
            getXiami_Songsheet(1).then((data) => {
              let req = $.parseHTML(data);
              let result = []
              $(req).find('.block_list ul li').each(function () {
                let default_playlist = {
                  'cover_img_url': '',
                  'title': '',
                  'id': '',
                  'source_url': ''
                };

                default_playlist.cover_img_url = $(this).find('img')[0].src;
                default_playlist.title = $(this).find('h3 a')[0].title;
                let xiami_url = $(this).find('h3 a')[0].href;
                let list_id = xiami_url.split('?')[0].split('/').pop()
                default_playlist.id = list_id;
                default_playlist.source_url = 'http://www.xiami.com/collect/' + list_id;
                result.push(default_playlist);
              });
              this.result_1 = result.slice(0, 3);
              this.result_2 = result.slice(3, 6);
              resolve(result)
            });
          })
          let p2 = new Promise((resolve, reject) => {
            getXiami_Carousel(platform).then((data) => {
              let req = $.parseHTML(data);
              let result = [];
              $(req).find('#slider .item').each(function () {
                let default_Carousel = {
                  linkUrl: '',
                  picUrl: ''
                };
                default_Carousel.picUrl = $(this).find('img')[0].src;
                default_Carousel.linkUrl = $(this).find('a')[0].href;
                result.push(default_Carousel);
              });
              this.slider = result
              resolve(result)
            });
          })
          let p3 = new Promise((resolve, reject) => {
            getXiami_Newmusic(platform, time).then((data) => {
              let req = $.parseHTML(data);
              let result = []
              $(req).find('.song').each(function (index) {
                if (index < 10) {
                  let mp3 = $(this).closest('.songwrapper')[0].dataset.mp3
                  let new_music = {
                    new_song: '',
                    new_singer: '',
                    new_img: '',
                    title: '',
                    artist: '',
                    img_url: '',
                    source_url: '',
                    id:''
                  }
                  new_music.source_url = xiami_change(mp3)
                  new_music.new_singer = $(this).find('.artist').html();
                  new_music.artist = $(this).find('.artist').html();
                  new_music.new_song = $(this).find('strong a').html();
                  new_music.title = $(this).find('strong a').html();
                  new_music.new_img = $(this).find('img')[0].src;
                  new_music.img_url = $(this).find('img')[0].src;
                  new_music.id = $(this).find('img')[0].src;
                  result.push(new_music)
                }
              })
              this.newMusic = result
              resolve(result)
            });
          })
          Promise.all([p1, p2, p3]).then(function (results) {
            Indicator.close()
          });
        }
        if (platform == 'kg') {
          Indicator.open({
            text: '拼命加载中...',
            spinnerType: 'fading-circle'
          });
          let p1 = new Promise((resolve, reject) => {
            getKg_Carousel().then((data) => {
              let req = $.parseHTML(data);
              let result = [];
              $(req).find('.swipe-wrap div').each(function () {
                let default_Carousel = {
                  linkUrl: '',
                  picUrl: ''
                };
                default_Carousel.picUrl = $(this).find('img')[0].src;
                default_Carousel.linkUrl = $(this).find('a')[0].href;
                result.push(default_Carousel);
              });
              this.slider = result
              resolve(result)
            })
          })
          let p2 = new Promise((resolve, reject) => {
            getKg_Songsheet(platform, 1).then((data) => {
              let info = data.plist.list.info;
              let result = [];
              for (let i = 0; i < 6; i++) {
                let default_playlist = {
                  'cover_img_url': '',
                  'title': '',
                  'id': '',
                  'source_url': ''
                };

                let img = info[i].imgurl.replace(/{size}/ig, "400");
                default_playlist.cover_img_url = img;
                default_playlist.title = info[i].specialname;
                default_playlist.id = info[i].specialid;
                result.push(default_playlist);
              }
              this.result_1 = result.slice(0, 3);
              this.result_2 = result.slice(3, 6);
              resolve(result)
            })
          })
          let p3 = new Promise((resolve, reject) => {
            getKg_Newmusic(platform, 1).then((data) => {
              let img = data.info.imgurl.replace(/{size}/ig, "400");
              let result = [];
              for (let i = 0; i < 10; i++) {
                let new_music = {
                  new_song: '',
                  new_singer: '',
                  new_img: '',
                  source_url: "",
                  title: '',
                  artist: '',
                  img_url: '',
                  source: ''
                }

                let info = data.songs.list[i].filename;
                new_music.new_song = info;
                new_music.source = 'kg';
                new_music.title = info;
                new_music.new_singer = data.songs.list[i].remark;
                new_music.artist = data.songs.list[i].remark;
                getkg_music(data.songs.list[i].hash).then((data) => {
                  new_music.source_url = data.data.play_url;
                  new_music.img_url = data.data.img;
                  new_music.new_img = data.data.img;
                })
                result.push(new_music);
              }
              this.newMusic = result
              resolve(result)
            })
          })
          Promise.all([p1, p2, p3]).then(function (results) {
            Indicator.close()
          });
        }
      }
    },
    created() {
      this.pageload()//页面载入加载数据
    }
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/px2rem";

  $designWidth: 750;
  .swipe-wrapper img {
    height: 100%;
  }

  a:visited {
    color: #000;
  }

  .new_img {
    margin-right: px2rem(10);
    img {
      width: px2rem(80);
      height: px2rem(80);
    }
  }

  .in {
    margin-top: px2rem(170);
  }

  .no {
    height: px2rem(110);
    width: 100%;
  }

  .new_song {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .iconfont {
    position: absolute;
    font-size: px2rem(30);
    color: #fff;
    top: px2rem(10);
    right: px2rem(30);
  }

  .icon-more {
    position: static;
    color: #000;
  }

  .blur {
    -webkit-filter: blur(2px); /* Chrome, Opera */
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }

  .swipe-wrapper {
    width: 100%;
    height: px2rem(300);
    img {
      width: 100%;
    }
  }

  .favourite {
    padding: px2rem(30) 0;
    .f_title {
      padding-left: px2rem(10);
      font-size: px2rem(30);
      border-left: 5px solid #D33A31;
    }
    .f_singer {
      display: flex;
      justify-content: space-between;
      margin-top: px2rem(30);
      img {
        width: 100%;
        display: block;
      }
      > div {
        position: relative;
        width: px2rem(240);

        .f_name {
          color: #fff;
          font-size: px2rem(35);
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          top: 50%;
          font-weight: 500;
        }
      }
    }
  }

  .sheet {
    padding-top: 0 !important;
    .sheet_font {
      font-size: px2rem(25);
      padding: px2rem(10);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      padding-bottom: 0;
    }
  }

  .new_font {
    flex-basis: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    max-width: px2rem(500);
    padding-bottom: 0;
  }

  .new_music {
    padding-top: 0 !important;
    ul {
      li:first-child {
        padding-top: px2rem(30);
      }
      li {
        display: flex;
        justify-content: space-between;
        font-size: px2rem(30);
        padding: px2rem(20);
        border-bottom: px2rem(1) solid #F1F1F2;
        .new_singer {
          color: #888;
          font-size: px2rem(25);
        }
        p {
          i {
            position: relative;
            font-size: px2rem(40);
            color: #AAAAAA;
          }
        }
      }
    }

  }


</style>
