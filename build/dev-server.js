'use strict'
require('./check-versions')()

var axios = require('axios')
var qs = require('querystring')


const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

const port = process.env.PORT || config.dev.port

const autoOpenBrowser = !!config.dev.autoOpenBrowser

const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

app.use(hotMiddleware)

Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})


app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

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
        sin: 0,
        ein: 5
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
    axios.get(url).then((resopnse) => {
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
    let url = obj.url+"?page="+obj.page+"&json=true";
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
    let url = obj.url+"?page="+obj.page+"&json=true";
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
    axios.get(url,{
      headers:{
        referer:'http://y.qq.com/'
      },
      params:{
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl:3,
        page:'detail',
        type:'top',
        topid:27,
        _: obj.time
      }
    }).then((resopnse) => {
      res.json(resopnse.data)
    })
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
