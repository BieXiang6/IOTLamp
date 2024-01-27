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
import axios from 'axios'

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
      const serverIP = '47.101.42.39';
      const serverPort = 8500;
		getApp().globalData.ip = serverIP;
		getApp().globalData.port = serverPort;
      // 发送登录请求
      axios.get("http://" + serverIP+":"+serverPort+'/logind?account='+this.username+'&password='+this.password)
        .then(response => {
          // 处理登录成功的逻辑
			if (!response.data.startsWith('error'))
				this.jumptoChoosedevice(response.data);
			else
				alert(response.data);
    
          // 在这里处理获取的数据，可以将其保存到组件的数据属性中，例如：
          // this.userData = response.data;
        })
        .catch(error => {
          // 处理登录失败的逻辑
		  uni.showModal({
			  title:"ee",
			  content:error.data
		  });
        });
    },
	jumptoChoosedevice(token){
		// this.login();
		uni.navigateTo({
			url:'/pages/choosedevice/choosedevice',
			success: (res) => {
			          // res.eventChannel.emit('acceptDataFromsignPage', { phone:this.username });
					getApp().globalData.account = this.username;
					getApp().globalData.token = token;
					alert('phone:'+getApp().globalData.account);
					},
		})
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
