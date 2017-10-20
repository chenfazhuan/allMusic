<template>
  <div id="app">
    <myHeader></myHeader>

    <router-view></router-view>

    <myFooter></myFooter>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import myFooter from '@/components/footer'
  export default {
    name: 'app',
    components: {
      myHeader,
      myFooter
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "common/css/px2rem";
  $designWidth : 750;
  #app{
    width: px2rem(750);
    margin: 0 auto;
    background:#FCFCFD;
    height: 100%;
  }

</style>
