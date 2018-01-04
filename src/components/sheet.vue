<template>

  <div>
    <div class="header" :style="{backgroundColor:'rgb('+this.$store.state.h_bg+')'}">
      <div @click="goback">
        <i class="iconfont icon-back"></i>
      </div>
      <div>
        {{way}}歌单
      </div>
      <div style="opacity: 0">
        <i class="iconfont icon-shuaxin"></i>
      </div>
    </div>
    <ul ref="pm" id="skrollr-body">
      <li v-for="item in songsheet">
        <div class="sheet skrollable skrollable-between" data--500-top="background-position:0px 0px;"
             data-2000-top="background-position:0px -400px;"
             v-lazy:background-image="item.cover_img_url"
             :style="{backgroundImage:`url(${item.cover_img_url})`}"
             @click="sheet_detail(item.id)">
          <div class="block">
            <div>
              <i class="iconfont icon-maozhao"></i>
            </div>
            <div>
              {{item.title}}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import skrollr from 'skrollr'
  import {getNe_Songsheet} from 'api/transformation'
  import {getQQ_Songsheet} from 'api/transformation'
  import {getXiami_Songsheet} from 'api/transformation'
  import {getKg_Songsheet} from 'api/transformation'
  import {getParameterByName} from 'base/getParameterByName'
  import $ from 'jquery'
  import {Indicator} from 'mint-ui';

  export default {
    data() {
      return {
        songsheet: [],
        nesize: 0,
        qqsize: 0,
        qqsize1: 49,
        xiamisize: 1,
        kgsize: 1,
        topStatus: 0,
        way: '',
        s: {}
      }
    },
    computed: {},
    watch: {
      h(v) {
        console.log(v)
      },
      '$route': 'pageload'
    },
    methods: {
      reload() {
        this.$router.go(0)
      },
      sheet_detail(id) {
        this.s.destroy()
        this.$router.push({path: '/sheetDetail', query: {id: id}})
      },
      pageload() {
        let that = this;
        if (this.$route.path == '/sheet') {
          if (this.$route.query.platform == 'ne') {
            this.way = '网易';
            getNe_Songsheet(this.nesize)
              .then((data) => {
                if (that.$route.query.form != 'detail') {
                  that.songsheet = [];
                  let req = $.parseHTML(data);
                  $(req).find('.m-cvrlst li').each(function () {
                    let default_playlist = {
                      'h': '',
                      'cover_img_url': '',
                      'title': '',
                      'id': '',
                      'source_url': ''
                    }
                    let img = $(this).find('img')[0].src;
                    img = img.replace(/140y140/g, '750y750')
                    default_playlist.cover_img_url = img;
                    default_playlist.title = $(this).find('div a')[0].title;
                    let url = $(this).find('div a')[0].href;
                    let list_id = getParameterByName('id', url);
                    default_playlist.id = list_id;
                    default_playlist.source_url = 'http://music.163.com/#/playlist?id=' + list_id;
                    that.songsheet.push(default_playlist);
                  });
                } else {
                  return
                }
              })
              .then(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false,
                  render: function (data) {
                    if (data.curTop == data.maxTop) {
                      Indicator.open({
                        text: '拼命加载中...',
                        spinnerType: 'fading-circle'
                      });
                      that.nesize += 35
                      getNe_Songsheet(that.nesize).then((data) => {
                        let req = $.parseHTML(data);
                        $(req).find('.m-cvrlst li').each(function () {
                          let default_playlist = {
                            'h': '',
                            'cover_img_url': '',
                            'title': '',
                            'id': '',
                            'source_url': ''
                          }
                          let img = $(this).find('img')[0].src;
                          img = img.replace(/140y140/g, '750y750')
                          default_playlist.cover_img_url = img;

                          default_playlist.title = $(this).find('div a')[0].title;
                          let url = $(this).find('div a')[0].href;
                          let list_id = getParameterByName('id', url);
                          default_playlist.id = list_id;
                          default_playlist.source_url = 'http://music.163.com/#/playlist?id=' + list_id;
                          that.songsheet.push(default_playlist);
                        });
                      }).then(() => {
                        that.$set(that.songsheet, that.songsheet)
                        that.s.refresh()
                      }).then(() => {
                        Indicator.close()
                      })
                    }
                  }
                });
                that.s.isMobile()
              })
          }
          else if (this.$route.query.platform == 'qq') {
            this.way = 'QQ'
            getQQ_Songsheet(this.qqsize, this.qqsize1)
              .then((data) => {
                if (that.$route.query.form != 'detail') {
                  that.songsheet = [];
                  let qqreq = data.slice('MusicJsonCallback('.length, -')'.length);
                  qqreq = JSON.parse(qqreq);
                  this.result_1 = qqreq.data.list;
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
                    that.songsheet.push(default_playlist);
                  }
                } else {
                  return
                }
              })
              .then(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false,
                  render: function (data) {
                    if (data.curTop == data.maxTop) {
                      Indicator.open({
                        text: '拼命加载中...',
                        spinnerType: 'fading-circle'
                      });
                      that.qqsize += 50;
                      that.qqsize1 += 50;
                      getQQ_Songsheet(that.qqsize, that.qqsize1).then((data) => {
                        let qqreq = data.slice('MusicJsonCallback('.length, -')'.length);
                        qqreq = JSON.parse(qqreq);
                        this.result_1 = qqreq.data.list;
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
                          that.songsheet.push(default_playlist);
                        }
                      }).then(() => {
                        that.s.refresh()
                      }).then(() => {
                        Indicator.close()
                      })
                    }
                  }
                });
                that.s.isMobile()
              })
          }
          else if (this.$route.query.platform == 'xiami') {
            this.way = '虾米';
            getXiami_Songsheet(this.xiamisize)
              .then((data) => {
                if (that.$route.query.form != 'detail') {
                  that.songsheet = [];
                  let req = $.parseHTML(data);
                  $(req).find('.block_list ul li').each(function () {
                    let default_playlist = {
                      'cover_img_url': '',
                      'title': '',
                      'id': '',
                      'source_url': ''
                    };
                    let img = $(this).find('img')[0].src
                    img = img.replace(/c-100-100/g, 'c-400-400')
                    default_playlist.cover_img_url = img;
                    default_playlist.title = $(this).find('h3 a')[0].title;
                    let xiami_url = $(this).find('h3 a')[0].href;
                    let list_id = xiami_url.split('?')[0].split('/').pop()
                    default_playlist.id = list_id;
                    default_playlist.source_url = 'http://www.xiami.com/collect/' + list_id;
                    that.songsheet.push(default_playlist);
                  });
                }
                else {
                  return
                }
              })
              .then(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false,
                  render: function (data) {
                    if (data.curTop == data.maxTop) {
                      Indicator.open({
                        text: '拼命加载中...',
                        spinnerType: 'fading-circle'
                      });
                      that.xiamisize += 1
                      getXiami_Songsheet(that.xiamisize).then((data) => {
                        let req = $.parseHTML(data);
                        $(req).find('.block_list ul li').each(function () {
                          let default_playlist = {
                            'cover_img_url': '',
                            'title': '',
                            'id': '',
                            'source_url': ''
                          };
                          let img = $(this).find('img')[0].src
                          img = img.replace(/c-100-100/g, 'c-400-400')
                          default_playlist.cover_img_url = img;
                          default_playlist.title = $(this).find('h3 a')[0].title;
                          let xiami_url = $(this).find('h3 a')[0].href;
                          let list_id = xiami_url.split('?')[0].split('/').pop()
                          default_playlist.id = list_id;
                          default_playlist.source_url = 'http://www.xiami.com/collect/' + list_id;
                          that.songsheet.push(default_playlist);
                        });
                      }).then(() => {
                        that.s.refresh()
                      }).then(() => {
                        Indicator.close()
                      })
                    }
                  }
                });
                that.s.isMobile()
              })
          }
          else {
            that.way = '酷狗'
            getKg_Songsheet('', that.kgsize)
              .then((data) => {
                if (that.$route.query.form != 'detail') {
                  that.songsheet = [];
                  let info = data.plist.list.info;
                  for (let i = 0; i < data.plist.list.info.length; i++) {
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
                    that.songsheet.push(default_playlist);
                  }
                } else {
                  return
                }
              })
              .then(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false,
                  render: function (data) {
                    if (data.curTop == data.maxTop) {
                      Indicator.open({
                        text: '拼命加载中...',
                        spinnerType: 'fading-circle'
                      });
                      that.kgsize += 1
                      getKg_Songsheet('', that.kgsize).then((data) => {
                        let info = data.plist.list.info;
                        for (let i = 0; i < data.plist.list.info.length; i++) {
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
                          that.songsheet.push(default_playlist);
                        }
                      })
                        .then(() => {
                          that.s.refresh()
                        }).then(() => {
                        Indicator.close()
                      })
                    }
                  }
                });
                that.s.isMobile()
              })
          }
        }
      },
      goback() {
        this.s.destroy()
        this.$router.push({path: '/index'})
      }
    },
    mounted() {
      this.pageload()
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;

  #pm {
    width: 100%;
    height: 80%;
    position: fixed;
    z-index: -1;
  }

  .header {
    z-index: 9999;
    position: relative;
  }

  .iconfont {
    font-size: px2rem(30);
    font-weight: 600;
  }

  .sheet {
    /*background: url("http://pic.xiami.net/images/trade/common/4867/59eb2b4269a12_243351905_b_w498h498.jpg") no-repeat;*/
    width: 100%;
    background-repeat: no-repeat;
    height: px2rem(400);
    background-size: cover;
    display: flex;
    .block {
      align-self: center;
      width: 100%;
    }
    div {
      text-align: center;
      color: #fff;
      font-size: px2rem(30);
      .iconfont {
        font-size: px2rem(50);
        color: #fff;
      }
    }
  }

  ul {
    margin-top: px2rem(100);
    li {
      padding: px2rem(10) 0;
    }
  }

  .header {
    height: px2rem(100);
    width: px2rem(750);
    background: #d43e36;
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
    }
  }

</style>
