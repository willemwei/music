<template>
  <v-scroll
    class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    @scrollBs="scroll"
    :probeType="probeType">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar"/>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :data-index="index"
            :class="{'current': currentIndex === index}">{{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fiexedTitle" ref="listFixed">
      <h1 class="fixed-title">{{ fiexedTitle }}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <v-loading></v-loading>
    </div>
  </v-scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import loading from 'base/loading/loading';
  import {getData} from 'common/js/dom';

  const ANVHOR_HEIGHT = 18;
  const TITLE_HEIGHT = 30;

  export default {
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: 0
      };
    },
    created() {
      this.touch = {};
      this.listenScroll = true;
      this.listHeight = [];
      this.probeType = 3;
    },
    computed: {
      shortcutList() {
        return this.data.map((item) => {
          return item.title.substring(0, 1);
        });
      },
      fiexedTitle() {
        if (this.scrollY > 0) {
          return '';
        }

        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
      }
    },
    components: {
      'v-scroll': Scroll,
      'v-loading': loading
    },
    methods: {
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index') ? getData(e.target, 'index') * 1 : null;
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.pageY;
        this.touch.anchorIndex = anchorIndex;
        this._scrollTo(anchorIndex);
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;

        let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANVHOR_HEIGHT);
        let anchorIndex = this.touch.anchorIndex + delta;
        this._scrollTo(anchorIndex);
      },
      scroll(pos) {
        this.scrollY = pos.y;
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return;
        }
        this.scrollY = -this.listHeight[index];
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
      },
      _calculateHeight() {
        this.listHeight = [];
        const list = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight();
        }, 20);
      },
      scrollY(newY) {
        const listHeight = this.listHeight;
        for (let i = 0; i < listHeight.length - 1; i++) {
          let h1 = listHeight[i];
          let h2 = listHeight[i + 1];

          if (-newY >= h1 && -newY < h2) {
            this.currentIndex = i;
            this.diff = h2 + newY;
            break;
          }
        }
      },
      diff(newDiff) {
        let fixedTop = (newDiff > 0 && newDiff < TITLE_HEIGHT) ? newDiff - TITLE_HEIGHT : 0;

        if (this.fixedTop === fixedTop) {
          return;
        }
        this.fixedTop = fixedTop;
        this.$refs.listFixed.style.transform = `translate3d(0, ${this.fixedTop}px, 0)`;
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less">
  @import url("../../common/less/variable");

  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @color-background;
    .list-group {
      padding-bottom: 30px;
      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: @font-size-small;
        color: @color-text-l;
        background: @color-highlight-background;
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          margin-left: 20px;
          color: @color-text-l;
          font-size: @font-size-medium;
        }
      }
    }
    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: @color-background-d;
      font-family: Helvetica;
      .item {
        padding: 3px;
        line-height: 1;
        color: @color-text-l;
        font-size: @font-size-small;
        &.current {
          color: @color-theme;
        }
      }
    }
    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: @font-size-small;
        color: @color-text-l;
        background: @color-highlight-background;
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
