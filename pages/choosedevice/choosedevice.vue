
<template>
  <view style="background-color: #f5f5f5;">
    <div class="hh" style="position: fixed;top: 6.6%; width: 100%;background-color: #fff;">
      <div style="display: flex; flex-direction: row; height: 50px; font-size: 30px; margin-bottom: 10px;">
        <text style="line-height: 50px;">我的家</text>
        <button class="add" @click="jumptowifi">添加设备</button>
      </div>
    </div>
    <div ref="list" style="width: 100%; height: 600px; margin-top: 65px;">
      <!-- 其他内容 -->
    </div>
  </view>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import router from 'vue-router';
export default {
  data() {
    return {
      deviceStyle: {
        width: '95%',
        height: '80px',
        fontSize: '30px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        // paddingTop: '20px',
		marginLeft:'2.5%',
        marginBottom: '2%',
		borderRadius:'5px',
      },
	  token:'null',
	  account:'null',
	  ip:'127.0.0.1',
	  port:8500,
	  devices:0
    };
  },
  onLoad() {
	  this.token = getApp().globalData.token;
	  this.account = getApp().globalData.account;
	  this.port = getApp().globalData.port;
	  this.ip = getApp().globalData.ip;
	  axios.get("http://" + this.ip + ":" + this.port + '/obtain_device?account='+this.account)
	    .then(response => {
	  		this.devices = response.data;
			let len = this.devices.length;
			for (let i=0;i<len;i++){
				this.createDynamicElement(this.devices[i],i);
			}
	    })
	    .catch(error => {
	      // 处理登录失败的逻辑
	    });
  },
  methods: {
    jumptowifi(){
    	// this.login();
    	uni.navigateTo({
    		url:'/pages/wifi/wifi',
    	})
    },
	createDynamicElement(esp,i) {
	    const dynamicComponent = Vue.extend({
	      render: (h) => h('div', { class: 'device' }, [
	        h('button', {
	          attrs: { id: esp.sDeviceNum },
	          style: this.deviceStyle,
	          on: { click: () => this.navigateToBrightness(i) },
	        }, esp.sAponym),
	      ]),
	    });
	    const dynamicInstance = new dynamicComponent().$mount();
	    this.$nextTick(() => {
	      this.$refs.list.appendChild(dynamicInstance.$el);
	    });
	  },
	   navigateToBrightness(i){
	        const listItemID = this.devices[i];
	        uni.navigateTo({
	          url: `/pages/brightness/brightness?id=${listItemID}`,
	        });
	      },
    }, 
};
</script>
<style>
	.add{
		height: 100%;
		border: 1px solid black;
		border-radius: 10px;
/* 		font-size: 20px; */
		margin-right: 0;	
	},
	.device{
		width: 90%;
		height: 80px;
		fontSize: 30px;
		margin: auto;
		background-color: azure;
		border: 1px solid black;
		textAlign: center;
		marginBottom: 2px;
		border-radius: 10%;
	}
</style>
