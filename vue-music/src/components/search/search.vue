<template>
  <div class="search">
    <div class="search-box-wrapper">
      <v-search-box ref="searchBox" @query="onQueryChange"></v-search-box>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <v-scroll class="shortcut" :refreshDelay="refreshDelay" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li v-for="item in hotKey" class="item" @click="addQuery(item)">
                <span>{{ item.k }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
            </h1>
            <v-search-list @select="setQuery" @delete="deleteSearchHistory" :searches="searchHistory"></v-search-list>
          </div>
        </div>
      </v-scroll>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <v-suggest :query="query" @listScroll="blurInput" @select="saveSearch" ref="suggest"></v-suggest>
    </div>
    <v-confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></v-confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Suggest from 'components/suggest/suggest';
  import SearchBox from 'base/search-box/search-box';
  import SearchList from 'base/search-list/search-list';
  import Confirm from 'base/confirm/confirm';
  import Scroll from 'base/scroll/scroll';
  import {mapActions} from 'vuex';
  import {getHotKey} from 'api/search';
  import {ERR_OK} from 'api/config';
  import {playlistMixin, searchMixin} from 'common/js/mixin';

  export default {
    mixins: [playlistMixin, searchMixin],
    data() {
      return {
        hotKey: [],
        query: ''
      };
    },
    components: {
      'v-search-box': SearchBox,
      'v-suggest': Suggest,
      'v-search-list': SearchList,
      'v-confirm': Confirm,
      'v-scroll': Scroll
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory);
      }
    },
    methods: {
      setQuery(item) {
        this.$refs.searchBox.setQuery({k: item});
      },
      showConfirm() {
        this.$refs.confirm.show();
      },
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.shortcutWrapper.style.bottom = bottom;
        this.$refs.shortcut.refresh();

        this.$refs.searchResult.style.bottom = bottom;
        this.$refs.suggest.refresh();
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10);
          }
        });
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    created() {
      this._getHotKey();
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh();
          }, 20);
        }
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less">
  @import url('../../common/less/variable');
  @import url('../../common/less/mixin');

  .search {
    .search-box-wrapper {
      margin: 20px;
    }
    .shortcut-wrapper {
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      .shortcut {
        height: 100%;
        overflow: hidden;
        .hot-key {
          margin: 0 20px 20px 20px;
          .title {
            margin-bottom: 20px;
            font-size: @font-size-medium;
            color: @color-text-l;
          }
          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: @color-highlight-background;
            font-size: @font-size-medium;
            color: @color-text-d;
          }
        }
        .search-history {
          position: relative;
          margin: 0 20px;
          .title {
            display: flex;
            align-items: center;
            height: 40px;
            font-size: @font-size-medium;
            color: @color-text-l;
            .text {
              flex: 1;
            }
            .clear {
              .extend-click();
              .icon-clear {
                font-size: @font-size-medium;
                color: @color-text-d;
              }
            }
          }
        }
      }
    }
    .search-result {
      position: fixed;
      width: 100%;
      top: 178px;
      bottom: 0;
    }
  }
</style>
