<template>
  <div class="layout" :class="{ 'scrolled': isScrolled }">
    <Header />
    <!-- 返回顶部按钮 -->
    <div class="back-to-top" v-show="isScrolled" @click="scrollToTop">
      <i class="bi bi-arrow-up-circle-fill"></i>
    </div>
  </div>
  <router-view></router-view>
  <Footer />
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import Header from './Header/index.vue'
import Footer from './Footer/index.vue'

// 滚动状态
const isScrolled = ref(false);

// 监听页面滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 60;
};

// 返回顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>
<style lang=scss scoped>
.layout {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 999;

  &.scrolled {
    background-color: var(--bg-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  // 返回顶部按钮
  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--bg-color);
    color: #0c94ed;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    i {
      font-size: 24px;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
    .back-to-top {
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;

      i {
        font-size: 20px;
      }
    }
  }
}
</style>
