// import request from '../../utils/request';

// /**
//  * 添加留言
//  */
// export function addMessage(data) {
//   return request({
//     url: '/message/add',
//     method: 'post',
//     data,
//             headers: {
//             'Content-Type': 'application/json' // 明确指定 Content-Type 为 application/json
//           }
//   });
// }

// /**
//  * 获取文章留言
//  */
// export function getArticleMessages(articleId) {
//   return request({
//     url: `/message/article/${articleId}`,
//     method: 'get'
//   });
// }

// /**
//  * 获取留言板留言
//  */
// export function getBoardMessages() {
//   return request({
//     url: '/message/list',
//     method: 'get'
//   });
// }    
import request from '../../utils/request'

/**
 * 获取留言列表
 * @param {Object} params - 查询参数
 * @param {number} params.articleId - 文章ID，0表示留言板
 * @param {number} params.pageNum - 当前页码
 * @param {number} params.pageSize - 每页条数
 */
export function getMessageList(params) {
  return request({
    url: '/message/list',
    method: 'get',
    params
  })
}

/**
 * 添加留言
 * @param {Object} data - 留言数据
 * @param {string} data.content - 留言内容
 * @param {string} [data.userName] - 用户名称（游客留言时需要）
 * @param {number} [data.articleId] - 文章ID，默认为0（留言板）
 * @param {number} [data.parentId] - 父留言ID，用于回复
 */
export function addMessage(data) {
  return request({
    url: '/message/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json' // 明确指定 Content-Type 为 application/json
    }
  })
}

/**
 * 删除留言
 * @param {number} id - 留言ID
 */
export function deleteMessage(id) {
  return request({
    url: `/message/delete/${id}`,
    method: 'delete'
  })
}    