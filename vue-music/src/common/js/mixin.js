// 组件自定义了handlePlayList方法则会被覆盖 否则则会抛出异常

import {mapGetters, mapMutations, mapActions} from 'vuex';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';

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
    this.handlePlayList(this.playlist);
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

export const playMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'mode',
      'playlist'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }

      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      });

      this.setCurrentIndex(index);
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  }
};

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 100
    };
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    blurInput() {
      this.$refs.searchBox.blur();
    },
    saveSearch() {
      this.saveSearchHistroy(this.query);
    },
    onQueryChange(query) {
      this.query = query;
    },
    setQuery(item) {
      this.$refs.searchBox.setQuery({k: item});
    },
    addQuery(item) {
      this.$refs.searchBox.setQuery(item);
    },
    ...mapActions([
      'saveSearchHistroy',
      'deleteSearchHistory'
    ])
  }
};
