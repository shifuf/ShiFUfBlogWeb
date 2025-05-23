import request from '@/utils/request';

/**
 * 获取网站设置
 * @returns {Promise} - 返回一个Promise对象，解析为网站设置信息
 */
export function getWebsiteSetting() {
  return request({
    url: '/website/setting',
    method: 'get'
  });
}

/**
 * 获取SEO设置
 * @returns {Promise} - 返回一个Promise对象，解析为SEO设置信息
 */
export function getSeoSettings() {
  return request({
    url: '/website/seo',
    method: 'get'
  });
} 