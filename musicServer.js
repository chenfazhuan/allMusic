var express = require('express')
var axios = require('axios')
var qs = require('querystring')
var port = 80
var app = express()
var apiRouters = express.Router()

//在node服务器上进行请求
app.post('/getQQ_Carousel', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url, {
      headers: {
        referer: 'https://m.y.qq.com',
      },
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: obj.time
      }
    }).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})
app.post('/getXiami_Carousel', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

app.post('/getKg_Carousel', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})
app.post('/getNe_Carousel', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

app.post('/getQQ_Songsheet', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url, {
      headers: {
        referer: 'https://m.y.qq.com',
      },
      params: {
        rnd: 0.4781484879517406,
        g_tk: 732560869,
        jsonpCallback: 'MusicJsonCallback',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: obj.sin,
        ein: obj.ein
      }
    }).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

app.post('/getNe_Songsheet', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url, {
      params: {
        limit: obj.limit,
        offset: obj.offset
      }
    }).then((resopnse) => {
      res.json(resopnse.data)
    })

  })
})

app.post('/getXiami_Songsheet', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url).then((resopnse) => {
      res.json(resopnse.data)
    })

  })
})

app.post('/getKg_Songsheet', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url + "?page=" + obj.page + "&json=true";
    axios.get(url).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

app.post('/getXiami_Newmusic', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url, {
      headers: {
        referer: 'http://m.xiami.com/',
      },
      params: {
        c: 103,
        type: 0,
        page: 1,
        limit: 100,
        _: obj.time
      }
    }).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

app.post('/getKg_Newmusic', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url + "?page=" + obj.page + "&json=true";
    axios.get(url).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

app.post('/getNe_Newmusic', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})
app.post('/getQQ_Newmusic', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url, {
      headers: {
        referer: 'http://y.qq.com/'
      },
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: 27,
        _: obj.time
      }
    }).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

app.post('/getKg_Hotsearch', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url;
    axios.get(url, {
      headers: {
        rferer: 'http://m.kugou.com/search/index'
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getQQ_Hotsearch', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString())
    let url = obj.url;
    axios.get(url, {
      headers: {
        referer: "https://m.y.qq.com"
      },
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: obj.time
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getQQ_Rank', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: "https://m.y.qq.com"
      },
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: 4,
        _: obj.time
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getNe_SheetDetail', (req, res) => {
  req.on('data', (buf) => {
    let obj = JSON.parse(buf.toString())
    // console.log(obj)
    const $axios = axios.create({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://music.163.com',
      }
    });
    $axios.post(obj.url, qs.stringify({params: obj.params, encSecKey: obj.encSecKey})).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getQQ_SheetDetail', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: 'http://y.qq.com/'
      },
      params: {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        nosign: 1,
        disstid: obj.id,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'GB2312',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        jsonpCallback: 'jsonCallback',
        needNewCode: 0
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getXiami_SheetDetail', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: 'http://m.xiami.com/',
        host: 'api.xiami.com'
      },
      params: {
        v: 2.0,
        app_key: 1,
        id: obj.id,
        callback: 'jsonp122',
        r: 'collect/detail'
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getKg_SheetDetail', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        Host: 'm.kugou.com',
        Referer: 'http://m.kugou.com/plist/index'
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getkg_music', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let url = obj.url + '&hash=' + obj.hash;
    axios.get(url).then((response) => {
      res.json(response.data)
    })
  })
})

app.post('/getQQ_search', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: 'http://y.qq.com/'
      },
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: obj.word,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: obj.page,
        remoteplace: 'txt.mqq.all',
        _: obj.time
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/getNe_search', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let page = parseInt(obj.page)
    let word = encodeURI(obj.word)
    let url = `${obj.url}?limit=${page + 20}&offset=${page}&s=${word}&type=1`;
    axios.post(url).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/getXiami_search', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let page = parseInt(obj.page)
    let word = encodeURI(obj.word)
    let url = `${obj.url}?v=2.0&app_key=1&key=${word}&page=${page}&limit=50&callback=jsonp154&r=search/songs`;
    axios.get(url, {
      headers: {
        Referer: 'http://m.xiami.com/'
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/getKg_search', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    let page = parseInt(obj.page)
    let word = encodeURI(obj.word)
    let url = `${obj.url}?format=jsonp&keyword=${word}&page=${page}&pagesize=30&showtype=1&callback=kgJSONP682253984`;
    axios.get(url, {
      headers: {
        Referer: 'http://m.kugou.com/search/index/'
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/ne_getlyric', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      params: {
        id: obj.id,
        lv: 1,
        kv: 1,
        tv: -1
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/qq_getlyric', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: {
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        songmid: obj.id,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        categoryId: 10000000,
        pcachetime: +new Date(),
        format: 'json'
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/xiami_getlyric', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/getQQ_singerlist', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: 'http://y.qq.com/'
      },
      params: {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: obj.num,
        g_tk: 5381,
        jsonpCallback: 'GetSingerListCallback',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/getQQ_singer', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: 'http://y.qq.com/'
      },
      params: {
        g_tk: 5381,
        jsonpCallback: 'MusicJsonCallbacksinger_track',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: obj.id,
        order: 'listen',
        begin: obj.num,
        num: 30,
        songstatus: 1
      }
    }).then((response) => {
      res.json(response.data)
    })
  })
})
app.post('/getQQ_song', (req, res) => {
  req.on('data', (buf) => {
    let obj = qs.parse(buf.toString());
    axios.get(obj.url, {
      headers: {
        referer: 'http://y.qq.com/'
      },
      params: {
        g_tk: 5381,
        jsonpCallback: 'MusicJsonCallback',
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        callback: 'MusicJsonCallback',
        uin: 0,
        songmid: obj.id,
        filename: `C400${obj.id}.m4a`,
        guid: 8284612410
      }
    })
      .then((response) => {
        res.json(response.data)
      })
  })
})

app.use('/api', apiRouters)
app.use(express.static('./dist'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

})
