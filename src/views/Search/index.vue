<template>
  <div class="search-container">
    <div class="search-header">
      <h1>搜索文章</h1>
      <div class="search-form">
        <a-input-search
          v-model:value="searchKeyword"
          placeholder="输入关键词搜索文章..."
          enter-button
          size="large"
          @search="handleSearch"
          :loading="loading"
        />
      </div>
    </div>

    <div class="search-results" v-if="hasSearched">
      <div v-if="loading" class="loading-container">
        <a-spin tip="搜索中..."></a-spin>
      </div>
      
      <div v-else-if="searchResults.length === 0" class="empty-results">
        <a-empty description="未找到相关文章，请尝试其他关键词" />
      </div>
      
      <div v-else class="results-list">
        <h2>搜索结果: {{ total }} 篇文章</h2>
        
        <div class="article-card" v-for="article in searchResults" :key="article.id">
          <div class="article-cover" v-if="article.articleCover">
            <img :src="article.articleCover" :alt="article.title" />
          </div>
          <div class="article-info">
            <h3 class="article-title">
              <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
            </h3>
            <div class="article-summary">{{ article.summary || '暂无摘要' }}</div>
            <div class="article-meta">
              <span><i class="bi bi-calendar"></i> {{ formatDate(article.createTime) }}</span>
              <span><i class="bi bi-eye"></i> {{ article.viewCount || 0 }}</span>
              <span><i class="bi bi-heart"></i> {{ article.countLike || 0 }}</span>
              <span v-if="article.categoryName">
                <i class="bi bi-folder"></i> 
                <router-link :to="`/category/${article.categoryId}`">{{ article.categoryName }}</router-link>
              </span>
            </div>
            <div class="article-tags" v-if="article.tag && article.tag.length > 0">
              <router-link 
                v-for="tag in article.tag" 
                :key="tag.id" 
                :to="`/tag/${tag.id}`"
                class="tag"
              >
                #{{ tag.tagName }}
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="pagination">
          <a-pagination
            v-model:current="pageNum"
            :total="total"
            :pageSize="pageSize"
            show-quick-jumper
            @change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchArticles } from '@/api/Article';
import { message } from 'ant-design-vue';

const route = useRoute();
const router = useRouter();

// 状态
const searchKeyword = ref('');
const searchResults = ref([]);
const loading = ref(false);
const hasSearched = ref(false);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);

// 初始化时从URL读取搜索关键词
if (route.query.keyword) {
  searchKeyword.value = route.query.keyword;
  handleSearch(searchKeyword.value);
}

// 搜索处理
async function handleSearch(value) {
  if (!value.trim()) {
    message.warning('请输入搜索关键词');
    return;
  }
  
  loading.value = true;
  hasSearched.value = true;
  
  try {
    // 更新URL以反映搜索状态
    router.push({
      path: '/search',
      query: { keyword: value }
    });
    
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value
    };
    
    const res = await searchArticles(value, params);
    
    if (res.code === 200) {
      searchResults.value = res.data.rows || [];
      total.value = res.data.total || 0;
    } else {
      message.error(res.msg || '搜索失败，请重试');
      searchResults.value = [];
      total.value = 0;
    }
  } catch (error) {
    console.error('搜索出错:', error);
    message.error('搜索失败，请重试');
    searchResults.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

// 处理分页变化
function handlePageChange(page) {
  pageNum.value = page;
  handleSearch(searchKeyword.value);
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 格式化日期
function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
</script>

<style lang="scss" scoped>
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.search-header {
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
    color: var(--text-color, #333);
  }
  
  .search-form {
    max-width: 600px;
    margin: 0 auto;
  }
}

.search-results {
  margin-top: 2rem;
  
  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: var(--text-color, #333);
  }
  
  .loading-container, .empty-results {
    text-align: center;
    padding: 3rem 0;
  }
}

.article-card {
  display: flex;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--card-bg-color, #fff);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .article-cover {
    flex: 0 0 200px;
    margin-right: 1.5rem;
    overflow: hidden;
    border-radius: 6px;
    
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  
  .article-info {
    flex: 1;
    
    .article-title {
      margin-bottom: 0.8rem;
      font-size: 1.3rem;
      
      a {
        color: var(--text-color, #333);
        text-decoration: none;
        transition: color 0.2s ease;
        
        &:hover {
          color: #0c94ed;
        }
      }
    }
    
    .article-summary {
      margin-bottom: 1rem;
      color: var(--text-secondary-color, #666);
      font-size: 0.9rem;
      line-height: 1.6;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .article-meta {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.8rem;
      color: var(--text-secondary-color, #666);
      font-size: 0.8rem;
      
      span {
        margin-right: 1.5rem;
        margin-bottom: 0.5rem;
        
        i {
          margin-right: 0.3rem;
        }
        
        a {
          color: inherit;
          text-decoration: none;
          
          &:hover {
            color: #0c94ed;
          }
        }
      }
    }
    
    .article-tags {
      display: flex;
      flex-wrap: wrap;
      
      .tag {
        padding: 0.2rem 0.6rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 4px;
        background-color: rgba(12, 148, 237, 0.1);
        color: #0c94ed;
        font-size: 0.8rem;
        text-decoration: none;
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: rgba(12, 148, 237, 0.2);
        }
      }
    }
  }
}

.pagination {
  margin-top: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .article-card {
    flex-direction: column;
    
    .article-cover {
      flex: none;
      width: 100%;
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
}
</style> 