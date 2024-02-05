<template>
	<view class="content">

		<div class="dev_inf">
			<text class="Aponym">{{device_inf.sAponym}}</text>
			<image src="../../static/change.png" mode="heightFix"
			style="height: 40rpx" @click="changeAponym"></image>
			<text class="nAponym">{{device_inf.sDeviceNum}}</text>
			<text class="nAponym">{{device_inf.sModel}}</text>
		</div>
		<div class="dev_state">
			<div class="sun">
				<img src='../../static/light2.png' v-bind:style="sunStyle">
				<text class="nit">{{actLig}}</text>
			</div>
			<div class="temp">
				<div class="dev_tip">
					<text>温湿度</text>
					<text style="font-size: 30rpx;">{{tempr}}</text>
				</div>
				<div class="dev_tip">
					<text>案前当前</text>
					<text>{{isPerson}}</text>
				</div>
				<div class="dev_tip">
					<text>环境亮度</text>
					<text>{{lig}}</text>
				</div>
			</div>
		</div>
		<div class="dev_con">
			<div class="dev_con_i">
				<text style="width: 15%;">亮度:</text>
				<slider class="lightslider"
					v-bind:value="lightValue"
					background-color="#000000"
					activeColor="rgb(179, 157, 219)"
					block-color="rgb(24, 255, 255)"
					block-size="20"
					@changing="ligChanging"
					@change="confirmColor"></slider>
			</div>
			<div class="dev_con_i">
				<text style="width: 15%;">色调:</text>
				<slider class="lightslider"
					v-bind:value="lightStyle"
					background-color="rgb(255, 198, 107)"
					activeColor="#FFFFEE"
					block-color="rgb(255, 198, 107)"
					block-size="20"
					@changing="colorChanging"
					@change="confirmColor"></slider>
			</div>
			<div class="dev_con_i">
				<button @click="openLight">关灯</button>
			</div>
		</div>

	</view>
</template>
<script>
import {kelvinToRGB, changeLightValue} from "@/utils/Kelvin-to-RGB.js";
var app = getApp();

	export default {
		data() {
			return {
				device_inf:{
					sDeviceNum: "testnum",
					sAponym: "我的台灯",
					sModel: "000"
				},
				sunStyle:"position: relative;left: -750rpx;filter: drop-shadow(#ffea04 750rpx 0) blur(1rpx);",
				lighti:"5 0 0 0 0\n0 8 0 0 0\n0 0 4 0 0\n0 0 0 1 0",
				lightValue:55,
				lightStyle:45,
				actLig:0,
				isPerson:"设备离线",
				tempr:"设备离线",
				isOpen:false,
				lig:1000,
				colorMax:"#FFFFFF",
				colorFact:"#ffea04",
				topic_root: "IOTLamp/slave/",
				phone_topic: "IOTLamp/master/",
				tempInterval: null
			};
		},
		onLoad() {
			this.device_inf = getApp().globalData.onDevice;
			this.phone_topic = "IOTLamp/master/" + getApp().globalData.account  + '/';
			this.topic_root = 'IOTLamp/slave/' + this.device_inf.sDeviceNum + '/';
			this.created();
		},
		beforeDestroy(){
			clearInterval(this.tempInterval);
			app.globalData.client.unsubscribe(this.topic_root + '#');
		},
		methods: {
			ligChanging(e)
			{
				this.colorFact = changeLightValue(this.colorMax, e.detail.value - 100);
				this.sunStyle = "position: relative;left: -750rpx;filter: drop-shadow(" + this.colorFact + " 750rpx 0) blur(1rpx);";
			},
			colorChanging(e)
			{
				var value = e.detail.value;
				var res = 2500 + value * 55;
				this.colorMax = kelvinToRGB(res);
				this.colorFact = changeLightValue(this.colorMax, this.lightValue - 100);
				this.sunStyle = "position: relative;left: -750rpx;filter: drop-shadow(" + this.colorFact + " 750rpx 0) blur(1rpx);";
			},
			confirmColor()
			{
				app.globalData.client.send(this.phone_topic + 'request', 'lig:' + this.colorFact, 0, false);
				console.log(this.colorFact);
			},
			onConnectedLost : function(responseObject){  
			      console.log("onConnectionLost:"+responseObject.errorMessage);
			},
			onMessageArrived : function (message) {
					
					var lastIndex = message.destinationName.lastIndexOf("/")
					var target = message.destinationName.substring(lastIndex + 1);
					if (target == 'DHT')
					{
						this.tempr = message.payloadString.replace(',', '℃/') + '%';
					}
					else if (target == 'SR')
					{
						if (message.payloadString == '0')
							this.isPerson = "无　人";
						else
							this.isPerson = "有　人";
					}
					else if (target == 'LIG')
					{
						this.lig = message.payloadString;
					}

			},
			onDestroyFunction: function (message) {
				
			},
			created: function() {
				app.globalData.client.onConnectedLost = this.onConnectedLost;
				app.globalData.client.onMessageArrived = this.onMessageArrived;
				app.globalData.client.subscribe(this.topic_root + '#', {
					qos: 0,
					onSuccess: ()=>{
						app.globalData.client.send(this.phone_topic + 'request', 'all', 0, false);
						this.tempInterval = setInterval(()=>{
							app.globalData.client.send(this.phone_topic + 'request', 'all', 0, false);
						}, 10000);

					}
				});
			},
			openLight()
			{
				if (!this.isOpen)
					app.globalData.client.send(this.phone_topic + 'request', 'lig:#FFFFFF', 0, false);
				else
					app.globalData.client.send(this.phone_topic + 'request', 'lig:#000000', 0, false);
				this.isOpen = !this.isOpen;
			},
			changeAponym()
			{
				uni.showModal({
					   title:"修改设备名",
					   editable: true,
					   placeholderText: "新名字",
					   success: (res)=>{
							if (res.confirm) {
								if (res.content == "")
								{
									uni.showModal({
										   title:"失败",
										   content:"您没有设置名字！"
									  });
								}
									
								uni.request({
									url:"http://" + getApp().globalData.ip + ":" + getApp().globalData.port + '/change_device',
							   		data:{
							   			account: getApp().globalData.account,
							   			token: getApp().globalData.token,
							   			device_num: this.device_inf.sDeviceNum,
										aponym: res.content
							   		},
							   		success:(res)=>{
							   			if(!res.data.startsWith("error"))
							   			{
							   				uni.showModal({
							   					   title:"成功",
							   					   content:"设备名已经成功修改！"
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
	
	.content {
		height: 100vh;
		width: 100vw;
		background: linear-gradient(110.6deg, rgb(179, 157, 219) 7%, rgb(150, 159, 222) 47.7%, rgb(24, 255, 255) 100.6%);

		display: flex;
		flex-direction: column;
	}
	.dev_inf {
		margin-top: 25rpx;
		width: 88%;
		height: 40px;
		display: flex;
		justify-content: left;
		align-items: center;
		flex-direction: row;
		margin-left: 6%;
	}
	.dev_con {
		margin-top: 25rpx;
		width: 88%;
		height: 350rpx;
		
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFFE6;
		flex-direction: column;
		margin-left: 6%;
		border-radius: 25rpx;
		box-shadow: 0px 0rpx 50rpx 5rpx #F2F2F2;
	}

	
	.dev_state {
		margin-top: 25rpx;
		width: 88%;
		margin-left: 6%;
		height: 700rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.sun {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 700rpx;
	}
	.nit {
		position: absolute;
		z-index: 2;
		font-size: 50rpx;
		font-weight: 800;
	}
	.temp {
		width: 100%;
		height: 150rpx;
		display: flex;
		flex-direction: row;
		text-align: center;
		justify-content: space-around;
	}
	.dev_tip {
		width: 30%;
		height: 150rpx;
		
		display: flex;
		justify-content: center;
		background-color: #FFFFFFE6;
		flex-direction: column;
		border-radius: 25rpx;
		box-shadow: 0px 0rpx 50rpx 5rpx #F2F2F2;
	}
	.lightslider {
		width: 85%;
	}
	.dev_con_i {
		flex-direction: row;
		display: flex;
		width: 90%;
	}
	
	.Aponym {

		font-size: 40rpx;
		color: black;
		text-align: left;
		font-weight: bold;
	}
	.nAponym {
		margin-left: 4%;
		margin-block-start: 15rpx;
		font-size: 25rpx;
		color: dimgray;
		text-align: left;
	}
	
</style>