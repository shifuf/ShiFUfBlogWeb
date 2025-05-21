<template>
    <div class="dark-mode-toggle">
      <a-button 
        type="text" 
        shape="circle"
        :class="['switch-btn', { 'is-checked': isDark }]"
        @click="toggleDarkMode"
      >
        <i :class="[isDark ? 'bi-moon-stars-fill' : 'bi-brightness-high-fill', 'bi-icon']"></i>
      </a-button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { notification } from 'ant-design-vue'
  import { useDark, useToggle } from '@vueuse/core'
  const isDark = ref(useDark())
  

  // const toggleDark =  
  
  function toggleDarkMode() {
    isDark.value = !isDark.value
    useToggle(isDark)
  
      // 销毁所有现有通知
    notification.destroy();
    notification.success({
      message: isDark.value ? '暗黑模式' : '亮色模式',
      description: isDark.value ? '已切换至暗黑模式' : '已切换至亮色模式',
      placement: 'topLeft',
      duration: 2,
    })
  }
  </script>
  
  <style scoped>

  .switch-btn {
    width: 40px;
    height: 22px;
    border-radius: 11px;
    padding: 2px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #dcdfe6;
  }
  
  .switch-btn.is-checked {
    /* justify-content: flex-end; */
    background-color: #409eff;
  }
  
  .bi-icon {
    font-size: 16px;
    color: white;
    transition: transform 0.3s ease;
  }
  
  .switch-btn .bi-icon {
    margin-left: 2px;
    margin-right: 2px;
  }
  
  .switch-btn.is-checked .bi-icon {
    transform: translateX(18px);
  }

  </style>