<template>
  <v-scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" @beforeScroll="listScroll"
            :beforeScroll="beforeScroll">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <v-loading v-show="hasMore" title=""></v-loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <v-no-result title="抱歉，暂无搜索结果"></v-no-result>
    </div>
  </v-scroll>
</template>

<script type="text/ecmascript-6">
  import {search} from 'api/search';
  import {ERR_OK} from 'api/config';
  import {createSong} from 'common/js/song';
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import Singer from 'common/js/singer';
  import {mapMutations, mapActions} from 'vuex';
  import NoResult from 'base/no-result/no-result';

  const TYPE_SINGER = 'singer';
  const perpage = 20;

  export default {
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true
      };
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      search() {
        this.hasMore = true;
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data);
            this._checkMore(res.data);
          }
        });
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine';
        }
        return 'icon-music';
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername;
        }
        return `${item.name} - ${item.singer}`;
      },
      searchMore() {
        if (!this.hasMore) {
          return;
        }

        this.page++;
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data));
            this._checkMore(res.data);
          }
        });
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          });

          this.$router.push({
            path: `/search/${singer.id}`
          });

          this.setSinger(singer);
        } else {
          this.insertSong(item);
        }

        this.$emit('select');
      },
      listScroll() {
        this.$emit('listScroll');
      },
      _genResult(data) {
        let ret = [];

        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}});
        }

        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list));
        }

        return ret;
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData));
          }
        });

        return ret;
      },
      _checkMore(data) {
        const song = data.song;
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false;
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query() {
        this.search();
      }
    },
    components: {
      'v-scroll': Scroll,
      'v-loading': Loading,
      'v-no-result': NoResult
    }
  };
</script>

<style rel="stylesheet/less" lang="less">
  @import url('../../common/less/variable');
  @import url('../../common/less/mixin');

  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^="icon-"] {
          font-size: 14px;
          color: @color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: @font-size-medium;
        color: @color-text-d;
        overflow: hidden;
        .text {
          .no-wrap();
        }
      }
    }
    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
