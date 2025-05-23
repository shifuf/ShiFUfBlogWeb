<template>
  <div class="message-board">
    <!-- 发布留言表单 -->
    <div class="message-form-container">
      <h2>发表留言</h2>
      <a-form :model="messageForm" @finish="handleSubmit">
        <a-form-item v-if="!isLoggedIn" name="userName" :rules="[{ required: true, message: '请输入您的昵称!' }]">
          <a-input v-model:value="messageForm.userName" placeholder="昵称" />
        </a-form-item>
        <a-form-item v-if="!isLoggedIn" name="userEmail" :rules="[{ required: true, type: 'email', message: '请输入有效的邮箱!' }]">
          <a-input v-model:value="messageForm.userEmail" placeholder="邮箱" />
        </a-form-item>
        <a-form-item name="content" :rules="[{ required: true, message: '请输入留言内容!' }]">
          <a-textarea 
            v-model:value="messageForm.content" 
            placeholder="请输入您的留言..." 
            :rows="4" 
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="submitting">发表留言</a-button>
        </a-form-item>
      </a-form>
    </div>
    
    <!-- 留言列表 -->
    <div class="message-list">
      <h2>留言列表</h2>
      
      <div v-if="loading" class="loading-container">
        <a-spin tip="加载中..."></a-spin>
      </div>
      
      <div v-else-if="messages.length === 0" class="empty-message">
        <a-empty description="暂无留言" />
      </div>
      
      <div v-else class="comments">
        <!-- 使用递归组件显示消息和回复 -->
        <MessageItem
          v-for="message in messages" 
          :key="message.id"
          :message="message"
          :is-logged-in="isLoggedIn"
          @reply="handleReply"
          @toggle-reply="toggleReply"
          @like="handleLike"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, defineAsyncComponent, provide, watch } from 'vue';
import { message } from 'ant-design-vue';
import { 
  getMessageList, 
  addMessage, 
  replyMessage, 
  likeMessage 
} from '@/api/message';
import { useUserStore } from '@/stores/modules/user';
import MessageItem from '@/components/MessageItem/index.vue';

const props = defineProps({
  articleId: {
    type: [Number, String],
    default: 0 // 0表示留言板，其他值表示文章的ID
  }
});

// 用户信息
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const userInfo = computed(() => userStore.userInfo || {});

// 留言表单
const messageForm = reactive({
  content: '',
  userName: '',
  userEmail: '',
  articleId: computed(() => props.articleId) // 使用传入的articleId
});

// 回复表单
const replyForm = reactive({
  content: '',
  userName: '',
  userEmail: '',
  articleId: computed(() => props.articleId), // 使用传入的articleId
  parentId: null,
  replyUserId: null
});

// 状态
const loading = ref(false);
const submitting = ref(false);
const replying = ref(false);
const messages = ref([]);
const replyingTo = ref(null);
const replyingToUser = ref(null);

// 向子组件提供回复状态
provide('replyingTo', replyingTo);
provide('replyForm', replyForm);
provide('replying', replying);

// 递归加载所有子回复
const loadRepliesRecursive = async (parentId) => {
  try {
    const params = {
      pageNum: 1,
      pageSize: 100
    };
    
    const res = await getMessageList(params, props.articleId, parentId);
    if (res.code === 200) {
      const replies = res.data.rows;
      
      // 递归加载每个回复的子回复
      await Promise.all(replies.map(async (reply) => {
        if (reply.replyCount > 0) {
          reply.children = await loadRepliesRecursive(reply.id);
        }
      }));
      
      return replies;
    }
    return [];
  } catch (error) {
    console.error('获取回复失败:', error);
    return [];
  }
};

// 加载留言列表
const fetchMessages = async () => {
  loading.value = true;
  try {
    const params = {
      pageNum: 1,
      pageSize: 100,
      orderBy: 'createTime',
      orderType: 'desc'
    };
    
    const res = await getMessageList(params, props.articleId, 0);
    if (res.code === 200) {
      messages.value = res.data.rows;
      
      // 处理每个留言的liked状态
      messages.value.forEach(msg => {
        // API可能返回liked字段，如果没有则默认为false
        msg.isLiked = msg.liked || false;
        
        // 处理子留言的liked状态
        if (msg.children && msg.children.length > 0) {
          processChildren(msg.children);
        }
      });
      
      console.log('加载的完整留言数据:', JSON.stringify(messages.value));
    } else {
      message.error(res.msg || '获取留言列表失败');
    }
  } catch (error) {
    console.error('获取留言失败:', error);
    message.error('获取留言列表失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 递归处理子留言的liked状态
const processChildren = (children) => {
  if (!children || children.length === 0) return;
  
  children.forEach(child => {
    // 处理当前子留言
    child.isLiked = child.liked || false;
    
    // 递归处理该子留言的子留言
    if (child.children && child.children.length > 0) {
      processChildren(child.children);
    }
  });
};

// 发表留言
const handleSubmit = async () => {
  submitting.value = true;
  try {
    const data = {
      ...messageForm,
      userId: isLoggedIn.value ? userInfo.value.id : null
    };
    
    const res = await addMessage(data);
    if (res.code === 200) {
      message.success('留言发表成功');
      messageForm.content = ''; // 清空内容
      fetchMessages(); // 重新加载留言列表
    } else {
      message.error(res.msg || '留言发表失败');
    }
  } catch (error) {
    console.error('发表留言失败:', error);
    message.error('留言发表失败，请稍后重试');
  } finally {
    submitting.value = false;
  }
};

// 切换回复表单显示状态
const toggleReply = (messageId, replyId = null, replyUserName = null) => {
  console.log("切换回复表单:", messageId, replyId, replyUserName);
  
  if (replyingTo.value === messageId && !replyId) {
    // 如果已经是当前留言的回复框，且没有指定回复目标，就关闭回复框
    replyingTo.value = null;
    replyingToUser.value = null;
  } else {
    // 否则打开回复框
    replyingTo.value = messageId;
    
    if (replyId) {
      replyForm.replyUserId = replyId;
      replyingToUser.value = replyUserName;
    } else {
      replyForm.replyUserId = null;
      replyingToUser.value = null;
    }
    
    // 重置回复表单
    replyForm.content = '';
    replyForm.parentId = messageId;
  }
};

// 提交回复
const handleReply = async (messageId) => {
  replying.value = true;
  try {
    const data = {
      ...replyForm,
      userId: isLoggedIn.value ? userInfo.value.id : null,
      parentId: messageId
    };
    
    const res = await replyMessage(data);
    if (res.code === 200) {
      message.success('回复成功');
      replyingTo.value = null;
      replyingToUser.value = null;
      replyForm.content = '';
      
      // 重新加载整个留言列表
      fetchMessages();
    } else {
      message.error(res.msg || '回复失败');
    }
  } catch (error) {
    console.error('回复失败:', error);
    message.error('回复失败，请稍后重试');
  } finally {
    replying.value = false;
  }
};

// 点赞/取消点赞
const handleLike = async (id) => {
  try {
    const res = await likeMessage(id);
    if (res.code === 200) {
      // 更新本地状态 - 递归查找留言或回复
      const updateMessageLike = (list) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === id) {
            list[i].isLiked = !list[i].isLiked;
            list[i].likeCount = list[i].isLiked ? (list[i].likeCount || 0) + 1 : (list[i].likeCount || 1) - 1;
            return true;
          }
          
          if (list[i].children && list[i].children.length > 0) {
            if (updateMessageLike(list[i].children)) {
              return true;
            }
          }
        }
        return false;
      };
      
      updateMessageLike(messages.value);
      message.success(res.data ? '点赞成功' : '取消点赞');
    } else {
      message.error(res.msg || '操作失败');
    }
  } catch (error) {
    console.error('点赞操作失败:', error);
    message.error('操作失败，请稍后重试');
  }
};

// 监听articleId变化，重新加载留言
watch(() => props.articleId, (newVal) => {
  if (newVal !== undefined) {
    fetchMessages();
  }
});

// 初始化
onMounted(() => {
  fetchMessages();
});
</script>

<style lang="scss" scoped>
.message-board {
  margin-top: 2rem;
  
  .message-form-container {
    background-color: var(--card-bg-color, #fff);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    h2 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1.2rem;
      font-weight: 500;
    }
  }
  
  .message-list {
    background-color: var(--card-bg-color, #fff);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    h2 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1.2rem;
      font-weight: 500;
    }
    
    .loading-container {
      padding: 2rem 0;
      text-align: center;
    }
    
    .empty-message {
      padding: 2rem 0;
    }
  }
}

@media (max-width: 768px) {
  .message-board {
    .message-form-container, 
    .message-list {
      padding: 1rem;
    }
  }
}
</style> 