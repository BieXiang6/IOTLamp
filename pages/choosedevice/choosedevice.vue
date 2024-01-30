
<template>
  <view class="all">
		  <div class="title_choose">
		      <text style="font-size: 40rpx;color: black;text-align: left;font-weight: bold;">我的设备</text>
		      <button class="add" @click="jumptowifi">添加设备</button>
		  </div>
		  <uni-list class="list_choose" style="background-color: #FFFFFF00;margin-top: 25rpx;">
		  	<uni-list-item v-for="i in devices" :key="i.sDeviceNum" style="background-color: #FFFFFF00;">
		  		<template slot="header">
					<biexiang-device v-bind:param="i" class="device"></biexiang-device>
		  		</template>
		  	</uni-list-item>
		  </uni-list>
	
  </view>
</template>

<script>

export default {
	data() {
		return {
		token:'null',
		account:'null',
		ip:'127.0.0.1',
		port:8500,
		devices:[{sAponym:"测试台灯",sDeviceNum:"testDevice32",nAponym:"032"}]
	};
	},
	onLoad() {
		this.token = getApp().globalData.token;
		this.account = getApp().globalData.account;
		this.port = getApp().globalData.port;
		this.ip = getApp().globalData.ip;
		uni.request({
			url:"http://" + this.ip + ":" + this.port + '/obtain_device?',
			data:{
				account: this.account,
				token: this.token
			},
			success:(res)=>{
				this.devices = res.data;
			}
		});
	},
	methods: {
		jumptowifi(){
    	// this.login();
			uni.navigateTo({
				url:'/pages/wifi/wifi',
			});
		},
	}
};
</script>
<style>
	.add{
		height: 100%;
		border: 1px solid black;
		border-radius: 10px;
/* 		font-size: 20px; */
		margin-right: 0;	
	}
	
	.title_choose {
		margin-top: 25rpx;
		width: 88%;
		height: 40px;
		display: flex;
		justify-content: left;
		align-items: center;
		flex-direction: row;
		margin-left: 6%;
		

	}
	
	.list_choose {
		width: 100%;
		height:100%;
		background-color:#FFFFFFF;
	}
	
	.device{
		width: 750rpx;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}
	.all {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
	}
</style>
