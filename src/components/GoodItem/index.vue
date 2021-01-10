<template>
  <navigator
    :url="`/pages/goods_detail/main?goods_id=${item.goods_id}`"
    class="goods_item"
    hover-class="none"
  >
    <image
      lazy-load
      class="goods_image"
      :src="item.goods_small_logo"
      mode="aspectFill"
    />
    <view class="goods_info">
      <view class="goods_name">{{ item.goods_name }}</view>
      <view class="goods_price">{{ item.goods_price }}</view>
    </view>
  </navigator>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="less">
.goods_item {
  padding: 20rpx;
  display: flex;
  .goods_image {
    width: 190rpx;
    height: 190rpx;
    background-color: #ddd;
  }
  .goods_info {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods_name {
      font-size: 28rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .goods_price {
      font-size: 28rpx;
      color: #ea4350;
      &::before {
        content: "¥";
        font-size: 80%;
        margin-right: 4rpx;
      }
    }
  }
}
</style>