<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
// 1.0 全局导入字体图标
@import "@/styles/iconfont.css";
// 2.0 css3 变量
page {
  --mainColor: #eb4450;
}
// 3.0 价格的类名
.price {
  color: var(--mainColor);
  &::before {
    content: "¥";
    font-size: 80%;
    margin-right: 3rpx;
  }
}
.divider {
  height: 20rpx;
  background-color: #f9f9f9;
}
</style>