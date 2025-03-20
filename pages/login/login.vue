
<template>
  <view class="login-container">
    <view class="login-content">
      <view class="login-title">登录迪雷沃</view>
      <view class="login-subtitle">请输入您的手机号码</view>
      <view class="input-box">
        <uni-easyinput
          v-model="phone"
          placeholder="请输入手机号"
          :styles="{ backgroundColor: '#F5F7FA' }"
          @input="handlePhoneInput"
        />
      </view>

      <view class="verify-box">
        <uni-easyinput
          v-model="verifyCode"
          placeholder="请输入验证码"
          :styles="{ backgroundColor: '#F5F7FA' }"
        />
      </view>

      <button 
        class="verify-btn"
        :disabled="!isPhoneValid || counting > 0"
        @click="handleSendCode"
      >
        {{ counting > 0 ? `${counting}秒后重试` : '获取验证码' }}
      </button>

      <view class="agreement">
        <checkbox-group @change="handleCheckboxChange">
          <label class="agreement-label">
            <checkbox :checked="isAgree" color="#8DB6CD" style="transform:scale(0.7)" />
            <text class="agreement-text">我已阅读并同意</text>
            <text class="agreement-link" @click="handleAgreement">《用户协议》</text>
          </label>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const phone = ref('');
const verifyCode = ref('');
const isAgree = ref(false);
const counting = ref(0);
const isPhoneValid = ref(false);

const handlePhoneInput = (value: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  isPhoneValid.value = phoneRegex.test(value);
};

const handleSendCode = () => {
  if (!isPhoneValid.value || counting.value > 0) return;
  
  counting.value = 60;
  const timer = setInterval(() => {
    counting.value--;
    if (counting.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const handleCheckboxChange = (e: any) => {
  isAgree.value = e.detail.value.length > 0;
};

const handleAgreement = () => {
  uni.showToast({
    title: '查看用户协议',
    icon: 'none'
  });
};
</script>

<style lang="scss">

.login-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient( 180deg, #8CCA97 0%, rgba(255,255,255,0) 100%);
}

.login-content {
  width: 100%;
  padding: 0 60rpx;
  margin-top: 160rpx;
}

.login-title {
  font-size: 32px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 20rpx;
}

.login-subtitle {
  font-size: 14px;
  color: #999999;
  margin-bottom: 60rpx;
}

.input-box {
  margin-bottom: 30rpx;
}

.verify-box {
  margin-bottom: 30rpx;
}

.verify-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #8DB6CD;
  color: #FFFFFF;
  font-size: 16px;
  border-radius: 44rpx;
  border: none;
}

.verify-btn[disabled] {
  background-color: #CCCCCC;
  color: #FFFFFF;
}

.agreement {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
}

.agreement-label {
  display: flex;
  align-items: center;
}

.agreement-text {
  font-size: 12px;
  color: #999999;
}

.agreement-link {
  font-size: 12px;
  color: #8DB6CD;
}
</style>

