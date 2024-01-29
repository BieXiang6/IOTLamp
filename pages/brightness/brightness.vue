<template>
	<view class="content">

		<div class="dev_inf">
			<text class="Aponym">{{device_inf.sAponym}}</text>
			<text class="nAponym">{{device_inf.sDeviceNum}}</text>
			<text class="nAponym">{{device_inf.sModel}}</text>
		</div>
		<div class="dev_state">
			<svg width="0" height="0" style="position:absolute;z-index:-1;">
			    <defs>
			        <filter id="colorize">
						<feColorMatrix type="matrix"
							v-bind:values="lighti" />
			        </filter>
			    </defs>
			</svg>
			<div class="sun">
				<image src="../../static/light2.png" mode="widthFix" class="light"></image>
				<text class="nit">1111</text>
			</div>
			<div class="temp">
				<div class="dev_tip">
					<text>温湿度</text>
					<text>5℃/50%</text>
				</div>
				<div class="dev_tip">
					<text>案前当前</text>
					<text>{{isPerson}}</text>
				</div>
				<div class="dev_tip">
					<text>案前目前</text>
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
					block-size="20"></slider>
			</div>
			<div class="dev_con_i">
				<text style="width: 15%;">色调:</text>
				<slider class="lightslider"
					v-bind:value="lightStyle"
					background-color="rgb(255, 198, 107)"
					activeColor="#FFFFEE"
					block-color="rgb(255, 198, 107)"
					block-size="20"></slider>
			</div>
			<div class="dev_con_i">
				<button>关灯</button>
			</div>
		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				device_inf:{
					sDeviceNum: "testnum",
					sAponym: "我的台灯",
					sModel: "000"
				},
				lighti:"5 0 0 0 0\n0 8 0 0 0\n0 0 4 0 0\n0 0 0 1 0",
				lightValue:55,
				lightStyle:45,
				isPerson:"无人"
			};
		},
		onLoad() {
			
		},
		methods: {
	
		},
	};
</script>

<style>
	
	.content {
		height: 93.33vh;
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
	.light {
		z-index: 1;
		position: relative;
		
		max-width: 80%;
		filter: url(#colorize);
	}
	.sun {
		display: flex;
		justify-content: center;
		align-items: center;
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