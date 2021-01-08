<template>
  <!-- 1. template 使用小程序的组件，不要使用 html 标签 -->
  <view>
    <!-- 1.0 使用头部搜索框组件 -->
    <Search />
    <!-- 2.0 轮播图分区 -->
    <swiper
      class="swiper"
      indicator-dots
      autoplay
      circular
      indicator-color="rgba(0, 0, 0, .3)"
      indicator-active-color="#bc9ee5"
    >
      <!-- 在 vue 单文件中列表渲染需要用 v-for，通过脚手架编译后会自动变成 wx:for -->
      <swiper-item v-for="item in swiperData" :key="item.goods_id">
        <image class="swiper_image" :src="item.image_src" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <!-- 3.0 入口导航 -->
    <view class="nav">
      <navigator
        v-for="item in navData"
        :key="item.name"
        class="nav_item"
        hover-class="none"
        :open-type="item.open_type"
        :url="item.navigator_url"
      >
        <image class="nav_image" :src="item.image_src" mode="aspectFill" />
      </navigator>
    </view>
    <!-- 4.0 首页楼层 -->
    <view v-for="(item, index) in floorData" :key="index" class="floor">
      <!-- 楼层标题 -->
      <view class="floor_title">
        <image
          class="floor_title_image"
          :src="item.floor_title.image_src"
          mode="aspectFill"
        />
      </view>
      <!-- 楼层列表 -->
      <view class="floor_list">
        <navigator
          class="floor_list_item"
          v-for="item2 in item.product_list"
          :key="item2.name"
          :open-type="item2.open_type"
          :url="item2.navigator_url"
          hover-class="none"
        >
          <!-- 注意，小程序中属性绑定用反引号会报错 -->
          <image
            class="floor_list_image"
            :src="item2.image_src"
            mode="aspectFill"
            :style="'width:' + item2.image_width + 'rpx'"
          />
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
// 2. script 里面的写法和 Vue 的完全一样，但是注意生命周期请使用小城市生命周期
// 1. 导入组件
import Search from "@/components/Search/index.vue";
import { floorData, homeNav, homeSwiper } from "@/api";
export default {
  // 2. 注册组件
  components: {
    Search,
  },
  // 页面数据
  data() {
    return {
      swiperData: [],
      navData: [],
      floorData: [],
    };
  },
  // 但是注意生命周期请使用小程序生命周期
  async onLoad() {
    // 1.0 发送网络请求 - 获取轮播图数据
    const res1 = await homeSwiper();
    this.swiperData = res1.data.message;

    // 2.0 获取入口导航数据
    const res2 = await homeNav();
    this.navData = res2.data.message;

    // 3.0 获取楼层数据
    const res3 = await floorData();
    res3.data.message.forEach((item) => {
      item.product_list.forEach((item2) => {
        // replace 替换，在问号前面添加一级 /main
        item2.navigator_url = item2.navigator_url.replace("?", "/main?");
      });
    });
    // console.log(res.data.message);
    // 把修改后的数据更新到 floorData 中
    this.floorData = res3.data.message;
  },
  // 事件写 methods 中
  methods: {},
};
</script>

<style lang="less" scoped>
.swiper {
  width: 750rpx;
  height: 340rpx;
  .swiper_image {
    width: 750rpx;
    height: 340rpx;
  }
}
// 3.0 入口导航
.nav {
  display: flex;
  justify-content: space-evenly;
  padding: 12rpx 0 40rpx;
  .nav_item {
    .nav_image {
      width: 128rpx;
      height: 140rpx;
    }
  }
}
// 4.0 楼层
.floor {
  margin-top: 10rpx;
  .floor_title {
    .floor_title_image {
      width: 750rpx;
      height: 60rpx;
    }
  }

  .floor_list {
    // 检测浮动的子元素，清除浮动带来的影响
    overflow: hidden;
    .floor_list_item {
      // 浮动实现环绕效果
      float: left;
      margin-left: 13rpx;
      margin-bottom: 10rpx;
      &:nth-child(1) {
        // 第一个导航链接里面的图片变高
        .floor_list_image {
          height: 386rpx;
        }
      }
      .floor_list_image {
        height: 188rpx;
        vertical-align: top;
      }
    }
  }
}
</style>
