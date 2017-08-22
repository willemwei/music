<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li :key="item" @click="selectItem(item)" class="search-item" v-for="item in searches">
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      searches: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item);
      },
      deleteOne(item) {
        this.$emit('delete', item);
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import url("../../common/less/variable");
  @import url("../../common/less/mixin");

  .search-list {
    .search-item {
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;

      &.list-enter-active,
      &.list-leave-active {
        transition: all .1s;
      }

      &.list-enter,
      &.list-leave-to {}

      .text {
        flex: 1;
        color: @color-text-l;
      }

      .icon {
        .extend-click();

        .icon-delete {
          font-size: @font-size-small;
          color: @color-text-d;
        }
      }
    }
  }
</style>
