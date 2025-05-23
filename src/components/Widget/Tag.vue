<template>
  <div class="tags">
    <div class="tag-page-tags">
      <router-link to="/">首页</router-link>
      <router-link
        v-for="tag in props.list"
        :id="tag.id"
        :to="`/${props.path}/${tag.id}`"
        :style="{ order: tag.id === path ? -1 : '' }"
        :class="['tag-link', { select: tag.id === path }]"
      >
        <!-- 标签名称 -->
        <span>
          {{ props.name=='tagName'? tag.tagName: tag.categoryName }}
        </span>
      </router-link>
    </div>
    <a-button v-if="props.list.length > 5" type="primary" @click="drawer.open">更多</a-button>
  </div>
  <Drawer ref="drawer">
    <div class="tag-page-tags popover-tags">
      <router-link
        v-for="tag in props.list"
        :id="tag.id"
        :to="`/category/${tag.id}`"
        :style="{ order: tag.id === path ? -1 : '' }"
        :class="['tag-link', { select: tag.id === path }]"
        @click="getTag(tag.id)"
      >
        <!-- 标签名称 -->
        <span class="tags-punctuation"></span>
        <span>{{ tag.name }}</span>
        <!-- 标签下文章数量 -->
        <span class="tagsPageCount">{{ tag.count }}</span>
      </router-link>
    </div>
  </Drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Drawer from "../Drawer/Drawer.vue";
const emit = defineEmits(['tagChange']);

const route = useRoute();
// 获取当前路由的参数
const path = ref(Number(route.params.id) || 0);
// 获取标签列表
const props = defineProps({
  list: {
    type: Array,
  },
  name: {
    type: String, 
  },
  path: {
    type: String,
  },
});
// 监听路由变化并更新path值
watch(
  () => route.params.id,
  (newId) => {
    path.value = Number(newId) || 0;
    emit('tagChange', path.value);
  }
);
// 弹出框
const drawer = ref(false);


</script>
<style lang="scss" scoped>
.tags {
  width: 100%;
  padding: 0.4rem 1rem 0.4rem 0.7rem;
  background-color: var(--bg-color);
  border-radius: 12px;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #e3e8f7;
  transition: 0.3s;
}

.tag-page-tags {
  width: 100%;
  white-space: nowrap;

  display: flex;
  border-radius: 8px;
  align-items: center;
  position: relative;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* 隐藏滚动条但保持功能 */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  .tag-link {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem 0.8rem;
    margin: 0.25rem 0.25rem;
    line-height: 1.6;
    border-radius: 8px;
    &.select {
      color: #fff;
      background-color: #2583e8;
    }
  }
}

//弹出框
.popover-tag {
  width: 100%;
}

.popover-tags {
  flex-wrap: wrap;
  justify-content: center;
}
</style>