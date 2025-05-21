<template>
  <div
    :class="{
      'comment-item': true,
      'level-1': depth === 1,
      'level-2': depth === 2,
    }"
  >
    <div class="msg-top">
      <div class="user-info">
        <img
          class="msg-avatar"
          :src="comment.avatar || 'https://picsum.photos/30/30'"
          alt="用户头像"
        />
        <span class="user-name">
          {{ comment.userName || comment.username }}
          <span v-if="comment.isAuthor" class="author-tag">作者</span>
        </span>
      </div>
      <div class="meta-info">
        <span class="time">{{ comment.createTime || "3个月前" }}</span>
        <span class="location">{{ comment.location || "未知" }}</span>
        <a @click="toggleReply(comment.id)" class="reply-link">回复</a>
      </div>
    </div>
    <p class="content">{{ comment.content }}</p>

    <!-- 回复框 -->
    <div v-if="activeReplyId === comment.id" class="reply-box">
      <textarea
        :placeholder="`回复 @${comment.userName || comment.username}`"
        v-model="replyContent"
      ></textarea>
      <button @click="submitReply(comment.id, replyContent)" class="reply-btn">
        回复
      </button>
    </div>

    <!-- 子评论 -->
    <div
      v-if="comment.children && comment.children.length > 0"
      class="child-comments"
    >
      <CommentItem
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        :active-reply-id="activeReplyId"
        :depth="depth + 1"
        @toggle-reply="toggleReply"
        @reply-submit="submitReply"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CommentItem from "@/components/CommentItem/index.vue";
const props = defineProps({
  comment: { type: Object, required: true },
  activeReplyId: { type: Number, default: null },
  depth: { type: Number, default: 1 },
});

const emits = defineEmits(["toggle-reply", "reply-submit"]);
const replyContent = ref("");

const toggleReply = (id) => emits("toggle-reply", id);
const submitReply = (parentId, content) =>
  emits("reply-submit", parentId, content);
</script>

<style scoped>
.comment-item {
  margin-bottom: 15px;
  padding: 10px;
}

.level-1 {
  /* 一级评论样式 */
  border-bottom: 1px solid #333;
}

.level-2 {
  /* 二级评论：有缩进和分隔线 */
  margin-left: 30px;
  border-left: 2px solid #444;
  padding-left: 15px;
}

/* 三级及以下评论：无额外缩进，保持与二级对齐 */
.level-deeper {
  margin-left: 30px;
  border-left: 2px solid #444;
  padding-left: 15px;
  border-left-style: dotted; /* 用虚线区分不同层级 */
}

/* 其他样式保持不变... */
.msg-top {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.msg-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-name {
  font-weight: bold;
}
.author-tag {
  color: #66cc00;
  font-size: 12px;
  margin-left: 5px;
}
.meta-info {
  color: #888;
  font-size: 12px;
}
.reply-link {
  color: #666;
  text-decoration: none;
  margin-left: 10px;
}
.content {
  margin: 5px 0;
  line-height: 1.6;
}
.reply-box textarea {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #555;
  background: #333;
  color: #fff;
}
.reply-btn {
  background: #66cc00;
  color: #fff;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
}
</style>
