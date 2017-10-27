import axios from 'axios'


//轮播图
let qq_Carousel='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
let xiami_Carousel='http://www.xiami.com';
let kg_Carousel='http://m.kugou.com/';

//最新音乐
let Xiami_Newmusic='http://www.xiami.com/chart/data';
let Kg_Newmusic='http://m.kugou.com/rank/info/6666';
let Ne_Newmusic='http://music.163.com/discover/toplist';
let QQ_Newmusic='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';

//推荐歌单
let qq_Songsheet='https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
let xiami_Songsheet='http://www.xiami.com/collect/recommend/page/1';
let ne_Songsheet='http://music.163.com/discover?order=hot';
let kg_Songsheet='http://m.kugou.com/plist/index';

//获取轮播图
export function getQQ_Carousel(post,time){
  let url='/getQQ_Carousel';
  let data="time="+time+"&url="+qq_Carousel;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getXiami_Carousel(){
  let url='/getXiami_Carousel';
  let data="url="+xiami_Carousel;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getKg_Carousel(){
  let url='/getKg_Carousel';
  let data="url="+kg_Carousel;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getQQ_Songsheet(post){
  let url='/getQQ_Songsheet';
  let data="url="+qq_Songsheet;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getNe_Songsheet(post){
  let url='/getNe_Songsheet';
  let data="url="+ne_Songsheet;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getKg_Songsheet(post,page){
  let url='/getKg_Songsheet';
  let data="url="+kg_Songsheet+"?page="+page;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getXiami_Songsheet(post){
  let url='/getXiami_Songsheet';
  let data="url="+xiami_Songsheet;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getXiami_Newmusic(post,time){
  let url='/getXiami_Newmusic';
  let data="url="+Xiami_Newmusic+"&time="+time;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getKg_Newmusic(post,page){
  let url='/getKg_Newmusic';
  let data="url="+Kg_Newmusic+"&page="+page;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getNe_Newmusic(post){
  let url='/getNe_Newmusic';
  let data="url="+Ne_Newmusic;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}

export function getQQ_Newmusic(post,time){
  let url='/getQQ_Newmusic';
  let data="url="+QQ_Newmusic+'&time='+time;
  return axios.post(url,data)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
}
