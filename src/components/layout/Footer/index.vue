<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-bottom">
        <p>{{ footerInfo }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getWebsiteSetting } from '@/api/Website';

const footerInfo = ref();

// 获取网站设置信息
const fetchWebsiteSettings = async () => {
  try {
    const res = await getWebsiteSetting();
    if (res.code === 200) {
        footerInfo.value = res.data.footerInfo;
      
    }
  } catch (error) {
    console.error('获取网站设置失败:', error);
  }
};

onMounted(() => {
  fetchWebsiteSettings();
});
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--card-bg-color);
  border-top: 1px solid #e3e8f7;
  padding: 3rem 0 1rem;
  margin-top: 3rem;

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;


    .footer-bottom {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid #e3e8f7;

      p {
        margin: 0.5rem 0;
        color: var(--text-color-secondary);
        font-size: 0.9rem;
      }
    }
  }

  @media (min-width: 768px) {
    .footer-info {
      flex-direction: row !important;
      
      .logo-section {
        flex: 1;
      }
      
      .footer-links {
        flex: 2;
      }
    }
  }
}
</style> 