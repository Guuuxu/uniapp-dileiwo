<template>
	<view class="check-container pt-16">

		<view class="detail-list bg_white ">

			<view class="detail-item  d-f w_100  jc-sb ai-c pl-32 pr-28">
				<view class="title">
					DR5-0000000001
				</view>
				<view class="sub ">
					<text class="uni-error">6/5</text>
					<text class="color-subTitlle">(单月循环次数)</text>
				</view>
			</view>
			<view class="detail-item  d-f w_100  jc-sb ai-c pl-32 pr-28">
				<view class="title">
					DR5-0000000002
				</view>
				<view class="sub">
					<text class="">3/5</text>
					<text class="color-subTitlle">(单月循环次数)</text>

				</view>
			</view>
		</view>
		<view class="w_100 mt-48 fixed pb-20 safe-area-bottom">
			<button class="custom-btn" type="" @click="handleScan">扫一扫</button>
			<button class="custom-btn mt-10" @click="handleFinish">结束包装出库</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import permision from "@/common/permission.js"
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
			url: '/pages/delivery/deliveryError?errorType=2'
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
</style>