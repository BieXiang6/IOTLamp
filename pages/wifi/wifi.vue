<template>
  <div style="width: 80%;margin-top:30%;margin-left: 18%;">
    
    <div style="margin-top: 15%;">
	  <button @click="jumptochoose" style="width: 80%;margin-left: 0;border: 1px solid black;border-radius: 10px;">开始配网</button>

  </div>
  </div>
</template>

<script>

const _TCPSocket = uni.requireNativePlugin("zad-socket-tcp");
export default {
  onLoad() {
		this.serverIP = getApp().globalData.ip;
		this.serverPort = getApp().globalData.port;
		this.account = getApp().globalData.account;
		this.token = getApp().globalData.token;
	},
  data() {
    return {
      serverIP:"127.0.0.1",
	  serverPort:6500,
	  account:"123",
	  token:"00.00"
    };
  },
  methods: {
	jumptochoose(){
		uni.showToast({
		 		title:"按下"
		 	})
		
			_TCPSocket.event({
			        method: "connect",
			        param: { ip: '192.168.4.1', port: 5050 }
			    }, e => {
			        this.handleMessage(e)
			    });
			setTimeout(()=>{
				_TCPSocket.event({
					method: "send",
					param: { message : "a123$zj#BIEXIANG$zj#gq754336" }
				});
			}, 2000);
			// uni.navigateTo({
			// 	url: "/pages/choosedevice/choosedevice",
			// 	success: (res) => {
			// 		alert(this.responseMessage)
			// 	  getApp().globalData.esp.push(this.responseMessage)
			// 	  alert(getApp().globalData.esp)
			// 	},
			// })  
			
			
	},
	handleMessage(e)
	{
		if (e.method == 'receive') {
			let tempStr = e.data;

		    if (tempStr.startsWith("success"))
			{
				let temp = tempStr.split('|');
				setTimeout(()=>{
					uni.request({
						url:"http://" + this.serverIP + ":" + this.serverPort + '/add_device',
						data: {
								account: this.account,
								device_num: temp[1],
								device_name: temp[2],
								device_model: temp[3],
								token: this.token
						},
						success:(response)=>{
							if (!response.data.startsWith('error'))
								uni.showToast({
									title:"新设备添加完成。"
								});
							else
								uni.showModal({
									title:"错误",
									content:response.data
								});
						},
						fail: (error)=>{
							uni.setStorage({
								key: "newDevices",
								data: tempStr,
								success: ()=>{
									uni.showModal({
										title: "通知",
										content: "新设备添加完成，请重启app。"
									})
								}
							})
						}
					});
				},3000);
				
			}
		}
	}
  }
}
</script>
<style>
	.in{
		width: 80%;
		height: 30px;
		margin-top: 5%;
		border: 1px solid black;
		background-color: aliceblue;
		border-radius: 10px;
	}
</style>