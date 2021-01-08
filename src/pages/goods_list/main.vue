<template>
<view>
  <Search />
  <view>列表页{{ cid }}</view>
</view>
</template>

<script>
import { getGoodsList } from "@/api";
import Search from '@/components/Search/index.vue'
export default {
  components:{
    Search
  },
  data() {
    return {
      cid: "",
      pagenum: 1,
      pagesize: 10,
      goods: [],
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
  },
};
</script>

<style>
</style>