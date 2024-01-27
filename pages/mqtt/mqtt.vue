<template>
	<div><button @click="al()">hhh</button></div>
</template>

<script>
import { subscribe } from "diagnostics_channel";
import "../new_file.js"
export default {
		data() {
			return {
				a:{},
				client:null,
				page:0,
				subscription: {
				        qos: 0,
				      },
				publish: {
				        topic: "topic/esp1",
				        qos: 0,
				        payload: '{ "msg": "Hello, I am browser." }',
				      },
				connection: {
							timeout: number,
				            userName: "mqttfx",
				            password: "123456",
				            willMessage: Paho.MQTT.Message,
				            keepAliveInterval: 60,
				            cleanSession: true,
				            useSSL: false,
				            // invocationContext: any;
				            // onSuccess: Function;
				      },
			}
		},
		mounted() {
		    // 创建 MQTT 客户端实例
		    this.client = new Paho.MQTT.Client("ws://47.101.42.39:8083/mqtt", "aaaa",);		
			
		    // 设置连接回调
		    this.client.onConnectionLost = this.onConnectionLost;
		    this.client.onMessageArrived = this.onMessageArrived;
			
		    // 连接到 MQTT 代理
		    this.client.connect(this.connection);
		  },
		methods: {
			onConnect() {
				
			      console.log("Connected to MQTT broker");
			      
				  
			    },
			onConnectionLost(responseObject) {
			      if (responseObject.errorCode !== 0) {
			        console.log("Connection lost:", responseObject.errorMessage);
			      }
			    },
			onMessageArrived(message) {
			      console.log("Message arrived:",message.payloadString);
				  this.a=JSON.parse(message.payloadString)
				  alert(this.a.msg)
			    }	
			,al(){
				// this.client.subscribe("topic/phone");
				alert("111");
				this.client.publish(this.publish.topic,this.publish.payload,this.publish.qos,false)
			}
		}
	}

</script>
