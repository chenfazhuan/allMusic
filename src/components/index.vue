<template>
  <div class="in">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <div class="swipe-wrapper">
        <mt-swipe :auto="0" ref="swipeWrapper">
          <mt-swipe-item class="swip-item-1 item">
            <img src="https://static.vux.li/demo/1.jpg" alt="">
          </mt-swipe-item>
          <mt-swipe-item class="swip-item-2 item">
            <img src="https://static.vux.li/demo/2.jpg" alt="">
          </mt-swipe-item>
          <mt-swipe-item class="swip-item-3 item">
            <img src="https://static.vux.li/demo/1.jpg" alt="">
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
          <div>
            <img src="http://p1.music.126.net/33W2NxxBkW9CJXYYA54qxw==/109951163030368631.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp" alt="" >
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">我踏遍千山万水，只为遇见你</div>
          </div>
          <div>
            <img src="http://p1.music.126.net/33W2NxxBkW9CJXYYA54qxw==/109951163030368631.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp" alt="">
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">我踏遍千山万水，只为遇见你</div>
          </div>
          <div>
            <img src="http://p1.music.126.net/33W2NxxBkW9CJXYYA54qxw==/109951163030368631.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp" alt="" >
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">我踏遍千山万水，只为遇见你</div>
          </div>
        </div>
        <div class="f_singer">
          <div>
            <img src="http://p1.music.126.net/1BQFT-akODSLM93bj4CQ2Q==/109951163041556034.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp" alt="">
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">我踏遍千山万水，只为遇见你</div>
          </div>
          <div>
            <img src="http://p1.music.126.net/1BQFT-akODSLM93bj4CQ2Q==/109951163041556034.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp" alt="">
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">我踏遍千山万水，只为遇见你</div>
          </div>
          <div>
            <img src="http://p1.music.126.net/1BQFT-akODSLM93bj4CQ2Q==/109951163041556034.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp" alt="">
            <i class="iconfont icon-erji"></i>
            <div class="sheet_font">我踏遍千山万水，只为遇见你</div>
          </div>
        </div>
      </div>
      <div class="favourite new_music">
        <div class="f_title">最新音乐</div>
        <ul>
          <li>
            <div>
              <div class="new_song">
                回转木马的孤单
              </div>
              <div class="new_singer">
                戚薇-回转木马的孤单
              </div>
            </div>
            <p>
              <i class="iconfont icon-yuanxingbofang"></i>
            </p>
          </li>
          <li>
            <div>
              <div class="new_song">
                回转木马的孤单
              </div>
              <div class="new_singer">
                戚薇-回转木马的孤单
              </div>
            </div>
            <p>
              <i class="iconfont icon-yuanxingbofang"></i>
            </p>
          </li>
          <li>
            <div>
              <div class="new_song">
                回转木马的孤单
              </div>
              <div class="new_singer">
                戚薇-回转木马的孤单
              </div>
            </div>
            <p>
              <i class="iconfont icon-yuanxingbofang"></i>
            </p>
          </li>
          <li>
            <div>
              <div class="new_song">
                回转木马的孤单
              </div>
              <div class="new_singer">
                戚薇-回转木马的孤单
              </div>
            </div>
            <p>
              <i class="iconfont icon-yuanxingbofang"></i>
            </p>
          </li>
          <li>
            <div>
              <div class="new_song">
                回转木马的孤单
              </div>
              <div class="new_singer">
                戚薇-回转木马的孤单
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
  export default {
    methods: {
      loadTop() {
//        this.$refs.loadmore.onTopLoaded();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/px2rem";

  $designWidth: 750;
  .in{
    margin-top: px2rem(150);
  }
  .no{
    height: px2rem(110);
    width: 100%;
  }
  .iconfont{
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
    img{
      width: 100%;
    }
  }

  .favourite{
    padding: px2rem(30) 0;
    .f_title{
      padding-left: px2rem(10);
      font-size: px2rem(30);
      border-left: 5px solid #D33A31;
    }
    .f_singer{
      display: flex;
      justify-content: space-between;
      margin-top: px2rem(30);
      img{
        width: 100%;
        display: block;
      }
      >div{
        position: relative;
        width: px2rem(240);

        .f_name{
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
  .sheet{
    padding-top: 0!important;
    .sheet_font{
      font-size: px2rem(25);
      padding: px2rem(10);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .new_music{
    padding-top: 0!important;
    ul{
      li{
        display: flex;
        justify-content: space-between;
        font-size: px2rem(30);
        padding: px2rem(20);
        border-bottom: px2rem(1) solid #F1F1F2;
        .new_singer{
          color: #888;
          font-size: px2rem(25);
        }
        p{
          i{
            position: relative;
            font-size: px2rem(40);
            color: #AAAAAA;
          }
        }
      }
    }

  }


</style>
