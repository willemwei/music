<template>
  <div id="app">
    <v-m-header></v-m-header>
    <v-tab></v-tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header';
  import Tab from 'components/tab/tab';

  export default {
    components: {
      'v-m-header': MHeader,
      'v-tab': Tab
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import url("common/less/variable");
</style>
