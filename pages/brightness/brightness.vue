<template>



	<view class="">
		<div>
			<img :style="{ filter: 'brightness(' + currentValue + '%)' }" src="static/light.png" alt="Your Image"
				style="position: absolute;left: 22%;width: 200px;height: auto;top: 0px;">
			<div class="slider-container">
				<div class="slider" :style="{ width: sliderWidth + 'px' }" ref="slider" @touchstart="onTouchStart"
					@touchmove="onTouchMove" @touchend="onTouchEnd">
					<div class="knob" :style="{ left: knobPosition + 'px' }"></div>
				</div>
				<div class="value-display">
					<span>Value: {{ currentValue }}</span>
					<span>Min: {{ minValue }}</span>
					<span>Max: {{ maxValue }}</span>
				</div>
			</div>
		</div>
		<img :src="getImageSource()" alt="开关图片显示错误" @click="toggleImage();" class="img" />
<!-- <button @click="publishtoesp()">hh</button> -->
		<div style="display: flex;flex-direction: column;position: absolute;left: 10%;top: 40%;">
			<div style="font-size: 30px;margin-bottom: 10px;">
				<img src="static/tem.png" alt="" class="one" />
				<span>当前环境温度：<span>{{tem}}</span></span>
			</div>
			<div style="font-size: 30px;">
				<img src="static/wet.png" alt="" class="one" />
				<span>当前环境湿度：<span>{{wet}}</span></span>
			</div>
		</div>
	</view>
</template>

<script>
	import "../new_file.js"
	import vue from "vue"
	import router from "vue-router"
	export default {
		data() {
			return {
				isDragging: false,
				startX: 0,
				knobPosition: 0,
				sliderWidth: 200,
				minValue: 0,
				maxValue: 100,
				a:0,
				
				humun:0,
				esp:0,
				currentValue: 0,
				tem: 0,
				wet: 0,
				client: null,
				// page: 0,
				subscription: {
					qos: 0,
				},
				publish: {
					topic: "topic/",
					// topic: "topic/hh",
					qos: 0,
					payload: '{ "msg": "Hello, I am browser." }',
				},
				connection: {
					timeout: 60,
					userName: "mqttfx",
					password: "123456",
					// willMessage: Paho.MQTT.Message,
					keepAliveInterval: 60,
					cleanSession: true,
					useSSL: false,
					mqttVersion:4,
					onSuccess:()=> {
						alert("Connected to MQTT broker");

						this.subscribephone()
						this.publishtoesp()
						// 测试了一下显示不能连接，
						// if (this.client.connected) {
						// 	alert("发布")
						//     this.publishtoesp();
						// 	alert("订阅")
						// 	this.subscribephone()
						//   } else {
						// 	alert("MQTT客户端未连接");
						//   }
						},
				},
			};
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.esp=option.id
				// alert(this.esp)//打印出上个页面传递的参数。
			},
		mounted() {
			// 创建 MQTT 客户端实例
			this.client = new Paho.MQTT.Client("ws://47.101.42.39:8083/mqtt", "aaaa", );
			// 设置连接回调
			this.client.onConnectionLost = this.onConnectionLost;
			this.client.onMessageArrived = this.onMessageArrived;
			// 连接到 MQTT 代理
			this.client.connect(this.connection);
		},
		methods: {
			onTouchStart(event) {
				this.isDragging = true;
				this.startX = event.touches[0].clientX - this.knobPosition;
			},
			onTouchMove(event) {
				if (this.isDragging) {
					const newX = event.touches[0].clientX - this.startX;
					const maxX = this.sliderWidth - 20;
					this.knobPosition = Math.max(0, Math.min(newX, maxX));

					// 根据拖动块位置计算当前值
					this.currentValue = Math.round((this.knobPosition / maxX) * (this.maxValue - this.minValue) + this
						.minValue);
				}
			},
			
			//控制开关的三个函数
			onTouchEnd() {
				this.isDragging = false;
			},
			toggleImage() {
				this.a = 1 - this.a; // Toggle between 0 and 1
			},
			getImageSource() {
				return this.a == 1 ? 'static/img1.png' : 'static/img.png';
			},
			
			
			// onConnect() {
			// 	alert("Connected to MQTT broker");
			// 	if (this.client.connected) {
			// 		// alert("发布")
			// 		//    this.publishtoesp();
			// 	 alert('连接')
			// 	 this.subscribephone()
			// 	  } else {
			// 	    alert("MQTT客户端未连接");
			// 	  }
			// },
			onConnectionLost(responseObject) {
				if (responseObject.errorCode !== 0) {
					console.log("Connection lost:", responseObject.errorMessage);
				}
			},
			onMessageArrived(message) {
				console.log("Message arrived:", message.payloadString);
				this.a1 = JSON.parse(message.payloadString)
				alert(this.a1.msg)
				this.wet=a1.wet
				this.tem=a1.tem
				this.humen=a1.humen
				this.currentValue=a1.currentValue
				this.a=a1.a
			},
			publishtoesp() {
				alert("进行发布");
				this.publish.payload=JSON.stringify({
					wet:this.wet,
					tem:this.tem,
					humen:this.humen,
					currentValue:this.currentValue,
					a:this.a//开关
				})
				this.publish.topic=this.publish.topic+this.esp
				alert(this.publish.topic)
				alert(this.publish.payload)
				this.client.send(this.publish.topic+this.esp, this.publish.payload, this.publish.qos, true)
			},
			subscribephone(){
				alert("订阅")
				alert(getApp().globalData.phone)
				alert("topic/"+getApp().globalData.phone)
				this.client.subscribe("topic/"+getApp().globalData.phone);
			}
		},
	};
</script>

<style>
	/* 样式可以根据您的需求自行调整 */
	.slider-container {
		position: absolute;
		top: 30%;
		left: 22%;
	}

	.slider {
		margin-top: 10px;
		position: relative;
		height: 20px;
		background-color: #ccc;
		border-radius: 10px;
		overflow: hidden;
	}

	.knob {
		position: absolute;
		top: 0;
		width: 20px;
		height: 20px;
		background-color: #ff0000;
		border-radius: 50%;
		cursor: pointer;
	}

	.value-display {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.img {
		position: fixed;
		bottom: 10%;
		left: 25%;
		width: 50%;
		height: auto;
	}

	.one {
		width: 40px;
		height: auto;
	}
</style>