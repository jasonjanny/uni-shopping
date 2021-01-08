<template>
  <view class="search">
    <view class="search_in">
      <icon
        size="30rpx"
        color="#959595"
        type="search"
      />
      <text class="search_text">搜索</text>
    </view>
  </view>
</template>

<script>
export default {};
</script>


<style lang="less" scoped>
.search {
  padding: 10rpx 25rpx;
  background-color: #bc9ee5;
  .search_in {
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #959595;
    background-color: #fff;
    border-radius: 5rpx;
    .search_text {
      margin-left: 6rpx;
    }
  }
}
</style>