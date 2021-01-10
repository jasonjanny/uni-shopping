<template>
  <view>
    <Search />
    <Tabs @getIndex="setIndex" :tabsData="tabsData" />
    <view class="goods_list">
      <view class="goods_item">
        <image class="goods_img" src="" mode="" />
        <view class="goods_info"></view>
        <view class="goods_name"></view>
        <view class="goods_price"></view>
      </view>
    </view>
  </view>
</template>

<script>
import { getGoodsList } from "@/api";
import Search from "@/components/Search/index.vue";
import Tabs from "@/components/Tabs/index.vue";
export default {
  components: {
    Search,
    Tabs,
  },
  data() {
    return {
      cid: "",
      pagenum: 1,
      pagesize: 10,
      goods: [],
      tabsData: [
        { id: 1, text: "综合" },
        { id: 2, text: "销量" },
        { id: 3, text: "价格" },
      ],
    };
  },
  // 在 onLoad 生命周期函数中，可以获取到页面参数
  onLoad({ cid }) {
    // console.log(cid);
    // 把 cid 存储到 data 中方便发请求的时候使用
    this.cid = cid;
    // 根据 cid 分类参数，发送网络请求，
    this.getListData();
  },
  methods: {
    // 获取商品列表数据
    async getListData() {
      const res = await getGoodsList({
        cid: this.cid,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      console.log(res.data.message);
      const { goods } = res.data.message;
      this.goods = goods;
    },
    setIndex() {
      console.log(111);
    },
  },
};
</script>

<style lang="less" scoped>
.goods_list {
  .goods_item {
    display: flex;
    padding: 20rpx;
    .goods_img {
      width: 190rpx;
      height: 190rpx;
    }
    .goods_info {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;
    }

    .goods_name {
      font-size: 24rpx;
    }

    .goods_price {
      font-size: 26rpx;
      &::before {
        content: "￥";
        font-size: 80%;
        margin-right: 4rpx;
      }
    }
  }
}
</style>