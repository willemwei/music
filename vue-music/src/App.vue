<template>
  <div id="app">
    <v-m-header></v-m-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-player></v-player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header';
  import Tab from 'components/tab/tab';
  import Player from 'components/player/player';

  export default {
    components: {
      'v-m-header': MHeader,
      'v-tab': Tab,
      'v-player': Player
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import url("common/less/variable");
</style>
