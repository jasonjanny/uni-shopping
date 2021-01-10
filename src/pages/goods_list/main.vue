<template>
  <view>
    <Search />
    <Tabs @getIndex="setIndex" :tabsData="tabsData" />
    <GoodsItem v-for="item in goods" :key="item.goods_id" :item="item" />
    <view class="tips" v-if="hasMore === false">
      我也是有底线的~~~
    </view>
  </view>
</template>

<script>
import { getGoodsList } from "@/api";
import Search from "@/components/Search/index.vue";
import Tabs from "@/components/Tabs/index.vue";
import GoodsItem from "@/components/GoodItem/index.vue";
export default {
  components: {
    Search,
    Tabs,
    GoodsItem,
  },
  data() {
    return {
      cid: "",
      pagenum: 1, // 页码
      pagesize: 10, // 页码容量
      goods: [], // 商品列表
      tabsData: [
        { id: 1, text: "综合" },
        { id: 2, text: "销量" },
        { id: 3, text: "价格" },
      ],
      hasMore: true, // 是否还有更多数据
    };
  },
  // 在 onLoad 生命周期函数中，可以获取到页面参数
  onLoad({ cid }) {
    // 把 cid 存储到 data 中方便发请求的时候使用
    this.cid = cid;
    // console.log(this.cid);
    // 根据 cid 分类参数发送请求
    this.getListData();
  },

  // 捕获用户触底事件
  onReachBottom() {
    // 如果准备触底，后面还有数据
    if (this.hasMore) {
      // 页码+1
      this.pagenum += 1;
      // 重新发送请求
      this.getListData();
    }
  },

  // 监听用户下拉刷新事件
  onPullDownRefresh() {
    // 初始化数据
    this.pagenum = 1;
    this.goods = [];
    this.hasMore = true;
    // 重新发送请求
    this.getListData();
    // 请求完成后，主动停止下拉刷新事件
    uni.stopPullDownRefresh();
  },

  methods: {
    // 获取商品列表数据
    async getListData() {
      // 调用 loading 提示
      uni.showLoading({ title: "疯狂加载中..." });
      const res = await getGoodsList({
        cid: this.cid,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
       // 请求结束立刻隐藏 loading 提示
      uni.hideLoading();
      const { goods, total } = res.data.message;
      // 拼接分页时的商品数据
      this.goods = [...this.goods, ...goods];

      // 如果已经没有更多数据了
      if (total === this.goods.length) {
        this.hasMore = false;
      }
    },
    setIndex() {
      console.log(111);
    },
  },
};
</script>

<style lang="less" scoped>
.tips {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>