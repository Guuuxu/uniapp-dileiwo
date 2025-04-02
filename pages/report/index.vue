<template>
	<view class="report-wrap pt-16">
		<uni-card :is-shadow="false" is-full>
			<view class="form-item w_100 jc-sb">
				<view class="form-label">损坏申报编码</view>
				<view class="form-value pl-20" @click="handleScan">{{ code }}</view>
			</view>
			<!-- 损坏原因 -->
			<view class="form-item w_100 jc-sb">
				<view class="form-label">损坏原因</view>
				<view class="form-select pl-80 d-f ai-c" @click="handleShowPop">
					<text class="select-text">{{ reasonName }}</text>

					<uni-icons class="select-icon" type="right" size="14" color="#999999" />
				</view>
			</view>
		</uni-card>
		<uni-card :is-shadow="false" is-full class="mt-15">
			<!-- 图片上传区 -->
			<view class="upload-section">
				<text class="upload-title"><text class="uni-error">*</text>包装正面 (含编码)</text>
				<view class="upload-grid mt-15 d-f ai-c fxw-w">

					<view class="uni-uploader__file" v-for="(image,index) in imageList" :key="index">
						<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
					</view>
					<view class="upload-box" @click="handleUpload(1)">
						<uni-icons class="upload-icon" type="plusempty" size="20" color="#999999" />
					</view>
				</view>
			</view>
			<view class="upload-section mt-15">
				<text class="upload-title"><text class="uni-error">*</text>包装细节</text>
				<view class="upload-grid mt-15 d-f ai-c fxw-w">
					<!-- <uni-file-picker></uni-file-picker> -->
					<view class="uni-uploader__file" v-for="(image,index) in imageDetailList" :key="index">
						<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
					</view>
					<view class="upload-box" @click="handleUpload(2)">
						<uni-icons class="upload-icon" type="plusempty" size="20" color="#999999" />
					</view>
				</view>
			</view>
		</uni-card>
		<view class="submit-btn">
			<button class="custom-btn" @click="handleSubmit">提交申报</button>
		</view>
		<uni-popup ref="popup" type="bottom" title="请选择损坏原因" border-radius="10px 10px 0 0">
			<view class="reason-popup bg_white">
				<view class="title ta-c">
					请选择损坏原因
				</view>
				<uni-data-checkbox class="reason-checkbox" multiple v-model="reason" mode="list"
					:localdata="reasonOption" @change="change"></uni-data-checkbox>
				<view class="uni-textarea">
					<textarea placeholder-style="color:#A7B0BF" placeholder="请输入其他原因" />
				</view>
				<button class="custom-btn mt-48" @click="handleConfirm()">确 定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import permision from "@/common/permission.js"
	const code = ref('扫一扫')
	const handleScan = async () => {
		// #ifdef APP-PLUS
		let status = await checkPermission();
		if (status !== 1) {
			return;
		}
		// #endif
		uni.scanCode({
			success: (res) => {
				console.log(res.result)
				code.value = res.result
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

	const reasonOption = ref([{
			text: '外观破损',
			value: '1'
		},
		{
			text: '内层破损',
			value: '2'
		},
		{
			text: '表面割裂',
			value: '3'
		},
		{
			text: '拉链损坏',
			value: '4'
		},
		{
			text: '恶意涂鸦',
			value: '5'
		},
		{
			text: '拼接块脱落',
			value: '6'
		},
		{
			text: '其他',
			value: '7'
		},
	])
	const popup = ref(null)
	const reason = []
	const reasonName = ref('请选择')
	const handleShowPop = () => {
		popup.value.open()
	}
	const tempReason = ref('')
	const change = (e) => {
		console.log('e:', e);
		reason.value = e.detail?.value
		tempReason.value = e.detail?.data.map(item => item.text).toString() || ''
	}
	// 上传图片
	const imageList = ref([])
	const imageDetailList = ref([]) //包装细节
	const sourceTypeIndex = 2
	const sourceType = ['拍照', '相册', '拍照或相册']
	const handleUpload = async (index) => {
		// #ifdef APP-PLUS
		// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
		if (sourceTypeIndex !== 2) {
			let status = await checkPermission();
			if (status !== 1) {
				return;
			}
		}
		// #endif
		uni.chooseImage({
			// sourceType: sourceType[sourceTypeIndex],
			// sizeType: sizeType[this.sizeTypeIndex],
			count: 9,
			success: (res) => {
				console.log('chooseImage', res.tempFilePaths)
				if (index === 1) {
					imageList.value = imageList.value.concat(res.tempFilePaths);
				} else {
					imageDetailList.value = imageDetailList.value.concat(res.tempFilePaths);
				}

			},
			fail: (err) => {
				console.log("err: ", err);
				// #ifdef APP-PLUS
				if (err['code'] && err.code !== 0 && sourceTypeIndex === 2) {
					console.log("checkPermission", err.code)
					checkPermission(err.code);
				}
				// #endif
				// #ifdef MP
				if (err.errMsg.indexOf('cancel') !== '-1') {
					return;
				}
				uni.getSetting({
					success: (res) => {
						let authStatus = false;
						switch (sourceTypeIndex) {
							case 0:
								authStatus = res.authSetting['scope.camera'];
								break;
							case 1:
								authStatus = res.authSetting['scope.album'];
								break;
							case 2:
								authStatus = res.authSetting['scope.album'] && res
									.authSetting['scope.camera'];
								break;
							default:
								break;
						}
						if (!authStatus) {
							uni.showModal({
								title: '授权失败',
								content: '迪雷沃需要从您的相机或相册获取图片，请在设置界面打开相关权限',
								success: (res) => {
									if (res.confirm) {
										uni.openSetting()
									}
								}
							})
						}
					}
				})
				// #endif
			}
		})
	}
	const previewImage = (e) => {
		var current = e.target.dataset.src
		uni.previewImage({
			current: current,
			urls: imageList.value
		})
	}
	const handleConfirm = () => {
		console.log(reason)
		reasonName.value = tempReason.value
		popup.value.close()
	}

	const handleSubmit = () => {
		uni.navigateTo({
			url: '/pages/report/reportSuccess'
		})
		reason.value = ''
		reasonName.value = '请选择'
		tempReason.value = ''
		imageList.value = []
		imageDetailList.value = []
		code.value = '扫一扫'
	}
</script>

<style lang="scss" scoped>
	.form-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 88rpx;

		.form-label {
			width: 200rpx;
		}
		.form-value{
			max-width: 480rpx;
			word-wrap: wrap;
			word-break: break-all;
		}
		.select-text {
			color: #45464A;
		}
	}

	.upload-grid {
		gap: 6px;

		.uni-uploader__file {
			width: 160rpx;
			height: 160rpx;
			margin: 0;

			image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
				object-fit: cover;
			}
		}
	}

	.upload-box {
		width: 160rpx;
		height: 160rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.reason-popup {
		border-radius: 16rpx 16rpx 0rpx 0rpx;
		padding: 0 32rpx 40rpx;

		.title {
			height: 108rpx;
			line-height: 108rpx;
		}

		::v-deep {
			.uni-data-checklist .checklist-group .checklist-box.is--list.is-list-border {
				border-top: none;
			}

			.checklist-content {
				margin-left: 10rpx;
			}
		}

		.uni-textarea {
			background-color: #F6F7F8;
		}
	}

	.submit-btn {
		position: fixed;
		bottom: 44rpx;
		width: 100%;

	}
</style>