<template>
  <view>
    <!-- 1.0 商品滑动展示模块 -->
    <swiper class="swiper" indicator-dots indicator-active-color="#bc9ee5">
      <swiper-item v-for="(item, index) in pics" :key="item.pics_id">
        <image
          class="swiper_image"
          :src="item.pics_big_url"
          mode="aspectFit"
          @tap="previewImageHandle(index)"
        />
      </swiper-item>
    </swiper>
    <!-- 2.0 商品信息 -->
    <view class="info">
      <view class="info_head">
        <text class="price">{{ goods_price }}</text>
        <view class="iconfont icon-zhuanfa opentype_wrap">
          <button class="opentype_button" open-type="share"></button>
        </view>
        <view class="iconfont icon-shoucang1"></view>
      </view>
      <view class="info_name">
        {{ goods_name }}
      </view>
    </view>
    <view class="divider"></view>
    <!-- 3.0 图文详情 -->
    <view class="detail">
      <view class="detail_head">图文详情</view>
      <!-- rich-text 类似于 v-html -->
      <rich-text :nodes="goods_introduce"></rich-text>
    </view>
    <!-- 4.0 底部固定栏 -->
    <view class="bottom">
      <view class="icon_item opentype_wrap">
        <button class="opentype_button" open-type="share"></button>
        <view class="iconfont icon-kefu"></view>
        <text class="icon_item_text">联系客服</text>
      </view>
      <view class="icon_item">
        <view class="iconfont icon-gouwuche"></view>
        <text class="icon_item_text">购物车</text>
      </view>
      <view class="button_item">加入购物车</view>
      <view class="button_item">立即购买</view>
    </view>
  </view>
</template>

<script>
// 导入获取详情页的
import { getGoodsDetail } from "@/api";
export default {
  data() {
    return {
      goods_id: "",
      pics: [],
      goods_price: "",
      goods_name: "",
      goods_introduce: "",
    };
  },
  // 小程序中可通过 onLoad 生命周期函数获取页面传递过来的参数
  onLoad({ goods_id }) {
    // 存储页面参数中的 goods_id
    this.goods_id = goods_id;
    // 获取详情页数据
    this.getGoodsDetailData();
  },
  methods: {
    async getGoodsDetailData() {
      // 传递 id 获取商品详情数据
      const res = await getGoodsDetail({ goods_id: this.goods_id });
      // 提取出页面渲染所需的数据即可
      let { pics, goods_price, goods_name, goods_introduce } = res.data.message;
      // 按需绑定到 data 中
      this.pics = pics;
      this.goods_price = goods_price;
      this.goods_name = goods_name;
      // 获取系统信息
      const { system } = uni.getSystemInfoSync();
      // 把系统信息先转换成小写，在判断是否包含 ios 关键词，如果包含说明是 IOS 平台
      const isIOS = system.toLowerCase().includes("ios");
      // 如果是 IOS 平台，就把 webp 图片地址，替换成 jpg 地址
      if (isIOS) {
        goods_introduce = goods_introduce.replace(/\.webp/g, ".jpg");
      }
      // 1️⃣ 由于富文本组件通过 img 选择器选中图片，只支持类名选择器
      this.goods_introduce = goods_introduce.replace(
        /<img/g,
        '<img class="rich_img"'
      );
    },
    // 调用预览大图的功能
    previewImageHandle(current) {
      // 由于后端返回的数据不符合小程序接口的格式要求，所以需要 map 处理一下再使用
      const urls = this.pics.map((item) => item.pics_big);
      console.log(urls);
      // 🧨注意：urls 参数规定：数组的每一项必须是字符串
      uni.previewImage({ current, urls });
    },
  },
};
</script>

<style lang="less">
.swiper,
.swiper_image {
  width: 750rpx;
  height: 750rpx;
}
// 商品基本信息
.info {
  padding: 20rpx;
  .info_head {
    display: flex;
    .price {
      flex: 1;
      font-size: 36rpx;
    }
    .iconfont {
      font-size: 40rpx;
      color: #666;
      margin-left: 20rpx;
    }
  }
  .info_name {
    margin-top: 20rpx;
    font-size: 30rpx;
    line-height: 1.5;
  }
}
.detail {
  // 商品图文详情
  .detail_head {
    height: 88rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 通过类名，去除图片底部缝隙
  .rich_img {
    vertical-align: top;
  }
}
// 4.0 底部固定栏
.bottom {
  border-top: 1rpx solid #ddd;
  height: 96rpx;
  position: fixed;
  width: 750rpx;
  background-color: #fff;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20rpx;
  box-sizing: border-box;
  .icon_item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .iconfont {
      font-size: 44rpx;
    }
    .icon_item_text {
      font-size: 20rpx;
    }
  }
  .button_item {
    background-color: #fba923;
    width: 196rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 26rpx;
    border-radius: 30rpx;
    &:last-child {
      background-color: var(--mainColor);
    }
  }
}
</style>