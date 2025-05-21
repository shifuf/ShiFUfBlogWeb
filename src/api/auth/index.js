import request from '../../utils/request';

/**
 * 登录
 * @param {Object} data - 登录所需的用户凭据
 * @returns {Promise} - 返回一个Promise对象，解析为登录结果
 * @throws {Error} - 如果请求失败，抛出错误
 * @description - 该函数使用http模块发送POST请求到'/user/login'，并返回登录结果。
 * */
export function UserLogin(data) {
  return request({
      url: '/user/login',
      method: 'get',
      params: data
  });
}

/**
 * 用户注册
 */
export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' }
  });
}
/**
 * 发送验证码
 * @param {string} email 邮箱地址 - 要发送验证码的邮箱地址
 * @returns {Promise} - 返回一个Promise对象，解析为验证码发送结果
 */
export function sendVerificationCode(email) {
  return request({
    url: '/auth/send',
    method: 'get',
    params: { email }
  }); 
}
/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  }); 
}


