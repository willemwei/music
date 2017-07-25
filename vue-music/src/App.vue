<template>
  <div id="app">
    <v-m-header></v-m-header>
    <v-tab></v-tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import mHeader from 'components/m-header/m-header';
  import tab from 'components/tab/tab';

  export default {
    components: {
      'v-m-header': mHeader,
      'v-tab': tab
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import url("common/less/variable");

  #app {
    color: @color-theme;
  }
</style>
