<template>
  <div class="footer">
    <div>
      <img
        src="http://p1.music.126.net/nXF_Faa7-ZisQShLlAqyjw==/18791753231401604.webp?imageView&thumbnail=100x0&quality=75&tostatic=0&type=webp"
        alt="">
      <div>
        <p>孙燕姿</p>
        <p class="f_singer">XXXXXXXXX</p>
      </div>
    </div>
    <div>
      <p><i class="iconfont icon-yuanxingbofang"></i></p>
      <p><i class="iconfont icon-liebiao"></i></p>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="scss">
  @import "../common/css/px2rem";

  $designWidth: 750;
  .footer {
    padding: px2rem(10);
    background: rgba(255,255,255,.98);
    border-top: px2rem(1) solid #F1F1F2;
    position: fixed;
    width: px2rem(750);
    bottom: 0;
    display: flex;
    font-size: px2rem(30);
    height: px2rem(110);
    justify-content: space-between;
    .iconfont{
      font-size: px2rem(50);
    }
    img{
      height: 100%;
      display: block;
      margin-right: px2rem(10);
    }

    > div {
      display: flex;
      >div{
        display: inline-block;
        align-self: center;

      }
    }
    >div:nth-child(2){
      p{
       display: flex;
        i{
          align-self: center;
        }
        i:first-child{
          margin-right: px2rem(30);
        }
      }
    }
  }
  .f_singer{
    font-size: px2rem(25);
    color: #888;
  }
</style>
