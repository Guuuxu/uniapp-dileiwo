<template>
	<view class="auth-container">
		<scroll-view>
			<view class="auth-item d-f ai-c mt-16" @click="goCheck">
				<view class="left w-80 h-80 uni-white d-f ai-c jc-c uni-bold fs-40">
					T1
				</view>
				<view class="middle flex-1 ml-24">
					<view class="title">
						顺丰#SFxnv00927
					</view>
					<view class="sub">
						<text class="color-subTitlle">数量：</text>
						<text class="num">50</text>
						
					</view>
				</view>
				<image class="arrow" src="/static/image/home-arrow@2x.png" mode=""></image>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	const goCheck = () => {
		uni.navigateTo({
			url: '/pages/auth/check?',
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