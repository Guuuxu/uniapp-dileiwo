<template>
	<view class="home-container">
		<view class="header pl-32 pr-32 ">
			<view class="fs-28">
				云耕智能科技有限公司
			</view>
			<view class="oprater color-subTitlle fs-24 mt-4">
				操作员：陈子敏
			</view>
			<view class="welcom ta-c fs-64 mt-38">
				欢迎来到迪雷沃
			</view>
			<view class="tip2 ta-c mt-26 fs-28">
				统一包装编码 | 规格标准化 | 循坏包装
			</view>
		</view>
		<view class="content">
			<view class="content-item d-f bg_white ai-c pl-48 pr-32 mb-32" @click="pageTo('/pages/auth/index')">
				<image class="home-icon" src="/static/image/home-auth@2x.png" mode="aspectFit"></image>
				<view class="flex-1 ml-48">
					<view class="fs-36">
						初始认证
					</view>
					<view class="fs-28 color-subTitlle mt-8">新包装编码、外观等验收入库</view>
				</view>
				<image class="arrow" src="/static/image/home-arrow@2x.png" mode=""></image>
			</view>
			<view class="content-item d-f bg_white ai-c pl-48 pr-32 mb-32" @click="pageTo('/pages/auth/index')">
				<image class="home-icon" src="/static/image/home-delivery@2x.png" mode="aspectFit"></image>
				<view class="flex-1 ml-48">
					<view class="fs-36">
						包装出库
					</view>
					<view class="fs-28 color-subTitlle mt-8">出库导入包装编码</view>
				</view>
				<image class="arrow" src="/static/image/home-arrow@2x.png" mode=""></image>
			</view>
			<view class="content-item d-f bg_white ai-c pl-48 pr-32 mb-32">
				<image class="home-icon" src="/static/image/home-search@2x.png" mode="aspectFit"></image>
				<view class="flex-1 ml-48">
					<view class="fs-36">
						回收复查
					</view>
					<view class="fs-28 color-subTitlle mt-8">收到返还包装验收入库</view>
				</view>
				<image class="arrow" src="/static/image/home-arrow@2x.png" mode=""></image>
			</view>
			<view class="content-item d-f bg_white ai-c pl-48 pr-32 ">
				<image class="home-icon" src="/static/image/home-damage@2x.png" mode="aspectFit"></image>
				<view class="flex-1 ml-48">
					<view class="fs-36">
						损坏申报
					</view>
					<view class="fs-28 color-subTitlle mt-8">包装有严重损坏，请及时申报</view>
				</view>
				<image class="arrow" src="/static/image/home-arrow@2x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>


<script setup>
	const pageTo = (url) =>{
		uni.switchTab({
			url:url
		})
	}
</script>

<style lang="scss" scoped>

	.home-container{
		height: 100% !important;
		padding-top: var(--status-bar-height) ;	
		background: url('/static/image/bg-home-head@2x.png') top no-repeat;

			background-size: 750rpx 480rpx;
		.header{
			height: 324rpx;
			.welcom{
				color: #0F182C;
			}
			.tip2{
				color: #45464A;
			}
		}
		.content{
			background: url('/static/image/bg-home-content@2x.png');
			background-size: cover;
			padding: 64rpx 32rpx 0;
			color: #0F182C;
			.content-item{
				height: 194rpx;
				border-radius: 16rpx;
				.home-icon{
					width: 80rpx;
					height: 80rpx;
				}
				.arrow{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>