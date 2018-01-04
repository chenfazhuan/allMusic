import axios from 'axios'
import 'js-base64'
let ne_lyric='http://music.163.com/api/song/lyric'
let qq_lyric='https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

export function getlyric(p,id) {
  if(p=="netease"){
    let url='/ne_getlyric'
    let data=`url=${ne_lyric}&id=${id}&lv=1&kv=1&tv=-1`
   return axios.post(url,data).then((res)=>{
      return Promise.resolve(res.data.lrc.lyric)
    })
  }
  if(p=='qq'){
    let url='/qq_getlyric'
    let data=`url=${qq_lyric}&id=${id}`
    return axios.post(url,data).then((res)=>{
      let data=res.data.slice('MusicJsonCallback('.length,-')'.length)
      let result=Base64.decode(JSON.parse(data).lyric)
      return Promise.resolve(result)
    })
  }
  // if(p=='xiami'){
  //   let url='/xiami_getlyric'
  //   let data=`url=${id}`
  //   return axios.post(url,data).then((res)=>{
  //     return Promise.resolve(res.data)
  //   })
  // }
}
