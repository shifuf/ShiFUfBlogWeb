import request from '../../utils/request';

/**
 * 获取分类列表
 * @param {Object} data - 请求参数
 */
export function getCategoryList(data) {
    return request({
        url: '/category/list',
        method: 'get',
        params: data
    });
}
/**
 * 根据分类ID获取文章列表
 * @param {Number} id - 分类ID
 * @param {Object} data - 请求参数
 */
export function getCategoryArticle(id) {
    return request({
        url: `/category/articleList`,
        method: 'get',
        params: id
    });
}