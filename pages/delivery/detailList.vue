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
		<view class="w_100 mt-48">
			<button class="custom-btn">结束包装出库</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

	const formData = ref({
		isCateCorrect: ''
	})
	const changeCategory = (e) => {
		console.log(e)
		formData.value.isCateCorrect = e.detail.value
	}
	const changeQuantity = (e) => {
		console.log(e)
		formData.value.quantity = e.detail.value
	}
	const changeAmbiguity = (e) => {
		console.log(e)
		formData.value.quantity = e.detail.value
	}
</script>

<style lang="scss" scoped>
	page{
		
	}
	.check-container{
		
	}
	.detail-list{
		font-size: 32rpx;
		color: #0F182C;
		.detail-item{
			border-bottom: 2rpx solid #F6F7F8;
			height: 108rpx;
		}

	}
</style>