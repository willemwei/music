<template>
  <transition name="slide">
    <v-music-list :title="title" :bgImage="bgImage"></v-music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      'v-music-list': MusicList
    },
    computed: {
      title() {
        return this.topList.topTitle;
      },
      bgImage() {
        return this.topList.picUrl;
      },
      ...mapGetters([
        'topList'
      ])
    }
  };
</script>

<style rel="stylesheet/less" lang="less">
  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
