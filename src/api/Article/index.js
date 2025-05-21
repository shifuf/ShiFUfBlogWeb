import request from '../../utils/request';

/**
 * 获取文章列表
 */
export function getArticleList(data) {
    return request({
        url: '/article/list',
        method: 'get',
        params: data
    });
}

/**
 * 根据id获取文章详情
 */
export function getArticleDetail(id) {
    return request({
        url: `/article/detail/${id}`,
        method: 'get',
    });
}

/**
 * 根据用户ID查询文章列表   用于个人中心 1为收藏 2为点赞
 */
export function getArticleListByUserId(type) {
    return request({
        url: `/article/listByUserId`,
        method: 'get',
        params: { type }
    });
}