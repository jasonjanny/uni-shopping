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
.opentype_wrap{
	position: relative;
	.opentype_button{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0;
	}
}
</style>