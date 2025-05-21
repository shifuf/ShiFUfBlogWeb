<template>
<!--  <div class="box">
    <div class="box-container">
      <!~~ 留言输入区域 ~~>
      <div class="message">
        <p><span>*</span>留言内容</p>
        <textarea id="content" cols="30" rows="10" placeholder="请输入留言内容" v-model="newMessageContent"></textarea>
      </div>
      <div class="publish" @click="publishNewMsg()">
        <span>发布</span>
      </div>

      <!~~ 留言内容展示 ~~>
      <div class="msg-content">
        <CommentItem 
          v-for="item in commentsList" 
          :key="item.id"
          :comment="item"
          :active-reply-id="activeReplyId"
          @toggle-reply="toggleReply"
          @reply-submit="handleReplySubmit"
          :depth="1"
        />
      </div>
    </div>
  </div>-->
  <div class="message-board">
    <div class="message-list">
      <div class="message-item" v-for="item in messageList" :key="item.id">
        <div class="message-header">
          <span class="user-info">
            <img :size="32" :src="getAvatarUrl(item)" />
            <span class="user-name">{{ item.userName || '游客' }}</span>
          </span>
          <span class="create-time">{{ formatDate(item.createTime) }}</span>
        </div>
        <div class="message-content">{{ item.content }}</div>
        <div class="message-footer">
          <a-button type="link" size="small">
            <!-- <LikeOutlined :style="{ color: isLiked(item.id) ? '#1890ff' : '#bfbfbf' }" />  -->
            <LikeOutlined style="color: #1890ff" />
            {{ item.likeCount || 0 }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
  <CommentItem 
    v-for="item in messageList" 
    :key="item.id"
    :comment="item"
    :active-reply-id="activeReplyId"
    @toggle-reply="toggleReply"
    @reply-submit="handleReplySubmit"
    :depth="1"
  />
</template>

<script setup>
import { FormOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import CommentItem from '@/components/CommentItem/index.vue';
import { DeleteOutlined, LikeOutlined } from '@ant-design/icons-vue'
import { getMessageList, addMessage, deleteMessage } from '@/api/message'
import CommentList from '@/components/CommentItem/index.vue'
const query = reactive({
  pageNum: 1,
  pageSize: 10,
});

// 留言和回复内容

const formMessage = ref({
  username: undefined, // 用户名
  avatar: undefined, // 头像
  pid: undefined, // 父级留言 ID
  content: undefined,//留言内容
});

// 回复框显示的 ID，默认不显示
const activeReplyId = ref(null);

// 用户信息
const userInfo = ref({
  nickname: '你好',
  avatar: 'https://picsum.photos/200/200'
});

// 获取用户头像URL
const getAvatarUrl = (item) => {
  if (item.userId) {
    return `https://picsum.photos/seed/user${item.userId}/32/32`
  }
  return 'https://picsum.photos/seed/guest/32/32'
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleString()
}
// 留言列表
const messageList = ref([])

// 切换回复框
const toggleReply = (id) => {
  // 如果当前已经显示的回复框就是点击的 ID，那么关闭回复框；否则显示新的回复框
  activeReplyId.value = activeReplyId.value === id ? null : id;
};

// 获取留言列表
const getComments = async () => {
  const res = await getMessageList(query);
  if (res.code === 200) {
    console.log(res.data);
    messageList.value = res.data.rows;
    // total.value = res.data.total;
  } else {
    message.error(res.msg);
  }
};

onMounted(() => {
  getComments();
});
</script>  
<style lang="scss" scoped>
.message-board {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.message-list {
  margin-bottom: 20px;
}

.message-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  transition: all 0.3s ease;
}

.message-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  font-weight: 600;
  color: #333;
  margin-left: 8px;
}

.create-time {
  font-size: 12px;
  color: #8c8c8c;
  margin-left: 16px;
}

.message-content {
  color: #666;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: 12px;
}

.message-footer {
  display: flex;
  justify-content: flex-end;
  color: #8c8c8c;
}

.message-form {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}
</style>
