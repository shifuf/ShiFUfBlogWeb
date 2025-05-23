import request from '@/utils/request';

/**
 * 上传图片
 * @param {FormData} formData - 包含图片文件的表单数据
 * @returns {Promise}
 */
export function uploadImage(formData) {
  return request({
    url: '/file/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
} 