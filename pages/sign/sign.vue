<template>
  <div style="width: 80%;margin-top:25%;margin-left: 18%;">
    <h2 style="width: 100%;;margin-bottom: 10%;">Login(regester)</h2>
	<form @submit.prevent="login" >
      <label for="username">Username:</label>
      <input class="in" type="text" id="username" v-model="username" required>
      
      <label for="password">Password:</label>
      <input class="in" type="password" id="password" v-model="password" required>
      
      <button class="sub" type="submit" @click="login">Login</button>
	</form>
  </div>
</template>

<script>
export const MQTT = require('@/utils/paho-mqtt.js');
var app = getApp();
export default {

  data() {
    return {
      username: 'a123',
      password: '123456',
    };
  },
  // onLoad() {
  // 	const eventChannel = this.getOpenerEventChannel();
  // 	eventChannel.on('acceptDataFromchoosePage', (data) => {
  // 			 alert(data.data)
  // 	});

  // },
  methods: {
    login() {
      // 替换成你的服务器IP和端口
		var serverIP = app.globalData.ip;
		var serverPort = app.globalData.port;
		uni.request({
			url:"http://" + serverIP + ":" + serverPort + '/logind',
			data:{
				account:this.username,
				password:this.password
			},
			success: (res)=>{
			        if (!res.data.startsWith('error'))
					{
						app.globalData.account = this.username;
						app.globalData.password = this.password;
						app.globalData.token = res.data;
						app.globalData.client = new MQTT.Client(app.globalData.ip, app.globalData.mqttPort, "/mqtt", app.globalData.account);
						app.globalData.client.connect({
							userName: app.globalData.account,
							password: app.globalData.password,
						});
						
						this.jumptoChoosedevice();
					}
					else
					{
						uni.showModal({
							   title:"错误",
							   content:res.errMsg
						  });
					}
			    },
			fail:(error)=>{
				uni.showModal({
					   title:"错误",
					   content:error.data
				  });
			}
		})

    },
	jumptoChoosedevice(){
		
		uni.getStorage({
			key: "newDevices",
			success: (res) => {
				let temp = res.data.split('|');
				uni.request({
					url:"http://" + this.serverIP + ":" + this.serverPort + '/add_device',
					data: {
							account: this.account,
							device_num: temp[1],
							device_name: temp[2],
							device_model: temp[3],
							token: this.token
					},
					complete:()=>{
						uni.removeStorage({
							key: "newDevices"
						});
						uni.navigateTo({
							url:'/pages/choosedevice/choosedevice'
						});
					}
					
				});
				
			},
			fail: () => {
				uni.navigateTo({
					url:'/pages/choosedevice/choosedevice'
				});
			}
		});
		
	}
  },
};
</script>

<style scoped>
/* 在这里添加样式 */
.in{
		width: 80%;
		height: 30px;
		/* margin-left: 5%; */
		margin-top: 5%;
		border: 1px solid black;
		background-color: aliceblue;
		border-radius: 10px;
	},
	.sub{
		width: 80%;
		margin-left: 0;
		margin-top: 10%;
		border: 1px solid black;
		border-radius: 10px;
	}
</style>
