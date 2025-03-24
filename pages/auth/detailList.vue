<template>
	<view class="check-container pt-16">

		<view class="detail-list bg_white ">

			
			<view class="detail-item  d-f w_100  jc-sb ai-c pl-32 pr-28" v-for="(item,index) in list" :key="index" @click="pageTo()">
				<view class="title">
					{{item.packageType}}
				</view>
				<view class="sub uni-success">
					认证成功

				</view>
			</view>
		</view>
		<view class="footer w_100 mt-48 fixed pb-20 safe-area-bottom" style="">
			<button class="custom-btn" type="" @click="handleScan">扫一扫</button>
			<button class="custom-btn mt-10" @click="handleFinish">结束初始认证</button>
		</view>
	</view>
</template>

<script setup>
	import permision from "@/common/permission.js"
	
import { ref, onMounted,getCurrentInstance } from 'vue';
import {
		onLoad
	} from "@dcloudio/uni-app";
	onLoad((option) => {
		let data = option;
		console.log(data)
	})
	const formData = ref({
		isCateCorrect: ''
	})
	const pageTo =()=>{
		uni.navigateTo({
			url: '/pages/auth/authError'
		})
	}
	const list = ref([
		{
			packageType: '顺丰#SFxnv00927',
			staus: 2
		}
	])
	
	// 扫一扫
	const handleScan = async () => {
		// #ifdef APP-PLUS
		let status = await checkPermission();
		if (status !== 1) {
			return;
		}
		// #endif
		uni.scanCode({
			success: (res) => {
				list.value.push({
					packageType: res.result,
					status: 1
				})
			},
			fail: (err) => {
				// 需要注意的是小程序扫码不需要申请相机权限
			}
		});
	}
	// #ifdef APP-PLUS

	const checkPermission = async (code) => {
		let status = permision.isIOS ? await permision.requestIOS('camera') :
			await permision.requestAndroid('android.permission.CAMERA');

		if (status === null || status === 1) {
			status = 1;
		} else {
			uni.showModal({
				content: "需要相机权限",
				confirmText: "设置",
				success: function(res) {
					if (res.confirm) {
						permision.gotoAppSetting();
					}
				}
			})
		}
		return status;
	}
	// #endif
	const handleFinish = ()=>{
		uni.navigateTo({
			url: '/pages/auth/authError?errorType=3'
		})
	}
</script>

<style lang="scss" scoped>
	page {}

	.check-container {}

	.detail-list {
		font-size: 32rpx;
		color: #0F182C;

		.detail-item {
			border-bottom: 2rpx solid #F6F7F8;
			height: 108rpx;
		}

	}
	.footer{
		
		padding-bottom: constant(safe-area-inset-bottom);/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
	}
</style>