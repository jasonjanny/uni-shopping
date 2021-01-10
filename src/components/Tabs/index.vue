<template>
  <view class="tabs">
    <view
      class="tabs_item"
      :class="{ active: activeIndex === index }"
      v-for="(item, index) in tabsData"
      :key="index"
      @tap="changeTabsIndex(index)"
      >{{item.text}}</view
    >
  </view>
</template>

<script>
export default {
  props: ["tabsData"],
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    changeTabsIndex(index) {
      this.activeIndex = index;
      this.$emit('getIndex',index);
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  justify-content: space-evenly;
  .tabs_item {
    width: 184rpx;
    height: 88rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3rpx solid transparent;
    &.active {
      font-weight: bold;
      border-bottom: 4rpx solid #bc9ee5;
    }
  }
}
</style>