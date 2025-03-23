<template>
	<view class="auth-error-container ">
		<view class="content" v-if="errorType == 1">
			<image class="error-image" src="/static/image/delivery-error-1@2x.png" mode=""></image>
			<text class="error-title fs-36 mt-36">未完成初始认证</text>
			<text class="error-desc fs-28 color-subTitlle">DR5-0000000002，请进行确认</text>
			<button class="custom-btn verify-btn">确认</button>
		</view>
		<view class="content" v-else-if="errorType == 2">
			<image class="error-image" src="/static/image/delivery-succes-1@2x.png" mode=""></image>
			<text class="error-title fs-36 mt-36">出库完成！</text>
			<button class="custom-btn verify-btn">继续包装出库</button>
		</view>
		<view class="pt-34 pl-32 pr-32" v-else>
			<view class="fs-36">
				超出单月使用量，请选择
			</view>
			<view class="mt-16 color-subTitlle fs-28">
				DR5-0000000002，此包装超出单月使用次数,
				请更换包装使用
			</view>
			<view class="option-card mb-32  mt-48" :class="{ 'active' : active == 1}" @click="handleChange(1)">
				<text class="card-text">继续使用此包装</text>
			</view>
			<view class="option-card mb-32 " :class="{ 'active' : active == 2 }" @click="handleChange(2)">
				<text class="card-text">更换其他包装</text>
			</view>
			<view class="option-card"  :class="{ 'active' : active == 3 }" @click="handleChange(3)">
				<text class="card-text">取消使用次包装</text>
			</view>
			<button class="custom-btn mt-80">确认</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const errorType = ref(2)
	const active = ref(1)
	const handleChange = (type) =>{
		active.value = type
		
	}
</script>

<style lang="scss">
	page {
		height: 100% !important;
	}

	.auth-error-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 32rpx;
	}

	.error-image {
		width: 240rpx;
		height: 240rpx;
	}

	.error-title {
		margin-bottom: 16rpx;
		font-weight: 500;
	}

	.error-desc {
		text-align: center;
		line-height: 1.5;
	}

	.verify-btn {
		margin-top: 310rpx;
	}
	.option-card{
		margin: 0;
		height: 108rpx;
		line-height: 108rpx;
		padding: 0 32rpx;
		font-size: 32rpx;
		border-radius: 16rpx;
		border: 2rpx solid #EAEAEA;
		&.active{
			border-color: #99BBA0;
		}
	}
</style>