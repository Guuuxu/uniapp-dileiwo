// utils/request.js

// 默认配置
const defaults = {
  baseURL: 'https://api.example.com', // 基础路径
  timeout: 60000, // 超时时间（单位：ms）
  header: {
    'Content-Type': 'application/json', // 默认请求头
  },
};

// 请求拦截器
const requestInterceptor = (config) => {
  // 可在发送请求前处理配置（如添加 Token）
  const token = uni.getStorageSync('token');
  if (token) {
    config.header.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 响应拦截器
const responseInterceptor = (response) => {
  // 统一处理响应数据
  if (response.statusCode === 200) {
    return response.data;
  } else {
	  
    return Promise.reject(response);
  }
};

// 错误处理
const errorHandler = (error) => {
  let errMsg = '请求失败，请稍后重试'
    
    if (error.errMsg && error.errMsg.includes('timeout')) {
      errMsg = '请求超时，请检查网络连接'
    } else if (error.statusCode) {
      switch (error.statusCode) {
        case 401:
          errMsg = '未授权，请重新登录'
          // 可以在这里跳转到登录页
          uni.navigateTo({ url: '/pages/login/login' })
          break
        case 403:
          errMsg = '拒绝访问'
          break
        case 404:
          errMsg = '请求资源不存在'
          break
        case 500:
          errMsg = '服务器错误'
          break
        default:
          errMsg = `请求错误: ${error.statusCode}`
      }
    }
    
    // 显示错误提示
    uni.showToast({
      title: errMsg,
      icon: 'none',
      duration: 3000
    })
  return Promise.reject(error);
};

// 封装请求方法
const createRequest = (config) => {
  const mergedConfig = { ...defaults, ...config };

  return new Promise((resolve, reject) => {
    const task = uni.request({
      ...mergedConfig,
      success: (res) => {
        const processedResponse = responseInterceptor(res);
        resolve(processedResponse);
      },
      fail: (err) => {
        const processedError = errorHandler(err);
        reject(processedError);
      },
    });

    // 可在此保存 task 以便取消请求（类似 axios 的 CancelToken）
    if (mergedConfig.cancelToken) {
      mergedConfig.cancelToken.task = task;
    }
  });
};

// 封装 GET/POST 等方法
const http = {
  get: (url, data, config = {}) => {
    return createRequest({
      url,
      data,
      method: 'GET',
      ...config,
    });
  },
  post: (url, data, config = {}) => {
    return createRequest({
      url,
      data,
      method: 'POST',
      ...config,
    });
  },
  // 上传文件
    upload(url, filePath, name = 'file', formData = {}, options = {}) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: BASE_URL + url,
          filePath,
          name,
          formData,
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          },
          success: (res) => {
            if (res.statusCode === 200) {
              try {
                const data = JSON.parse(res.data)
                resolve(data)
              } catch (e) {
                resolve(res.data)
              }
            } else {
              reject(res)
            }
          },
          fail: (error) => {
            handleError(error)
            reject(error)
          },
          ...options
        })
      })
    }
  // 其他方法（PUT, DELETE等）类似
};

export default http;
