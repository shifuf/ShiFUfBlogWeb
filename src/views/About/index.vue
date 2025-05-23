<template>
  <div class="about-container">
    <!-- 头部介绍 -->
    <div class="header-section">
      <div class="greeting">
        <h1>你好，很高兴遇到你👋</h1>
        <h2>我是 <span class="name">快乐是福</span>，</h2>
        <p class="intro-text">一名全栈开发工程师，专注于Vue3和Spring Boot技术栈</p>
      </div>
    </div>

    <!-- 引言 -->
    <div class="quote-section">
      <h2>人，因思想而伟大，因精神而崇高</h2>
      <p>刹那的灵感 瞬间的奇想 深刻的思考 深度的思辨</p>
      <div class="brand-name">快乐是福</div>
    </div>

    <!-- 个人信息卡片 -->
    <div class="info-cards">
      <!-- 性格类型 -->
      <div class="info-card personality">
        <h3>性格</h3>
        <div class="personality-type">
          <span class="type-name">探索者</span>
          <span class="type-code">ENFP</span>
        </div>
        <p>充满热情的自由精神，永远不缺社交能力和创造力</p>
      </div>

      <!-- 座右铭 -->
      <div class="info-card motto">
        <h3>座右铭</h3>
        <blockquote>
          每一个不曾起舞的日子，<br>
          都是对生命的辜负。
        </blockquote>
        <blockquote>
          见过更大的世界，<br>
          就不甘心停留在原地。
        </blockquote>
      </div>

      <!-- 爱好 -->
      <div class="info-card hobbies">
        <h3>爱好</h3>
        <div class="hobby-list">
          <div class="hobby-item">
            <i class="bi bi-code-slash"></i>
            <span>编程开发</span>
          </div>
          <div class="hobby-item">
            <i class="bi bi-book"></i>
            <span>技术分享</span>
          </div>
          <div class="hobby-item">
            <i class="bi bi-music-note"></i>
            <span>听音乐</span>
          </div>
          <div class="hobby-item">
            <i class="bi bi-camera"></i>
            <span>摄影</span>
          </div>
        </div>
      </div>

      <!-- 关注偏好 -->
      <div class="info-card interests">
        <h3>关注偏好</h3>
        <div class="interest-tags">
          <span class="tag">前端开发</span>
          <span class="tag">后端架构</span>
          <span class="tag">数据库设计</span>
          <span class="tag">云计算</span>
          <span class="tag">人工智能</span>
          <span class="tag">开源项目</span>
        </div>
      </div>
    </div>

    <!-- 个人数据 -->
    <div class="data-section">
      <h3>个人信息</h3>
      <div class="data-grid">
        <div class="data-item">
          <i class="bi bi-geo-alt"></i>
          <div>
            <span class="label">现居地</span>
            <span class="value">中国</span>
          </div>
        </div>
        <div class="data-item">
          <i class="bi bi-calendar"></i>
          <div>
            <span class="label">建站时间</span>
            <span class="value">2024年</span>
          </div>
        </div>
        <div class="data-item">
          <i class="bi bi-briefcase"></i>
          <div>
            <span class="label">职业</span>
            <span class="value">软件开发工程师</span>
          </div>
        </div>
        <div class="data-item">
          <i class="bi bi-heart"></i>
          <div>
            <span class="label">爱好</span>
            <span class="value">编程、音乐、摄影</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能展示 -->
    <div class="skills-section">
      <h3>技能</h3>
      <p class="skills-subtitle">开启创造力</p>
      <div class="skills-grid">
        <div class="skill-category">
          <h4>前端技术</h4>
          <div class="skill-tags">
            <span class="skill-tag">Vue3</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">CSS3</span>
            <span class="skill-tag">HTML5</span>
            <span class="skill-tag">Vite</span>
          </div>
        </div>
        <div class="skill-category">
          <h4>后端技术</h4>
          <div class="skill-tags">
            <span class="skill-tag">Spring Boot</span>
            <span class="skill-tag">Java</span>
            <span class="skill-tag">MySQL</span>
            <span class="skill-tag">Redis</span>
            <span class="skill-tag">MyBatis Plus</span>
            <span class="skill-tag">Maven</span>
          </div>
        </div>
        <div class="skill-category">
          <h4>开发工具</h4>
          <div class="skill-tags">
            <span class="skill-tag">Git</span>
            <span class="skill-tag">Docker</span>
            <span class="skill-tag">IntelliJ IDEA</span>
            <span class="skill-tag">VS Code</span>
            <span class="skill-tag">Postman</span>
            <span class="skill-tag">Navicat</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 建站初衷 -->
    <div class="purpose-section">
      <h3>建站初衷</h3>
      <div class="purpose-content">
        <p>人因 <strong>思想</strong> 而伟大, 因 <strong>精神</strong> 而崇高。</p>
        <p>你可曾有过<strong>刹那间的灵感？</strong> 或 <strong>不经意的奇想？</strong> 更甚是对某件事的 <strong>深刻思考？</strong></p>
        <p>不妨把它记录下来。 多年后，回过头，再<strong>重新审视 "自己" 与 "当年的自己"。</strong></p>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="contact-section">
      <h3>联系我</h3>
      <div class="contact-links">
        <a href="#" class="contact-link">
          <i class="bi bi-envelope"></i>
          <span>邮箱</span>
        </a>
        <a href="#" class="contact-link">
          <i class="bi bi-github"></i>
          <span>GitHub</span>
        </a>
        <a href="#" class="contact-link">
          <i class="bi bi-wechat"></i>
          <span>微信</span>
        </a>
        <a href="#" class="contact-link">
          <i class="bi bi-chat-square-text"></i>
          <span>留言板</span>
        </a>
      </div>
    </div>

    <!-- 赞赏支持 -->
    <div class="support-section">
      <h3>支持我</h3>
      <p>如果这个博客对你有帮助，请考虑支持一下～</p>
      <div class="payment-methods">
        <div class="payment-item">
          <i class="bi bi-wechat"></i>
          <span>微信</span>
        </div>
        <div class="payment-item">
          <i class="bi bi-alipay"></i>
          <span>支付宝</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

// 设置页面标题
useTitle('关于我 - 快乐是福')

onMounted(() => {
  // 页面加载动画
  console.log('关于页面加载完成')
})
</script>

<style lang="scss" scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  line-height: 1.6;
  margin-top: 100px;
}

// 头部介绍
.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👋</text></svg>') no-repeat center;
    opacity: 0.1;
    transform: scale(3);
  }
  
  .greeting {
    position: relative;
    z-index: 1;
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 300;
    }
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      
      .name {
        font-weight: bold;
        background: linear-gradient(45deg, #ffd700, #ffed4a);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
    
    .intro-text {
      font-size: 1.1rem;
      opacity: 0.9;
    }
  }
}

// 引言部分
.quote-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  
  h2 {
    font-size: 1.8rem;
    color: var(--text-color, #333);
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  p {
    font-size: 1rem;
    color: var(--text-secondary-color, #666);
    margin-bottom: 2rem;
  }
  
  .brand-name {
    font-size: 2rem;
    font-weight: bold;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

// 信息卡片
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card {
  background: var(--card-bg-color, #fff);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: var(--text-color, #333);
    border-bottom: 2px solid #667eea;
    padding-bottom: 0.5rem;
  }
}

.personality {
  .personality-type {
    text-align: center;
    margin-bottom: 1rem;
    
    .type-name {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 0.5rem;
    }
    
    .type-code {
      font-size: 2rem;
      font-weight: bold;
      color: #764ba2;
    }
  }
  
  p {
    text-align: center;
    color: var(--text-secondary-color, #666);
  }
}

.motto {
  blockquote {
    margin: 1rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-left: 4px solid #667eea;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: var(--text-color, #333);
  }
}

.hobbies {
  .hobby-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .hobby-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: background 0.3s ease;
    
    &:hover {
      background: #e9ecef;
    }
    
    i {
      font-size: 1.2rem;
      margin-right: 0.8rem;
      color: #667eea;
    }
  }
}

.interests {
  .interest-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
  
  .tag {
    padding: 0.5rem 1rem;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border-radius: 20px;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
}

// 数据部分
.data-section {
  margin-bottom: 3rem;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--text-color, #333);
  }
  
  .data-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .data-item {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: var(--card-bg-color, #fff);
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    
    i {
      font-size: 2rem;
      margin-right: 1rem;
      color: #667eea;
    }
    
    .label {
      display: block;
      font-size: 0.9rem;
      color: var(--text-secondary-color, #666);
      margin-bottom: 0.3rem;
    }
    
    .value {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--text-color, #333);
    }
  }
}

// 技能部分
.skills-section {
  margin-bottom: 3rem;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    text-align: center;
    color: var(--text-color, #333);
  }
  
  .skills-subtitle {
    text-align: center;
    color: var(--text-secondary-color, #666);
    margin-bottom: 2rem;
    font-style: italic;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .skill-category {
    background: var(--card-bg-color, #fff);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    
    h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #667eea;
      border-bottom: 2px solid #667eea;
      padding-bottom: 0.5rem;
    }
    
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }
    
    .skill-tag {
      padding: 0.4rem 0.8rem;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      font-size: 0.9rem;
      color: var(--text-color, #333);
      transition: all 0.3s ease;
      
      &:hover {
        background: #667eea;
        color: white;
        transform: translateY(-2px);
      }
    }
  }
}

// 建站初衷
.purpose-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--card-bg-color, #fff);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--text-color, #333);
  }
  
  .purpose-content {
    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1rem;
      color: var(--text-color, #333);
      text-align: center;
      
      strong {
        color: #667eea;
        font-weight: 600;
      }
    }
  }
}

// 联系方式
.contact-section {
  margin-bottom: 3rem;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--text-color, #333);
  }
  
  .contact-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .contact-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: var(--card-bg-color, #fff);
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: var(--text-color, #333);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      color: #667eea;
    }
    
    i {
      font-size: 1.5rem;
      margin-right: 0.8rem;
    }
    
    span {
      font-weight: 500;
    }
  }
}

// 赞赏支持
.support-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .payment-methods {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .payment-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    span {
      font-weight: 500;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .about-container {
    padding: 1rem 0.5rem;
  }
  
  .header-section {
    .greeting h1 {
      font-size: 2rem;
    }
    
    .greeting h2 {
      font-size: 1.5rem;
    }
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
  
  .data-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-links {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .payment-methods {
    flex-direction: column;
    align-items: center;
  }
}
</style>
