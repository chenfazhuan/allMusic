<template>
  <div class="in">
    <mt-loadmore :top-method="loadTop" ref="loadmore">

      <div class="swipe-wrapper">
        <mt-swipe :auto="0" ref="swipeWrapper">
          <mt-swipe-item class="swip-item-1 item" v-for="(items,index) in slider" :key="index">
            <a :href="items.linkUrl">
              <img alt="" v-lazy="items.picUrl">
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="favourite">
        <div class="f_title">最爱歌手</div>
        <div class="f_singer">
          <div>
            <img src="../common/image/tx.jpg" alt="" class="blur">
            <div class="f_name">周杰伦</div>
          </div>
          <div>
            <img src="../common/image/tx.jpg" alt="" class="blur">
            <div class="f_name">周杰伦</div>
          </div>
          <div>
            <img src="../common/image/tx.jpg" alt="" class="blur">
            <div class="f_name">周杰伦</div>
          </div>
        </div>
      </div>
      <div class="favourite sheet">
        <div class="f_title">推荐歌单</div>
        <div class="f_singer">
          <div v-for="(items,index) in result_1">
            <img v-lazy="items.cover_img_url"
                 alt=""/>
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">{{items.title}}</div>
          </div>
        </div>
        <div class="f_singer">
          <div v-for="(items,index) in result_2">
            <img v-lazy="items.cover_img_url"
                 alt=""/>
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">{{items.title}}</div>
          </div>
        </div>
      </div>
      <div class="favourite new_music">
        <div class="f_title">最新音乐</div>
        <ul>
          <li v-for="items in newMusic">
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
    </mt-loadmore>

  </div>
</template>

<script>
  import {getQQ_Carousel} from 'api/transformation'
  import {getXiami_Carousel} from 'api/transformation'
  import {getKg_Carousel} from 'api/transformation'

  import {getQQ_Songsheet} from 'api/transformation'
  import {getNe_Songsheet} from 'api/transformation'
  import {getXiami_Songsheet} from 'api/transformation'
  import {getKg_Songsheet} from 'api/transformation'

  import {getNe_Newmusic} from 'api/transformation'
  import {getXiami_Newmusic} from 'api/transformation'
  import {getKg_Newmusic} from 'api/transformation'
  import {getQQ_Newmusic} from 'api/transformation'

  import $ from 'jquery'
  import {getParameterByName} from 'base/getParameterByName'

  export default {
    data() {
      return {
        platform: 'qq',
        slider: [],
        slider_link: [],
        result: [],
        result_1: [],
        result_2: [],
        newMusic: []
      }
    },
    methods: {
      loadTop() {
//        this.$refs.loadmore.onTopLoaded();
      },
      pageload() {
        let platform = this.platform;
        let time = new Date();
        if (platform == 'qq' || platform == 'ne') {
          getQQ_Carousel(platform, time).then((data) => {
            this.slider = data.data.slider
          })
        }
        if (platform == 'qq') {
          getQQ_Songsheet().then((data) => {
            let qqreq = data.slice('MusicJsonCallback('.length, -')'.length);
            qqreq = JSON.parse(qqreq);
            this.result_1 = qqreq.data.list;
            let that = this;
            for (let i = 0; i < qqreq.data.list.length; i++) {
              let default_playlist = {
                'cover_img_url': '',
                'title': '',
                'id': '',
                'source_url': ''
              };
              default_playlist.cover_img_url = qqreq.data.list[i].imgurl;
              default_playlist.title = qqreq.data.list[i].dissname;

              that.result.push(default_playlist);
            }
            this.result_1 = this.result.slice(0, 3);
            this.result_2 = this.result.slice(3, 6);
          })
          getQQ_Newmusic(platform,time).then((data) => {
            console.log(data)
            let result=[];
            for (let i = 0; i < 10; i++) {
              let new_music = {
                new_song: '',
                new_singer: '',
                new_img: ''
              }

              new_music.new_img = data.topinfo.pic_v12;
              new_music.new_song = data.songlist[i].data.albumname;
              new_music.new_song = data.songlist[i].data.singer[0].name;

              result.push(new_music);
            }
            this.newMusic=result
          })
        }
        if (platform == 'ne') {
          getNe_Songsheet(platform).then((data) => {
            let req = $.parseHTML(data);
            let result = this.result;
            let that = this;
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
              default_playlist.id = 'neplaylist_' + list_id;
              default_playlist.source_url = 'http://music.163.com/#/playlist?id=' + list_id;
              result.push(default_playlist);
            });
            this.result_1 = this.result.slice(0, 3);
            this.result_2 = this.result.slice(3, 6);
          })
          getNe_Newmusic(platform).then((data) => {
            let req = $.parseHTML(data);
            let txt=JSON.parse($(req).find('textarea')[0].innerText);
            let result = [];
            let that = this;
            for(let i=0;i<10;i++){
              let new_music = {
                new_song: '',
                new_singer: '',
                new_img: ''
              }
              new_music.new_img = txt[i].album.picUrl;
              new_music.new_song = txt[i].album.name;
              result.push(new_music)
            }
            console.log(result)
            this.newMusic = result
          })
        }
        if (platform == 'xiami') {
          getXiami_Songsheet(platform).then((data) => {
            let req = $.parseHTML(data);
            let that = this;
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
              default_playlist.id = 'xmplaylist_' + list_id;
              default_playlist.source_url = 'http://www.xiami.com/collect/' + list_id;
              that.result.push(default_playlist);
            });
            this.result_1 = this.result.slice(0, 3);
            this.result_2 = this.result.slice(3, 6);
          });
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

          });
          getXiami_Newmusic(platform, time).then((data) => {
            let req = $.parseHTML(data);
            let result = []
            $(req).find('.song').each(function () {
              let new_music = {
                new_song: '',
                new_singer: '',
                new_img: ''
              }
              new_music.new_singer = $(this).find('.artist').html();
              new_music.new_song = $(this).find('strong a').html();
              new_music.new_img = $(this).find('img')[0].src;
              result.push(new_music)
            })
            this.newMusic = result.slice(0, 10)
          })
        }
        if (platform == 'kg') {
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
          })
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
              result.push(default_playlist);
            }
            this.result_1 = result.slice(0, 3);
            this.result_2 = result.slice(3, 6);

          })
          getKg_Newmusic(platform, 1).then((data) => {
            let img = data.info.imgurl.replace(/{size}/ig, "400");
            let result=[];
            for (let i = 0; i < 10; i++) {
              let new_music = {
                new_song: '',
                new_singer: '',
                new_img: ''
              }

              let info = data.songs.list[i].filename;
              new_music.new_img = img;
              new_music.new_song = info;
              result.push(new_music);
            }
            this.newMusic=result
          })
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

  .new_img {
    margin-right: px2rem(10);
    img {
      width: px2rem(80);
      height: px2rem(80);
    }
  }

  .in {
    margin-top: px2rem(150);
  }

  .no {
    height: px2rem(110);
    width: 100%;
  }

  .iconfont {
    position: absolute;
    font-size: px2rem(30);
    color: #fff;
    top: px2rem(10);
    right: px2rem(30);
  }

  .blur {
    -webkit-filter: blur(2px); /* Chrome, Opera */
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }

  .mint-swipe-indicator {
    width: px2rem(8);
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
  .new_font{
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
