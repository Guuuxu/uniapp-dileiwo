import http from '@/utils/request.js';

// GET 请求
http.get('/api/user', { id: 123 })
  .then(data => {
    console.log('获取用户数据成功', data)
  })
  .catch(error => {
    console.error('获取用户数据失败', error)
  })

// POST 请求
http.post('/api/login', { username: 'admin', password: '123456' })
  .then(data => {
    console.log('登录成功', data)
  })
  .catch(error => {
    console.error('登录失败', error)
  })

// 上传文件
http.upload('/api/upload', filePath, 'avatar', { userId: 123 })
  .then(data => {
    console.log('上传成功', data)
  })
  .catch(error => {
    console.error('上传失败', error)
  })