import request from '@/plugin/axios'

// 用户登录接口
export function AccountLogin (data) {
  return request({
    url: '/blog/login',
    method: 'post',
    data
  })
}

// 获取验证码接口
export function getCaptcha () {
  return request({
    url: '/blog/captcha',
    method: 'get'
  })
}

// 获取七牛上传的token
export function uploadToken () {
  return request({
    url: '/blog/uploadToken',
    method: 'get'
  })
}

// 七牛删除文件接口
export function qiniuDel (key) {
  return request({
    url: `/blog/qiniuDel`,
    method: 'post',
    data: {
      key
    }
  })
}

// 创建分类
export function addCategory (name) {
  return request({
    url: `/blog/addCategory`,
    method: 'post',
    data: {
      name
    }
  })
}

// 获取分类列表
export function showCategory (page) {
  return request({
    url: `/blog/getCategory/${page}`,
    method: 'get'
  })
}

// 删除分类
export function delCategoryList (data) {
  return request({
    url: `/blog/delCategory`,
    method: 'post',
    data: {
      data
    }
  })
}

// 修改分类
export function modifyCategory (data) {
  return request({
    url: '/blog/modifyCategory',
    method: 'post',
    data: {
      data
    }
  })
}

// 创建标签
export function createTag (name) {
  return request({
    url: '/blog/createTag',
    method: 'post',
    data: {
      name
    }
  })
}

// 获取标签列表
export function showTagList (page) {
  return request({
    url: `/blog/getTag/${page}`,
    method: 'get'
  })
}

// 删除标签
export function delTagList (data) {
  return request({
    url: '/blog/delTag',
    method: 'post',
    data: {
      data
    }
  })
}

// 修改标签
export function modifyTag (data) {
  return request({
    url: '/blog/modifyTag',
    method: 'post',
    data: {
      data
    }
  })
}

// 创建文章
export function postArticle (data) {
  return request({
    url: '/blog/postArticle',
    method: 'post',
    data: {
      data
    }
  })
}

// 根据用户获取分类和标签
export function getArticleOptions () {
  return request({
    url: '/blog/getArticleOptions',
    method: 'get'
  })
}

// 获取文章列表
export function getArticleList (data) {
  return request({
    url: `/blog/getArticleList`,
    method: 'post',
    data: {
      data
    }
  })
}

// 删除文章（truly:，data）
export function delArticle ({ data, truly }) {
  return request({
    url: '/blog/delArticle',
    method: 'post',
    data: {
      data,
      truly
    }
  })
}

// 恢复文章
export function recoveryArticle (data) {
  return request({
    url: '/blog/recoveryArticle',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取文章详情
export function getArticleDetail (id) {
  return request({
    url: `/blog/getArticleDetail/${id}`,
    method: 'get'
  })
}
