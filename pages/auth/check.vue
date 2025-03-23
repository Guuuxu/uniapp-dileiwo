<template>
	<view class="check-container">
		
		<view class="check-content bg_white ">

			<view class="check-info w_100 ta-c pb-48">
				<view class="title">
					顺丰#SFxnv00927
				</view>
				<view class="sub mt-16">
					<text class="color-subTitlle">数量：</text>
					<text class="num">50</text>
					
				</view>
			</view>
			<view class="mt-48 fs-32">
				<uni-forms class="check-form" :model="formData" label-position="top" label-width="250px">
							<uni-forms-item class="fs-32" label="1、请确认包装型号是否正确？" name="isCateCorrect">
								<radio-group class="" @change="changeCategory" @blur="(e)=>$refs.input.onFieldChange($event.detail.value)">
									<label class="radio"><radio value="1" />是</label>
									<label class="radio"><radio value="0" />否</label>
								</radio-group>
							</uni-forms-item>
							<uni-forms-item label="2、请确认包装数量是否正确？" name="quantity">
								<radio-group @change="changeQuantity" @blur="(e)=>$refs.input.onFieldChange($event.detail.value)">
									<label class="radio"><radio value="1" />是</label>
									<label class="radio"><radio value="0" />否</label>
								</radio-group>
							</uni-forms-item>
							<uni-forms-item required name="ambiguity" label="3、请确认是否有疑品包装？">
								<radio-group @change="changeAmbiguity" @blur="(e)=>$refs.input.onFieldChange($event.detail.value)">
									<label class="radio"><radio value="1" />是</label>
									<label class="radio"><radio value="0" />否</label>
								</radio-group>
							</uni-forms-item>
						</uni-forms>
			</view>
		</view>
		<view class="w_100 mt-48">
			<button class="custom-btn" @click="handleNext">下一步</button>
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
	
	// 下一步
	const handleNext = () =>{
		
	}
</script>

<style lang="scss" scoped>
	page{
		background: url('/static/image/bg-auth-check@2x.png') top no-repeat;
		background-size: contain;
	}
	.check-container{
		padding: 24rpx 32rpx;
	}
	.check-content{
		border-radius: 16rpx;
		padding: 48rpx 32rpx;
		font-size: 32rpx;
		color: #0F182C;
		.check-info{
			border-bottom: 2rpx solid #EAEAEA;
			.num{
				color: #99BBA0;
			}
		}
		.check-form{
			::v-deep{
				.uni-forms-item__label{
					font-size: 32rpx;
				}
			}
		}
	}
</style>