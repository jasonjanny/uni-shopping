<template>
  <view>
    <!-- 1.0 搜索框 -->
    <Search />
    <!-- 2.0 分类主体 -->
    <view class="cate">
      <scroll-view
        class="cate_left"
        scroll-y
      >
        <view
          v-for="(item,index) in cateLeft"
          :key="item.cat_id"
          class="cate_left_item"
          @tap="changeTabs(index)"
          :class="{
            active: activeIndex === index
          }"
        >
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <!-- 右边滚动容器 -->
      <scroll-view
        class="cate_right"
        scroll-y
      >
        <!-- 第一层循环 -->
        <view
          class="floor"
          v-for="item in cateRight"
          :key="item.cat_id"
        >
          <view class="title">{{ item.cat_name }}</view>
          <view class="list">
            <!-- 第二层循环 -->
            <navigator
              :url="`/pages/goods_list/main?cid=${item2.cat_id}`"
              class="item"
              v-for="item2 in item.children"
              :key="item2.cat_id"
            >
              <image
                class="item_image"
                :src="item2.cat_icon"
                lazy-load
                mode="aspectFill"
              />
              <text class="item_text">{{item2.cat_name}}</text>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
// ist 生成 import 导入的基本接口
// 选中文件 - 右键 - 复制相对路径 - Ctrl+D 选中所有的错误修改斜杠方向 - src 换 @ 符号
/* 
  分类页本地存储业务分析：
    页面加载的时候 onLoad
      1. 获取本地存储中是否有 分类缓存
        1.1 没有本地存储
          发送分类数据，请求完毕， 把分类数据保存到本地存储
          把时间戳存储起来，用于后期数据失效校验
        1.2 有本地存储
          判断 分类缓存 是否超过某个有效时间，测试用 60s
            1.2.1 无效，发送新的请求，把分类数据保存到本地存储
            1.2.2 有效，使用本地存储的数据
*/
import Search from "@/components/Search/index.vue";
export default {
  components: {
    Search,
  },
  data() {
    return {
      cateLeft: [],
      cateRight: [],
      activeIndex: 0,
      cateAll: [],
    };
  },
  // 页面加载时
  onLoad() {
    // 获取本地存储中的分类缓存
    const cateAll = uni.getStorageSync("cateAll") || [];
    // 如果缓存中没有数据
    if (cateAll.length === 0) {
      // 发送新请求
      this.getCateData();
    } else {
      // 获取现在的时间戳
      const now = Date.now();
      // 获取上一次请求分类的时间戳
      const old = uni.getStorageSync("cateAllTime");
      // 如果时间间隔超过 某个时间
      if (now - old >= 10 * 60 * 1000) {
        // 如果时间超过了，就需要重新发送请求
        this.getCateData();
      } else {
        // 如果数据没有过期
        this.initData(cateAll);
      }
    }
  },
  methods: {
    // 点击切换 tabs 选项卡
    changeTabs(index) {
      //  1. 改变左边选中状态
      this.activeIndex = index;
      //  2. 更换右边展示的内容
      this.cateRight = this.cateAll[index].children;
    },
    getCateData() {
      uni.request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
        success: (res) => {
          // console.log(res.data.message);
          // 先把后端返回的数据存到临时变量中
          const cateAll = res.data.message;
          // 往小程序本地存储写入数据，小程序的本地存储会记录数据的类型
          uni.setStorageSync("cateAll", cateAll);
          // 把保存到本地存储的时间也存起来
          uni.setStorageSync("cateAllTime", Date.now());
        },
      });
    },
    //  更新 cateAll， cateLeft ，cateRight 三个数据
    initData(cateAll) {
      // 为了方便在不同的函数中都能找到分类数据，把 cateAll 保存到页面组件中
      this.cateAll = cateAll;
      // 通过数组的 map 方法映射一份精简过的数据
      // 第一个 ({ cate_name, cate_id })      从 item 中解构出来两个属性
      // 第二个 => ({ cate_name, cate_id })   箭头函数后面的表示返回一个对象
      // this.cateLeft = cateAll.map(({ cat_name, cat_id }) => ({
      //   cat_name,
      //   cat_id,
      // }));
      // 左边的数据 - 一级分类
      this.cateLeft = cateAll.map((item) => {
        return {
          cat_name: item.cat_name,
          cat_id: item.cat_id,
        };
      });
      // 右边的数据 - 二级分类
      this.cateRight = cateAll[0].children;
    },
  },
};
</script>

<style lang="less">
.cate {
  display: flex;
  .cate_left {
    height: calc(100vh - 100rpx);
    background-color: #f3f3f3;
    width: 182rpx;
    .cate_left_item {
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active {
        color: #bc9ee5;
        &::before {
          content: "";
          width: 4rpx;
          height: 44rpx;
          background-color: #bc9ee5;
          position: absolute;
          left: 0;
        }
      }
    }
  }
  .cate_right {
    flex: 1;
    height: calc(100vh - 100rpx);
    background-color: #fff;
    .floor {
      .title {
        height: 100rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26rpx;
        &::before,
        &::after {
          content: "/";
          color: #a00;
          margin: 0 5px;
        }
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 33.33%;
          padding: 20rpx 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .item_image {
            width: 120rpx;
            height: 120rpx;
          }
          .item_text {
            margin-top: 5rpx;
            font-size: 22rpx;
          }
        }
      }
    }
  }
}
</style>