<template>
	<view>
		<div class="device">
			<div class="inf" @click="clickThis">
				<text class="Aponym">{{param.sAponym}}</text>
				<text class="nAponym">产品号：{{param.sDeviceNum}}</text>
				<text class="nAponym">型号：{{param.sModel}}</text>
			</div>
			<image src="../../../../static/choose.png" class="choose"></image>
		</div>
	</view>
</template>
<script>
	export default {
		props: {
			param:{
				type:Object,
				default:null,
				required: true
			}
			
		},
		components: {
			
		},
		methods: {
			clickThis()
			{
				getApp().globalData.onDevice = this.param;
				uni.navigateTo({
					url:'/pages/brightness/brightness'
				});
			}
		}
}
</script>
<style>
	.device{
		width: 750rpx;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}
	.inf {
		width: 562.5rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.Aponym {
		font-size: 40rpx;
		color: black;
		text-align: left;
	}
	.nAponym {
		font-size: 30rpx;
		color: grey;
		text-align: left;
	}
	.choose {
		width: 70rpx;
		height: 70rpx;
	}
</style>
