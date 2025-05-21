// composables/useDarkMode.js
import { ref, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  // 初始化：从 localStorage 或系统偏好加载
  onMounted(() => {
    const saved = localStorage.getItem('darkMode')
    
    if (saved !== null) {
      isDark.value = saved === 'true'
    } else {
      // 默认跟随系统
      isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    applyTheme()
  })
  
  function applyTheme() {
    if (isDark.value) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }
  
  function toggleDarkMode() {
    isDark.value = !isDark.value
    localStorage.setItem('darkMode', isDark.value)
    applyTheme()
  }
  
  return {
    isDark,
    toggleDarkMode,
    applyTheme
  }
}