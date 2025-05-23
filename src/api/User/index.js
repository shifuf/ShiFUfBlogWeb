import request from '../../utils/request';
/**
 * 获取当前用户信息
 * @returns {Promise} - 返回一个Promise对象，解析为当前用户信息
 */
export function getCurrentUser() {
    return request({
        url: '/user/info',
        method: 'get'
    }); 
  }
  

/**
 * 用户邮箱修改
 * @param {string} email 邮箱地址 - 要修改的邮箱地址
 * @param {string} code 验证码 - 用于验证邮箱地址
 * @returns {Promise} - 返回一个Promise对象，解析为邮箱修改结果
 */
export function updateEmail(email, code) {
    return request({
      url: '/user/changeEmail',
      method: 'post',
      data: { email, code } 
    }) 
  }
/**
 * 更新用户头像
 * @param {string} avatar 头像地址
 */
export function updateAvatar(avatar) {
   return request({
     url: '/user/updateAvatar',
     method: 'post',
     data: { avatar } 
   }) 
 }

  /**
   * 更新当前用户信息
   */
  export function updateCurrentUser(data) {
    return request({
      url: '/user/updateCurrent',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json' // 明确指定 Content-Type 为 application/json
      }
    }); 
  }