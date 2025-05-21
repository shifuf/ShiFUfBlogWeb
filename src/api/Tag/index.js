import request from '../../utils/request';

/**
 * 获取标签列表
 */
export function getTagList() {
    return request({
        url: '/tag/list',
        method: 'get',
    });
}

/**
 * 根据标签ID获取文章列表
 * @param {*} id 
 * @returns 
 */
export function getTagArticle(id) {
    return request({
        url: `/tag/articles`,
        method: 'get',
        params: id
    });
}