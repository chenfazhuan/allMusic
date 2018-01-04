import axios from 'axios'

//轮播图
let qq_Carousel = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
let xiami_Carousel = 'http://www.xiami.com';
let kg_Carousel = 'http://m.kugou.com/';
let ne_Carousel = 'http://music.163.com/discover'
//最新音乐
let Xiami_Newmusic = 'http://www.xiami.com/chart/data';
let Kg_Newmusic = 'http://m.kugou.com/rank/info/6666';
let Ne_Newmusic = 'http://music.163.com/discover/toplist';
let QQ_Newmusic = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
//推荐歌单
let qq_Songsheet = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
let xiami_Songsheet = 'http://www.xiami.com/collect/recommend/page/';
let ne_Songsheet = 'http://music.163.com/discover/playlist/?order=hot';
let kg_Songsheet = 'http://m.kugou.com/plist/index';

//热门搜索
let kg_hotsearch = 'http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=10&callback=kgJSONP432240264';
let qq_hotsearch = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

//排行榜
let qq_rank = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';

//歌单详情
// let ne_sheetDetail = 'http://music.163.com/api/playlist/detail';
let ne_sheetDetail = 'http://music.163.com/weapi/v3/playlist/detail';
let qq_sheetDetail = 'http://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
let xiami_sheetDetail = 'http://api.xiami.com/web';
let kg_sheetDetail = 'http://m.kugou.com/plist/list/';

//获取酷狗播放
let kg_music = 'http://www.kugou.com/yy/index.php?r=play/getdata'
//获取搜索
let qq_search = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
let ne_search = 'http://music.163.com/api/search/pc'
let xiami_search = 'http://api.xiami.com/web'
let kg_search = 'http://mobilecdn.kugou.com/api/v3/search/song'
//获取歌手列表
let qq_singerlist = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
//获取歌手详情
let qq_singer = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
// 获取qq地址
let qq_vkey = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
//获取轮播图
let time = new Date();

export function getQQ_Carousel(post, time) {
  let url = 'http://www.chenfazhuan.xin/getQQ_Carousel';
  let data = "time=" + time + "&url=" + qq_Carousel;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getXiami_Carousel() {
  let url = 'http://www.chenfazhuan.xin/getXiami_Carousel';
  let data = "url=" + xiami_Carousel;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getKg_Carousel() {
  let url = 'http://www.chenfazhuan.xin/getKg_Carousel';
  let data = "url=" + kg_Carousel;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getNe_Carousel() {
  let url = 'http://www.chenfazhuan.xin/getNe_Carousel';
  let data = "url=" + ne_Carousel;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

//获取推荐歌单
export function getQQ_Songsheet(post, ein) {
  let url = 'http://www.chenfazhuan.xin/getQQ_Songsheet';
  let data = "url=" + qq_Songsheet + "&sin=" + post + '&ein=' + ein;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getNe_Songsheet(post) {
  let url = 'http://www.chenfazhuan.xin/getNe_Songsheet';
  let data = "url=" + ne_Songsheet + '&limit=35&offset=' + post;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getKg_Songsheet(post, page) {
  let url = 'http://www.chenfazhuan.xin/getKg_Songsheet';
  let data = "url=" + kg_Songsheet + "?page=" + page;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getXiami_Songsheet(post) {
  let url = 'http://www.chenfazhuan.xin/getXiami_Songsheet';
  let data = "url=" + xiami_Songsheet + post;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

//获取最新音乐
export function getXiami_Newmusic(post, time) {
  let url = 'http://www.chenfazhuan.xin/getXiami_Newmusic';
  let data = "url=" + Xiami_Newmusic + "&time=" + time;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getKg_Newmusic(post, page) {
  let url = 'http://www.chenfazhuan.xin/getKg_Newmusic';
  let data = "url=" + Kg_Newmusic + "&page=" + page;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getNe_Newmusic(post) {
  let url = 'http://www.chenfazhuan.xin/getNe_Newmusic';
  let data = "url=" + Ne_Newmusic;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

export function getQQ_Newmusic(post, time) {
  let url = 'http://www.chenfazhuan.xin/getQQ_Newmusic';
  let data = "url=" + QQ_Newmusic + '&time=' + time;
  return axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

//获取热门搜索
export function getKg_Hotsearch() {
  let url = 'http://www.chenfazhuan.xin/getKg_Hotsearch';
  let data = 'url=' + kg_hotsearch;
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getQQ_Hotsearch() {
  let url = 'http://www.chenfazhuan.xin/getQQ_Hotsearch';

  let data = 'url=' + qq_hotsearch + '&time=' + time;
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取排行榜
export function getQQ_Rank() {
  let url = 'http://www.chenfazhuan.xin/getQQ_Rank';
  let data = 'url=' + qq_rank + '&time=' + time;
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取歌单详情
export function getNe_SheetDetail(id) {
// let  p=`{"id":${id},"lv":-1,"tv":-1,"csrf_token":"fd1acbd02cc87df18472e5ecf775d12b"}`
  let p = `{id:${id}}`
  let p2 = '010001'
  let p3 = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'

  let p4 = '0CoJUm6Qyw8W8jud'
  let d1 = d(p, p2, p3, p4)
  let url = 'http://www.chenfazhuan.xin/getNe_SheetDetail';
  let data = `{"url":"${ne_sheetDetail}","params":"${d1.encText}","encSecKey":"${d1.encSecKey}"}`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getQQ_SheetDetail(id) {
  let url = 'http://www.chenfazhuan.xin/getQQ_SheetDetail';
  let data = 'url=' + qq_sheetDetail + '&id=' + id;
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getXiami_SheetDetail(id) {
  let url = 'http://www.chenfazhuan.xin/getXiami_SheetDetail';
  let data = 'url=' + xiami_sheetDetail + '&id=' + id;
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getKg_SheetDetail(id) {
  let url = 'http://www.chenfazhuan.xin/getKg_SheetDetail';
  let data = 'url=' + kg_sheetDetail + id;
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取酷狗播放
export function getkg_music(id) {
  let data = 'url=' + kg_music + '&hash=' + id
  return axios.post('http://www.chenfazhuan.xin/getkg_music', data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取搜索
export function getQQ_search(page, word) {
  let url = 'http://www.chenfazhuan.xin/getQQ_search'
  let data = 'url=' + qq_search + '&page=' + page + '&word=' + word + '&time=' + time
  return axios.post(url, data).then((data) => {
    return Promise.resolve(data.data)
  })
}

export function getNe_search(page, word) {
  let url = 'http://www.chenfazhuan.xin/getNe_search'
  let data = 'url=' + ne_search + '&page=' + page + '&word=' + word
  return axios.post(url, data).then((data) => {
    return Promise.resolve(data.data)
  })
}

export function getXiami_search(page, word) {
  let url = 'http://www.chenfazhuan.xin/getXiami_search'
  let data = 'url=' + xiami_search + '&page=' + page + '&word=' + word
  return axios.post(url, data).then((data) => {
    return Promise.resolve(data.data)
  })
}

export function getKg_search(page, word) {
  let url = 'http://www.chenfazhuan.xin/getKg_search'
  let data = 'url=' + kg_search + '&page=' + page + '&word=' + word
  return axios.post(url, data).then((data) => {
    return Promise.resolve(data.data)
  })
}

//获取歌手列表
export function getQQ_singerlist(num) {
  let data = 'url=' + qq_singerlist + '&num=' + num
  return axios.post('http://www.chenfazhuan.xin/getQQ_singerlist', data)
    .then((data) => {
      return Promise.resolve(data.data)
    })
}

//获取歌手详情
export function getQQ_singer(num, id) {
  let data = 'url=' + qq_singer + '&num=' + num + '&id=' + id
  return axios.post('http://www.chenfazhuan.xin/getQQ_singer', data)
    .then((data) => {
      return Promise.resolve(data.data)
    })
}

// 获取qq播放地址
export function getQQ_song(id) {
  let data = 'url=' + qq_vkey + '&id=' + id
  return axios.post('http://www.chenfazhuan.xin/getQQ_song', data)
    .then((data) => {
      return Promise.resolve(data.data)
    })
}
