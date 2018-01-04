<template>
  <div>
    <div class="header" :data-0=h_bg1 :data-400=h_bg2>
      <div @click="goback">
        <i class="iconfont icon-back"></i>
      </div>
      <div data-400="opacity:0" data-600="opacity:1">
        {{way}}音乐排行
      </div>
      <div style="opacity:0;">
        <i class="iconfont icon-shuaxin"></i>
      </div>
    </div>
    <div id="skrollr-body">
    <div class="myhead">
      <img :src="bg_img" alt="" class="bg">

      <div class="headname">
        <img :src="logo" alt="" class="rank_logo">
        <span>{{way}}排行榜</span>
      </div>
      <div class="playall" :style="h_bg2" @click="playall">
        播放全部
      </div>
    </div>
    <div class="section" >
      <ul>
        <li v-for="item,index in songlist" @click="playmusic(index)">
          <div class="num">
            {{index+1}}
          </div>
          <div class="song">
            <div>{{item.song}}</div>
            <div>{{item.singer}}</div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
  import skrollr from 'skrollr'
  import {Indicator} from 'mint-ui'
  import $ from 'jquery'
  import {getQQ_Rank} from 'api/transformation'
  import {getKg_Newmusic} from 'api/transformation'
  import {getNe_Newmusic} from 'api/transformation'
  import {getXiami_Newmusic} from 'api/transformation'
  import {xiami_change} from 'api/jiexi'
  import {mapActions} from 'vuex'
  import {getkg_music} from 'api/transformation'
  import {getQQ_song} from 'api/transformation'

  export default {
    data() {
      return {
        way: '',
        songlist:[],
        s:{},
        bg_img:'',
        h_bg1:'',
        h_bg2:'',
        logo:''
      }
    },
    watch:{
      '$route':'pageload'
    },
    methods: {
      playall(){
        this.playmusic(0)
      },
      playmusic(i){
        this.selectPlay({
          list:this.songlist,index:i
        })
      },
      ...mapActions({
        selectPlay:'selectPlay'
      }),
      pageload(){
        if(this.$route.path=='/rank'){
          this.songlist=[]
          this.h_bg1=`background-color:rgba(${this.$store.state.h_bg}, 0)`
          this.h_bg2=`background-color:rgba(${this.$store.state.h_bg}, 1)`
        let that=this
        let platform=this.$store.state.way
        if(platform=='qq'){
          getQQ_Rank()
            .then((data)=>{
              this.bg_img='https://y.gtimg.cn/music/photo_new/T002R300x300M000'+data.songlist[0].data.albummid+'.jpg'
              this.logo=require('../assets/qq_logo.svg')
              this.way='QQ'
              for(let i=0;i<data.songlist.length;i++){
                let rank={
                  song:'',
                  singer:'',
                  source_url:"",
                  title:'',
                  artist:'',
                  img_url:'',
                  id:'',
                  source:'qq'
                }
                rank.song=data.songlist[i].data.albumname
                rank.singer=data.songlist[i].data.singer[0].name
                rank.artist=data.songlist[i].data.singer[0].name
                rank.title=data.songlist[i].data.albumname
                rank.img_url=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.songlist[i].data.albummid}.jpg?max_age=2592000`
//                rank.source_url=`http://ws.stream.qqmusic.qq.com/${data.songlist[i].data.songid}.m4a?fromtag=46`;
                let id=data.songlist[i].data.songmid;
                getQQ_song(id)
                  .then((data)=>{
                    let key=JSON.parse(data.slice('MusicJsonCallback('.length,-')'.length))
                    key=key.data.items[0].vkey
                    rank.source_url=`http://dl.stream.qqmusic.qq.com/C400${id}.m4a?vkey=${key}&guid=8284612410&uin=0&fromtag=66`
                  })
                rank.id=`${data.songlist[i].data.songmid}`;
                this.songlist.push(rank)
              }
          })
            .then(()=>{that.s = skrollr.init(
              {smoothScrolling: true,
                smoothScrollingDuration: 200,
                forceHeight: false}
              )}
            )
        }
        else if(platform=='kg'){
          getKg_Newmusic('',1).then((data)=>{
            this.logo=require('../assets/logo_kugou.png')
            this.way='酷狗'
            let that=this
            this.bg_img=data.info.imgurl.replace(/{size}/ig, "400");
            for (let i = 0; i < data.songs.list.length; i++) {
              let rank={
                song:'',
                singer:'',
                source_url:"",
                title:'',
                artist:'',
                img_url:'',
                id:''
              }
              let info = data.songs.list[i].filename;
              rank.song = data.songs.list[i].remark;
              rank.title = data.songs.list[i].remark;
              rank.singer = info;
              rank.artist = info;
              rank.id=data.songs.list[i].hash;
              rank.source='kg';
              getkg_music(data.songs.list[i].hash).then((data)=>{
                rank.source_url = data.data.play_url;
                rank.img_url = data.data.img;
              }).then(()=>{
                that.songlist.push(rank);
              })
            }
          })
            .then( ()=>{
            let n=1
            that.s = skrollr.init({smoothScrolling: true,
              smoothScrollingDuration: 200,
              forceHeight: false,
              render: function (data) {
                if (data.curTop == data.maxTop){
                  n++;
                  if(n<=2){
                  getKg_Newmusic('',2).then((data)=>{
                    for (let i = 0; i < data.songs.list.length; i++) {
                      let rank={
                        song:'',
                        singer:'',
                        source_url:"",
                        title:'',
                        artist:'',
                        img_url:''
                      }
                      let info = data.songs.list[i].filename;
                      rank.song = data.songs.list[i].remark;
                      rank.title = data.songs.list[i].remark;
                      rank.singer = info;
                      rank.artist = info;
                      getkg_music(data.songs.list[i].hash).then((data)=>{
                        rank.source_url = data.data.play_url;
                        rank.img_url = data.data.img;
                      }).then(()=>{
                        that.songlist.push(rank);
                      })
                    }
                  }).then(() => {
                    that.s.refresh()
                  })}
                }
              }}
          )})
        }
        else if(platform=='ne'){
         getNe_Newmusic()
           .then((data)=>{
             this.logo=require('../assets/wy_logo.jpg')
             this.way='网易'
             let req = $.parseHTML(data);
             let txt=JSON.parse($(req).find('textarea')[0].innerText);
             this.bg_img=txt[0].album.picUrl;
             for(let i=0;i<txt.length;i++){
               let rank={
                 song:'',
                 singer:'',
                 source_url:"",
                 title:'',
                 artist:'',
                 img_url:'',
                 source:'',
                 id:''
               }
               rank.song = txt[i].name;
               rank.id= txt[i].privilege.id;
               rank.source = 'netease';
               rank.title = txt[i].name;
               rank.artist = txt[i].artists[0].name;
               rank.singer = txt[i].artists[0].name;
               rank.source_url = `http://music.163.com/song/media/outer/url?id=${txt[i].privilege.id}.mp3`;
               rank.img_url = txt[i].album.picUrl;
               that.songlist.push(rank)
             }
         })
           .then( ()=>{that.s = skrollr.init(
             {smoothScrolling: true,
               smoothScrollingDuration: 200,
               forceHeight: false}
           )})
        }
        else {
          getXiami_Newmusic().then((data)=>{
            this.logo='https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1137283699,4138679640&fm=58&bpow=270&bpoh=270&u_exp_0=950304595,3821912507&fm_exp_0=86'
            this.way='虾米'
            let req = $.parseHTML(data);
            let result=$(req).find('.song');
            this.bg_img=$(result).find('img')[0].src;
            $(req).find('.song').each(function () {
              let mp3=$(this).closest('.songwrapper')[0].dataset.mp3
              let rank={
                song:'',
                singer:'',
                source_url:"",
                title:'',
                artist:'',
                img_url:'',
                id:''
              }
              rank.source_url=xiami_change(mp3)
              rank.singer = $(this).find('.artist').html();
              rank.artist = $(this).find('.artist').html();
              rank.song = $(this).find('strong a').html();
              rank.title = $(this).find('strong a').html();
              rank.img_url = $(this).find('img')[0].src;
              rank.id=$(this).find('img')[0].src;
              that.songlist.push(rank)
            })

          })
            .then(()=>{that.s = skrollr.init(
              {smoothScrolling: true,
                smoothScrollingDuration: 200,
                forceHeight: false}
              )}
            )
        }
        }
      },
      goback() {
        this.s.destroy();
        this.$router.go(-1)
      },
      reload() {
        this.$router.go(0)
      }
    },
    mounted(){
      this.pageload()
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;
  .bg {
    height: 100%;
    width: 100%;
    filter: blur(20px);
  }

  .playall {
    position: absolute;
    bottom: px2rem(20);
    right: px2rem(50);
    width: px2rem(340);
    height: px2rem(80);
    background: #31c27c;
    border-radius: px2rem(40);
    padding: px2rem(20);
    text-align: center;
    line-height: normal;
    font-size: px2rem(30);
  }

  .myhead {
    height: px2rem(400);
    position: relative;
    color: #fff;
    .headname {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: px2rem(20);
      color: #fff;
      display: flex;
      span {
        align-self: center;
      }
      .rank_logo {
        width: px2rem(150);
        height: px2rem(150);
        margin-right: px2rem(10);
      }
    }
  }

  .myhead:before {
    display: table;
    content: ' ';
  }

  .header {
    z-index: 10;
    height: px2rem(100);
    width: px2rem(750);
    /*background: rgba(212, 62, 54, 0.1);*/
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

  .section {
    margin-top: px2rem(10);
    background: #fff;
    font-size: px2rem(50);
    font-weight: 500;
    ul {
      padding:px2rem(20) px2rem(10) px2rem(130);
      li {
        display: flex;
        padding: px2rem(20);
        border-bottom: 1px solid #ddd;
        .num {
          width: px2rem(50);
          font-size: px2rem(25);
        }
        .song {
          font-size: px2rem(25);
          div:last-child{
            color: #999;
          }
        }
      }
    }
  }

  .iconfont {
    font-size: px2rem(30);
    font-weight: 600;
  }
</style>
