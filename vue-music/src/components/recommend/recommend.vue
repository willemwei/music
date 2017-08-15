<template>
  <div class="recommend" ref="recommend">
    <v-scroll class="recommend-content" :data="discList" ref="recommendCont">
      <div>
        <div v-if="recommends.length" class="slide-wrapper">
          <v-slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImg" :src="item.picUrl">
              </a>
            </div>
          </v-slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <v-loading></v-loading>
      </div>
    </v-scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import loading from 'base/loading/loading';
  import Scroll from 'base/scroll/scroll';
  import {getRecommend, getDiscList} from 'api/recommend';
  import {ERR_OK} from 'api/config';
  import Slider from 'base/slider/slider';
  import {playlistMixin} from 'common/js/mixin';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [
      playlistMixin // mixin的使用
    ],
    data() {
      return {
        recommends: [],
        discList: []
      };
    },
    created() {
      this._getRecommend();
      this._getDiscList();
    },
    methods: {
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.recommendCont.refresh();
        this.checkLoaded = true;
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
          }
        });
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list;
          }
        });
      },
      loadImg() {
        if (!this.checkLoaded) {
          this.$refs.recommendCont.refresh();
          this.checkLoaded = true;
        }
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        });

        this.setDisc(item);
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      'v-slider': Slider,
      'v-scroll': Scroll,
      'v-loading': loading
    }
  };
</script>

<style rel="stylesheet/less" lang="less">
  @import url('../../common/less/variable');

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;
          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: @font-size-medium;
            .name {
              margin-bottom: 10px;
              color: @color-text;
            }
            .desc {
              color: @color-text-d;
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
