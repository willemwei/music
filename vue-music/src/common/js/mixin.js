// 组件自定义了handlePlayList方法则会被覆盖 否则则会抛出异常

import {mapGetters} from 'vuex';

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlayList(this.playlist);
  },
  activated() {
  },
  watch: {
    playlist(newVal) {
      this.handlePlayList(newVal);
    }
  },
  methods: {
    handlePlayList(list) {
      throw new Error('component must implement handlePlayList method');
    }
  }
};
