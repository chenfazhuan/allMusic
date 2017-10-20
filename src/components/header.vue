<template>
  <div class="header">
    <div class="top" >
      <i class="iconfont icon-shezhi"></i>
      <i class="iconfont icon-m"></i>
      <i class="iconfont icon-character-avatar"></i>
    </div>
    <div class="search">
      <input type="text">
      <div class="search-font">
        <i class="iconfont icon-chaxun"></i>
        搜索
      </div>
    </div>
  </div>
</template>

<script>

  export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
  @import "../common/css/px2rem";
  @import "../common/font/iconfont.css";

  $designWidth: 750;
  .blur {

    -webkit-filter: blur(10px); /* Chrome, Opera */
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);

    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
  }
  .header {
    height: 8%;
    width: 100%;
    background: #D43E36;
    color: #fff;
    padding-bottom: 0.4rem;
  }
  .top{
     padding: 0.4rem;
    width: 100%;
    display: flex;
  }
  .search{
    padding:0 0.4rem;
    position: relative;
    >input{
      display: block;
      outline: none;
      border: none;
      height: 1.3rem;
      width: 100%;
      padding:0 0.2rem;
      background: #CC0000 ;
      border-radius: 0.15rem;
    }
    >.search-font{
      display: inline-block;
      font-size: 0.7rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      >i{
        font-size: 0.7rem;
      }
    }
  }
  .iconfont {
    font-size: 1rem;
  }

  .icon-shezhi {
    float: left;
  }

  .icon-m {
    margin: 0 auto;
    display: inline-block;
  }

  .icon-character-avatar {
    float: right;
  }
</style>
