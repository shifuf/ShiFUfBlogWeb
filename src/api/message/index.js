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
import request from '@/utils/request'

/**
 * 分页获取留言/评论列表
 * @param {Object} pageParams - 分页参数
 * @param {Number} articleId - 文章ID，-1查询所有文章评论，0查询留言板留言，null/未指定查询全部
 * @param {Number} parentId - 父级留言ID，默认为0
 */
export function getMessageList(pageParams, articleId, parentId = 0) {
  return request({
    url: '/message/list',
    method: 'get',
    params: {
      ...pageParams,
      articleId,
      parentId
    }
  });
}

/**
 * 发布留言/评论
 * @param {Object} data - 留言数据对象
 */
export function addMessage(data) {
  return request({
    url: '/message/add',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json' // 明确指定 Content-Type 为 application/json
    }
  });
}

/**
 * 回复留言/评论
 * @param {Object} data - 回复数据对象
 */
export function replyMessage(data) {
  return request({
    url: '/message/reply',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json' // 明确指定 Content-Type 为 application/json
    }
  });
}

/**
 * 点赞/取消点赞留言
 * @param {Number} id - 留言ID
 */
export function likeMessage(id) {
  return request({
    url: '/message/like',
    method: 'get',
    params: { id }
  });
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