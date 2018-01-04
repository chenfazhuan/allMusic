<template>
  <div>
    <div class="sl_header" :style="'background-color:rgb('+h_bg+')'">
      <div>
        <router-link :to="{path:'index'}" style="color: #fff">
          <i class="iconfont icon-back"></i>
        </router-link>
      </div>
      <div>
        {{platform}}热门歌手
      </div>
      <div style="opacity: 0">
        <i class="iconfont icon-shuaxin"></i>
      </div>
    </div>
    <scroll class="sl_body"
            :data="singerlist"
            ref="sl_body"
            @scroll="scroll"
            :listenScroll="listenScroll"
            :probeType="probeType">
      <ul>
        <li v-for="(item,index) in singerlist" ref="listGroup">
          <div>
            {{item.title}}
          </div>
          <div v-for="t in item.item" @click="gosinger(t.mid)">
            <div>
              <img v-lazy=t.pic alt="">
            </div>
            <div>
              {{t.name}}
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="bar" @touchstart="ts" @touchmove.stop="tm" @touchend.stop="te">
      <ul>
        <li v-for="(t,index) in singerlist"
            :data-index="index"
            :style="currentIndex==index?'color:rgb('+h_bg+')':''">
          {{t.title}}
        </li>
      </ul>
    </div>
    <div class="title" v-show="titlew" ref="fixed">
      <div>{{titlew}}</div>
    </div>
  </div>
</template>
<script>
  import {getQQ_singerlist} from 'api/transformation'
  import {mapGetters} from 'vuex'
  import Scroll from './scroll'
  import {Indicator} from 'mint-ui'

  export default {
    components: {
      Scroll
    },
    data() {
      return {
        singerlist: [],
        platform: '',
        listenScroll: true,
        scrollY: -1,
        currentIndex: 0,
        probeType: 3,
        diff:0
      }
    },
    computed: {
      ...mapGetters({
        way: 'way',
        h_bg: 'h_bg'
      }),
      titlew(){
        if (this.scrollY > 0) {
          return ''
        }
        return this.singerlist[this.currentIndex] ? this.singerlist[this.currentIndex].title : ''
      }
    },
    watch: {
      singerlist() {
        setTimeout(() => {
          this.calcHeight()
        }, 20)
      },
      scrollY(newy) {
        if(newy>0){
          this.currentIndex=0
          return
        }
        const listHeight = this.listHeight
        for (let i = 0; i < listHeight.length-1; i++) {
          let h1 = listHeight[i]
          let h2 = listHeight[i + 1]
          if (-newy >= h1 && -newy < h2) {
            this.currentIndex = i
            this.diff=h2+newy
            return
          }
        }

        this.currentIndex = listHeight.length-2
      },
      diff(newd){
        let fixedTop = (newd > 0 && newd < 66) ? newd - 66 : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
//        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    methods: {
      gosinger(id){
        this.$router.push({path:'/singer',query:{id:id}})
      },
      ts(e) {
        let index = e.target.getAttribute('data-index')
        let fs = e.touches[0]
        this.touch.y1 = fs.pageY
        this.touch.index = index
        this.scrollY=-this.listHeight[index]
        this.$refs.sl_body.scrollToElement(this.$refs.listGroup[index], 0)
      },
      tm(e) {
        let fs = e.touches[0]
        this.touch.y2 = fs.pageY
        let d = (this.touch.y2 - this.touch.y1) / 40 | 0 + this.touch.index
        this.scrollY=-this.listHeight[d]
        this.$refs.sl_body.scrollToElement(this.$refs.listGroup[d], 0)
      },
      te(e) {

      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      calcHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      callback(d) {
        let singer = {}
        for (let i = 0; i < d.length; i++) {
          const key = d[i].Findex == 9 ? '~' : d[i].Findex
          if (!singer[key]) {
            singer[key] = {
              title: key,
              item: []
            }
          }
          singer[key].item.push({
            id: d[i].Fsinger_id,
            name: d[i].Fsinger_name,
            mid: d[i].Fsinger_mid,
            pic: `https://y.gtimg.cn/music/photo_new/T001R500x500M000${d[i].Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        let ret = []
        for (let key in singer) {
          let val = singer[key]
          ret.push(val)
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return ret
      },
      pageload() {
          this.platform = 'QQ'
        Indicator.open({
          text: '拼命加载中...',
          spinnerType: 'fading-circle'
        });
        let p1 = new Promise((resolve) => {
          resolve(getQQ_singerlist(1))
        })
        let p2 = new Promise((resolve) => {
          resolve(getQQ_singerlist(2))
        })
        Promise.all([p1, p2]).then((data) => {
          let list1 = data[0].slice('GetSingerListCallback(('.length, -')'.length)
          let list2 = data[1].slice('GetSingerListCallback(('.length, -')'.length)
          let l1 = JSON.parse(list1).data.list
          let l2 = JSON.parse(list2).data.list
          let a = l2.concat(l1)
          this.singerlist = this.callback(a)
        })
          .then(()=>{
          Indicator.close()
        })
      }
    },
    created() {
      this.pageload()
      this.touch = {}
      this.listHeight = []
    }
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;
  .sl_header {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 px2rem(20);
    font-size: px2rem(40);
    z-index: 10;
    color: #fff;
    > div {
      height: px2rem(110);
      line-height: px2rem(110);
    }
    .iconfont {
      font-size: px2rem(40);
      font-weight: 600;
    }
  }

  .sl_body {
    margin-top: px2rem(120);
    margin-bottom: px2rem(110);
    height: calc(100% - 240px);
    position: fixed;
    width: 100%;
    overflow: hidden;
    ul {
      li {
        > div:first-child {
          padding: px2rem(5) px2rem(20);
          font-size: px2rem(40);
          background-color: #eee;
        }
        > div:not(:first-child) {
          display: flex;
          width: 100%;
          padding: px2rem(15) px2rem(20);
          > div:first-child {
            height: px2rem(100);
            img {
              height: 100%;
              width: px2rem(100);
              border-radius: 50%;
            }
          }
          > div:nth-child(2) {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            height: px2rem(100);
            line-height: px2rem(100);
            flex-basis: 100%;
            margin-left: px2rem(20);
            font-size: px2rem(35);
            border-bottom: 1px solid #999;
          }
        }
      }
    }
  }

  .bar {
    position: fixed;
    right: px2rem(30);
    font-size: 30px;
    top: 15%;
    z-index: 10;

    ul {
      border: 1px solid #ddd;
      border-radius: px2rem(20);
      padding: px2rem(10) 0;
      background-color: #fff;
    }
    li {
      padding: 5px;
      text-align: center;
      height: 40px;
    }
    .choose {
      color: rgba(212, 62, 54, .8);
    }
  }
  .title{
    position: fixed;
    width: 100%;
    padding: px2rem(5) px2rem(20);
    font-size: px2rem(40);
    background-color: #eee;
    top:px2rem(110);
  }
</style>
