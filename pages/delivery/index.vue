<template>
	<view class="auth-container">
		<scroll-view>
			<view class="auth-item d-f ai-c mt-16" @click="goDetail">
				<view class="left w-80 h-80 uni-white d-f ai-c jc-c uni-bold fs-40">
					01
				</view>
				<view class="middle flex-1 ml-24">
					<view class="title">
						星辰智联科技有限公司
					</view>
					<view class="sub color-subTitlle mt-8">
						20205.03.15 10:30
						
					</view>
				</view>
				<image class="arrow" src="/static/image/home-arrow@2x.png" mode=""></image>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

	const list = ref({})
	const goDetail = () => {
		uni.navigateTo({
			url: '/pages/delivery/detailList'
		})
	}
</script>

<style lang="scss" scoped>
	.auth-item{
		height: 156rpx;
		padding: 0 32rpx;
		background: #FFFFFF;
		.left{
			border-radius: 8rpx;
			background-color: #99BBA0;
		}
		.num{
			color: #45464A;
		}
		.arrow{
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>