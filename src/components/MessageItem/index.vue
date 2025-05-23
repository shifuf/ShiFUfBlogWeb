<template>
  <div class="comment-item" :class="{ 'nested': isReply }">
    <div class="comment-main">
      <div class="user-info">
        <div class="avatar">
          <a-avatar v-if="!message.userAvatar" :size="isReply ? 30 : 40">
            {{ message.userName ? message.userName.charAt(0) : 'U' }}
          </a-avatar>
          <a-avatar v-else :src="message.userAvatar" :size="isReply ? 30 : 40"></a-avatar>
        </div>
        <div class="user-meta">
          <div class="username">{{ message.userName || '匿名用户' }}</div>
          <div class="time">{{ formatTimeAgo(message.createTime) }}</div>
        </div>
      </div>
      
      <div class="comment-content">
        <span v-if="message.replyUserName" class="reply-to">
          @{{ message.replyUserName }}
        </span>
        {{ message.content }}
      </div>
      
      <div class="comment-actions">
        <a-button 
          type="text" 
          class="action-btn" 
          @click="handleToggleReply"
        >
          <template #icon><comment-outlined /></template>
          回复
        </a-button>
        <a-button 
          type="text" 
          class="action-btn"
          @click="handleLike"
          :class="{ 'liked': message.isLiked }"
        >
          <template #icon>
            <component :is="message.isLiked ? LikeFilled : LikeOutlined" />
          </template>
          {{ message.likeCount || 0 }}
        </a-button>
      </div>
    </div>
    
    <!-- 回复表单 - 仅当当前留言是被回复的对象时显示 -->
    <div v-if="currentReplyingTo === message.id" class="reply-form">
      <a-form :model="currentReplyForm" @finish="handleSubmitReply">
        <a-form-item v-if="!isLoggedIn" name="nickname" :rules="[{ required: true, message: '请输入您的昵称!' }]">
          <a-input v-model:value="currentReplyForm.nickname" placeholder="昵称" />
        </a-form-item>
        <a-form-item v-if="!isLoggedIn" name="email" :rules="[{ required: true, type: 'email', message: '请输入有效的邮箱!' }]">
          <a-input v-model:value="currentReplyForm.email" placeholder="邮箱" />
        </a-form-item>
        <a-form-item name="content" :rules="[{ required: true, message: '请输入回复内容!' }]">
          <a-textarea 
            v-model:value="currentReplyForm.content" 
            :placeholder="`回复 @${message.userName}...`" 
            :rows="3" 
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="isReplying">回复</a-button>
          <a-button style="margin-left: 10px" @click="handleCancelReply">取消</a-button>
        </a-form-item>
      </a-form>
    </div>
    
    <!-- 子留言/回复 - 递归显示 -->
    <div v-if="message.children && message.children.length > 0" class="nested-comments">
      <MessageItem
        v-for="reply in message.children" 
        :key="reply.id"
        :message="reply"
        :is-reply="true"
        :is-logged-in="isLoggedIn"
        @reply="handleRelayReply"
        @toggle-reply="handleRelayToggleReply"
        @like="handleRelayLike"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, inject, computed } from 'vue';
import { CommentOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons-vue';
import MessageItem from '@/components/MessageItem/index.vue'
// 不再导入自身，依赖全局注册的组件

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  isReply: {
    type: Boolean,
    default: false
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['reply', 'toggle-reply', 'like']);

// 从父组件注入状态
const currentReplyingTo = inject('replyingTo');
const currentReplyForm = inject('replyForm');
const isReplying = inject('replying');

// 格式化时间为"几个月前"的形式
const formatTimeAgo = (dateString) => {
  if (!dateString) return '';
  
  const now = new Date();
  const past = new Date(dateString);
  const diffTime = Math.abs(now - past);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) {
    return '今天';
  } else if (diffDays < 30) {
    return `${diffDays}天前`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}个月前`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}年前`;
  }
};

// 处理回复按钮点击
const handleToggleReply = () => {
  console.log('点击回复按钮:', props.message.id, props.message.userName);
  emit('toggle-reply', props.message.id, null, props.message.userName);
};

// 处理取消回复按钮点击
const handleCancelReply = () => {
  console.log('取消回复');
  emit('toggle-reply', null);
};

// 处理点赞按钮点击
const handleLike = () => {
  emit('like', props.message.id);
};

// 处理提交回复
const handleSubmitReply = () => {
  emit('reply', props.message.id);
};

// 以下函数用于转发子组件的事件到父组件
const handleRelayReply = (msgId) => {
  emit('reply', msgId);
};

const handleRelayToggleReply = (msgId, replyId, userName) => {
  emit('toggle-reply', msgId, replyId, userName);
};

const handleRelayLike = (msgId) => {
  emit('like', msgId);
};
</script>

<style lang="scss" scoped>
.comment-item {
  position: relative;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.nested {
    margin-left: 40px;
    padding: 12px 0;
    background-color: #f9f9f9;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: none;
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .comment-main {
    position: relative;
  }
  
  .user-info {
    display: flex;
    align-items: flex-start;
    margin-bottom: 6px;
    
    .avatar {
      margin-right: 10px;
      
      .ant-avatar {
        display: block;
      }
    }
    
    .user-meta {
      flex: 1;
      
      .username {
        font-weight: 500;
        color: #333;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .time {
        color: #999;
        font-size: 12px;
        line-height: 1.5;
      }
    }
  }
  
  .comment-content {
    margin: 4px 0;
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    padding-left: 50px;
    
    .reply-to {
      color: #3d7e9a;
      margin-right: 5px;
    }
  }
  
  .comment-actions {
    padding-left: 50px;
    display: flex;
    gap: 15px;
    
    .action-btn {
      font-size: 12px;
      color: #999;
      padding: 0;
      height: auto;
      
      &:hover {
        color: #666;
      }
      
      &.liked {
        color: #ff4d4f;
      }
    }
  }
  
  .nested-comments {
    margin-top: 10px;
  }
  
  .reply-form {
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
    margin: 10px 0 10px 50px;
    
    .ant-form-item:last-child {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 768px) {
  .comment-item {
    .comment-content,
    .comment-actions {
      padding-left: 0;
    }
    
    &.nested {
      margin-left: 20px;
    }
    
    .reply-form {
      margin-left: 0;
    }
  }
}
</style> 