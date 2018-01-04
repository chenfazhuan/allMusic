<template>
  <div id="search">
    <div class="default" v-show="!showresult">
      <div id="hot">{{way}}搜索</div>
      <ul class="hotName">
        <li v-for="item in result">
          <a :href="item.jumpurl ? item.jumpurl:'javascript:void(0)'"
             @click.stop="gosearch(item.keyword)">
            <span>{{item.keyword}}</span>
          </a>
        </li>
      </ul>
      <div id="history">
        <ul v-for="(item,index) in k">
          <li style="flex-basis: 100%" @click.stop="gosearch(item)">
            <i class="iconfont icon-changpian"></i>
            <span>{{item}}</span>
          </li>
          <li @click.stop="rmsearch(index)"><i class="iconfont icon-close"></i></li>
        </ul>
      </div>
    </div>
    <div class="result" v-show="showresult">
      <ul id="skrollr-body">
        <li v-if="singer.show" @click="gosinger(singer.singermid)">
          <div>
            <img :src="singer.img_url" alt="" class="singerpic">
          </div>
          <div>
            <div>
              <div class="singer">{{singer.singer}}</div>
              <div class="song">
                <span v-if="singer.songnum">单曲:{{singer.songnum}}</span>
                <span v-if="singer.albumnum">专辑:{{singer.albumnum}}</span>
                <div v-if="singer.albumname">{{singer.albumname}}</div>
              </div>
            </div>
          </div>
        </li>
        <li v-for="(item, index) in searchList" @click.stop="addmusic(index)">
          <div>
            <i class="iconfont icon-erji"></i>
          </div>
          <div>
            <div>
              <div class="singer">{{item.songname}}</div>
              <div class="song">{{item.singername}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getKg_Hotsearch} from 'api/transformation'
  import {getQQ_Hotsearch} from 'api/transformation'
  import {getQQ_search} from 'api/transformation'
  import {getNe_search} from 'api/transformation'
  import {getXiami_search} from 'api/transformation'
  import {getKg_search} from 'api/transformation'
  import {getkg_music} from 'api/transformation'
  import skrollr from 'skrollr'
  import {Indicator} from 'mint-ui'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        result: [],
        way: '',
        searchList: [],
        showresult: false,
        singer: {},
        s: '',
        a: '',
        k: []
      }
    },
    props: {
      keyword: {type: String, default: ''},
      searchnum: {type: Number, default: 0}
    },
    computed: {
      choose() {
        return this.$store.state.way
      }
    },
    watch: {
      choose(val) {
        this.pageload(val)
      },
      'searchnum': {
        handler: function (val, oldVal) {
          this.gosearch(this.keyword)
        }
      },
      '$route': 'goback'
    },
    methods: {
      ...mapActions({
        addPlay: 'addPlay'
      }),
      rmsearch(i) {
        let kw = JSON.parse(localStorage['cfzkeyword'])
        kw.splice(i, 1)
        this.k = kw
        localStorage.setItem('cfzkeyword', JSON.stringify(kw))
      },
      addmusic(i) {
        this.addPlay(this.searchList[i])
      },
      goback() {
        this.searchList = []
        this.singer = {}
        this.showresult = false
        this.addkw()
        if (this.s) {
          this.s.destroy();
        }
      },
      gosinger(d) {
        this.$router.push({path: '/singer', query: {id: d}})
      },
      pageload(platform) {
        if (platform == 'kg') {
          getKg_Hotsearch().then((data) => {
            let d = data.replace(/\(/g, '');
            d = d.replace(/\)/g, '')
            let obj = JSON.parse(d);
            this.result = obj.data.info
            this.way = '酷狗热门'
          })
        }
        if (platform == 'qq') {
          getQQ_Hotsearch().then((data) => {
            this.result = [];
            for (let i = 0; i < 15; i++) {
              let obj = {
                keyword: '',
                id: ''
              };
              obj.keyword = data.data.hotkey[i].k
              obj.id = data.data.hotkey[i].n
              this.result.push(obj)
              this.way = 'QQ热门'
            }
          })
        }
        if (platform == 'xiami') {
          this.result = []
          this.way = '虾米'
        }
        if (platform == 'ne') {
          this.result = []
          this.way = '网易'
        }
      },
      gosearch(key) {
        this.$emit('searchkey', key)
        let that = this
        that.searchList = []
        let num = 1
        let i = 1
        if (that.s) {
          that.s.destroy();
        }
        if (this.$store.state.way == 'qq') {
          getQQ_search(i, key)
            .then((d) => {
              num = d.data.song.totalnum / 20
              let data = d.data
              this.showresult = true
              if (data.zhida.type != 0) {
                this.singer = {
                  show: true,
                  img_url: data.zhida.singermid ? `https://y.gtimg.cn/music/photo_new/T001R68x68M000${data.zhida.singermid}.jpg?max_age=2592000` : `https://y.gtimg.cn/music/photo_new/T002R68x68M000${data.zhida.albummid}.jpg?max_age=2592000`,
                  singer: data.zhida.singername,
                  songnum: data.zhida.songnum,
                  albumnum: data.zhida.albumnum,
                  singermid: data.zhida.singermid,
                  albumname: data.zhida.albumname
                }
              }
              else {
                this.singer = {show: false}
              }
              for (let i = 0; i < data.song.list.length; i++) {
                let list = data.song.list
                let r = {
                  singername: list[i].singer[0].name,
                  songname: list[i].songname,
                  songid: list[i].songid,
                  artist: list[i].songname,
                  id: list[i].songmid,
                  img_url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                  source: 'qq',
                  source_url: `http://ws.stream.qqmusic.qq.com/${list[i].songid}.m4a?fromtag=46`,
                  title: list[i].singer[0].name
                }
                that.searchList.push(r)
              }
            })
            .then(() => {
              this.$nextTick(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false,
                  render: function (data) {
                    if (data.curTop == data.maxTop && data.maxTop > window.screen.height) {
                      i++
                      if (num < i) {
                        Indicator.close()
                      } else {
                        Indicator.open({
                          text: '拼命加载中...',
                          spinnerType: 'fading-circle'
                        });
                        getQQ_search(i, key)
                          .then((d) => {
                            let data = d.data
                            this.showresult = true
                            if (data.zhida.type != 0) {
                              this.singer = {
                                show: true,
                                img_url: data.zhida.singermid ? `https://y.gtimg.cn/music/photo_new/T001R68x68M000${data.zhida.singermid}.jpg?max_age=2592000` : `https://y.gtimg.cn/music/photo_new/T002R68x68M000${data.zhida.albummid}.jpg?max_age=2592000`,
                                singer: data.zhida.singername,
                                songnum: data.zhida.songnum,
                                albumnum: data.zhida.albumnum,
                                singermid: data.zhida.singermid,
                                albumname: data.zhida.albumname
                              }
                            }
                            for (let i = 0; i < data.song.list.length; i++) {
                              let list = data.song.list
                              let r = {
                                singername: list[i].singer[0].name,
                                songname: list[i].songname,
                                songid: list[i].songid,
                                artist: list[i].songname,
                                id: list[i].songmid,
                                img_url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                                source: 'qq',
                                source_url: `http://ws.stream.qqmusic.qq.com/${list[i].songid}.m4a?fromtag=46`,
                                title: list[i].singer[0].name
                              }
                              that.searchList.push(r)
                            }
                          })
                          .then(() => {
                            that.s.refresh()
                          }).then(() => {
                          Indicator.close()
                        })
                      }
                    }
                  }
                })
              }, 20)
            })
        }
        else if (this.$store.state.way == 'ne') {
          let a = 0;
          getNe_search(0, key).then((data) => {
            num = data.result.songCount
//            console.log(data.result.songs)
            for (let i = 0; i < data.result.songs.length; i++) {
              let list = data.result.songs
              this.showresult = true
              let r = {
                singername: list[i].artists[0].name,
                songname: list[i].name,
                songid: list[i].mp3Url,
                artist: list[i].artists[0].name,
                id: list[i].id,
                img_url: list[i].album.blurPicUrl,
                source: 'netease',
                source_url: `http://music.163.com/song/media/outer/url?id=${list[i].id}.mp3`,
                title: list[i].name
              }
              that.searchList.push(r)
            }
          })
            .then(() => {
              this.$nextTick(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false,
                  render: function (data) {
                    if (data.curTop == data.maxTop && data.maxTop > window.screen.height) {
                      a++;
                      let w = a * 20
                      if (num < w) {
                        return
                      } else {
                        Indicator.open({
                          text: '拼命加载中...',
                          spinnerType: 'fading-circle'
                        });
                        getNe_search(w, key).then((data) => {
                          for (let i = 0; i < data.result.songs.length; i++) {
                            let list = data.result.songs
                            let r = {
                              singername: list[i].artists[0].name,
                              songname: list[i].name,
                              songid: list[i].mp3Url,
                              artist: list[i].artists[0].name,
                              id: list[i].id,
                              img_url: list[i].album.blurPicUrl,
                              source: 'netease',
                              source_url: `http://music.163.com/song/media/outer/url?id=${list[i].id}.mp3`,
                              title: list[i].name
                            }
                            that.searchList.push(r)
                          }
                        })
                          .then(() => {
                            that.s.refresh()
                          }).then(() => {
                          Indicator.close()
                        })
                      }
                    }
                  }
                })
              })
            })
        }
        else if (this.$store.state.way == 'xiami') {
          getXiami_search(i, key)
            .then((data) => {
              let slist = JSON.parse(data.slice('jsonp154('.length, -')'.length))
              num = slist.data.total
              for (let i = 0; i < slist.data.songs.length; i++) {
                let list = slist.data.songs
                this.showresult = true
                let r = {
                  singername: list[i].artist_name,
                  songname: list[i].song_name,
                  songid: list[i].listen_file,
                  artist: list[i].artist_name,
                  id: list[i].lyric,
                  img_url: list[i].artist_logo,
                  source: 'xiami',
                  source_url: list[i].listen_file,
                  title: list[i].song_name
                }
                that.searchList.push(r)
              }
            })
            .then(() => {
              this.$nextTick(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: false,
                  render: function (data) {
                    if (data.curTop == data.maxTop && data.maxTop > window.screen.height) {
                      i++;
                      if (num / 50 > i) {
                        Indicator.open({
                          text: '拼命加载中...',
                          spinnerType: 'fading-circle'
                        });
                        getXiami_search(i, key).then((data) => {
                          let slist = JSON.parse(data.slice('jsonp154('.length, -')'.length))
                          for (let i = 0; i < slist.data.songs.length; i++) {
                            let list = slist.data.songs
                            this.showresult = true
                            let r = {
                              singername: list[i].artist_name,
                              songname: list[i].song_name,
                              songid: list[i].listen_file,
                              artist: list[i].artist_name,
                              id: list[i].lyric,
                              img_url: list[i].artist_logo,
                              source: 'xiami',
                              source_url: list[i].listen_file,
                              title: list[i].song_name
                            }
                            that.searchList.push(r)
                          }
                        })
                          .then(() => {
                            that.s.refresh()
                          })
                          .then(() => {
                            Indicator.close()
                          })
                      } else {
                        return
                      }
                    }
                  }
                })
              })
            })
        }
        else {
          getKg_search(i, key).then((data) => {
            let slist = JSON.parse(data.slice('kgJSONP682253984('.length, -')'.length))
            num = slist.data.total
            new Promise((resolve, reject) => {
              for (let i = 0; i < slist.data.info.length; i++) {
                let list = slist.data.info
                this.showresult = true
                let r = {
                  singername: list[i].singername,
                  songname: list[i].songname,
                  songid: list[i].hash,
                  artist: list[i].singername,
                  id: list[i].hash,
                  img_url: '',
                  source: 'kg',
                  source_url: '',
                  title: list[i].songname
                }
                getkg_music(list[i].hash)
                  .then((data) => {
                    r.source_url = data.data.play_url;
                    r.img_url = data.data.img;
                  })
                  .then(() => {
                    that.searchList.push(r);
                  })
                that.searchList.push(r);
              }
              resolve(that.searchList)
            }).then((data) => {
              that.$nextTick(() => {
                that.s = skrollr.init({
                  smoothScrolling: true,
                  smoothScrollingDuration: 200,
                  forceHeight: true,
                  render: function (data) {
                    if (data.curTop == data.maxTop && data.maxTop > window.screen.height) {
                      i++;
                      if (num / 30 > i) {
                        Indicator.open({
                          text: '拼命加载中...',
                          spinnerType: 'fading-circle'
                        });
                        getKg_search(i, key).then((data) => {
                          let slist = JSON.parse(data.slice('kgJSONP682253984('.length, -')'.length))
                          for (let i = 0; i < slist.data.info.length; i++) {
                            let list = slist.data.info
                            this.showresult = true
                            let r = {
                              singername: list[i].singername,
                              songname: list[i].songname,
                              songid: list[i].hash,
                              artist: list[i].singername,
                              id: list[i].hash,
                              img_url: '',
                              source: 'kg',
                              source_url: '',
                              title: list[i].songname
                            }
                            getkg_music(list[i].hash).then((data) => {
                              r.source_url = data.data.play_url;
                              r.img_url = data.data.img;
                            }).then(() => {
                              that.searchList.push(r);
                            })
                          }
                        })
                          .then(() => {
                            that.s.refresh()
                          })
                          .then(() => {
                            Indicator.close()
                          })
                      }
                      else {
                        return
                      }
                    }
                  }
                })
              })
            })
          })
        }
      },
      addkw() {
        if (localStorage['cfzkeyword']) {
          this.k = JSON.parse(localStorage['cfzkeyword'])
        }
      }
    },
    mounted() {
      this.pageload(this.$store.state.way)
      this.addkw()
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/css/px2rem";

  $designWidth: 750;
  .singer {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: px2rem(400)
  }

  .song {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: px2rem(400)
  }

  .result {
    ul {
      margin-bottom: px2rem(115);
    }
    li {
      display: flex;
      font-size: px2rem(30);
      border-bottom: 1px solid #999;
      height: px2rem(100);
      line-height: normal;
      .singerpic {
        height: px2rem(70);
        width: px2rem(70);
        border-radius: 50%;
        align-self: center;
      }
      .iconfont {
        font-size: px2rem(30);
        align-self: center;
      }
      > div:first-child {
        margin-right: px2rem(20);
        justify-content: space-around;
        display: flex;
        width: px2rem(80);
      }
      > div:last-child {
        line-height: px2rem(40);
        display: flex;
        /*flex-direction: column;*/
        > div {
          align-self: center;
        }
        .song {
          font-size: px2rem(20);
          color: #ddd;
          > span:first-child {
            margin-right: px2rem(20);
          }
        }
      }
    }
  }

  #search {
    background: #fff;
    margin-top: px2rem(120);
    font-size: px2rem(30);
    padding: px2rem(20);
    #hot {
      padding: px2rem(40) 0;
      padding-top: px2rem(20);
    }
    .hotName {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: px2rem(30);
      li {
        line-height: px2rem(50);
        padding: 0 px2rem(20);
        white-space: nowrap;
        border: 1px solid #ddd;
        margin-bottom: px2rem(20);
        margin-right: px2rem(20);
        border-radius: px2rem(30);
        span {
          color: #000;
        }
      }
    }
  }

  #history {
    ul {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      li {
        padding: px2rem(20);
      }
      span {
        margin-left: px2rem(10);
      }
      .iconfont {
        font-size: px2rem(30);
      }
    }
  }


</style>
