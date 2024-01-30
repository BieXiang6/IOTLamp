<template>
		<view>
			<div class="inf" @click="clickThis">
				<text class="Aponym">{{param.sAponym}}</text>
				<text class="nAponym">产品号：{{param.sDeviceNum}}</text>
				<text class="nAponym">型号：{{param.sModel}}</text>
			</div>
			<image src="../../../../static/choose.png" class="choose"
			@click="deleteThis"></image>
		</view>
</template>
<script>
	
	export default {
		name:"biexiang-device",
		data() {
			return {
				
			};
		},
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
			},
			deleteThis()
			{
				uni.showModal({
					   title:"重复",
					   content:"您确定要删除" + this.param.sAponym + "吗?",
					   success: (res)=>{
							if (res.confirm) {
						   		uni.request({
						   			url:"http://" + getApp().globalData.ip + ":" + getApp().globalData.port + '/drop_device?',
						   				data:{
						   					account: getApp().globalData.account,
						   					token: getApp().globalData.token,
											device_num: this.param.sDeviceNum
						   				},
						   				success:(res)=>{
						   					if(!res.data.startsWith("error"))
											{
												uni.showModal({
													   title:"成功",
													   content:"设备已经从您的账号移除！"
												  });
											}
											else
											{
												uni.showModal({
													   title:"失败",
													   content:res.data
												  });
											}
						   		
						   				}
						   		});
							}
					   }
					   
				  });
			}
			
		}
}
</script>
<style>

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
