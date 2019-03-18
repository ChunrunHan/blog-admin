import request from '@/plugin/axios'

// 用户登录接口
export function AccountLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取验证码接口
export function getCaptcha () {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

// 获取七牛上传的token
export function uploadToken () {
  return request({
    url: '/uploadToken',
    method: 'get'
  })
}

// 七牛删除文件接口
export function qiniuDel (key) {
  return request({
    url: `/qiniuDel`,
    method: 'post',
    data: {
      key
    }
  })
}
