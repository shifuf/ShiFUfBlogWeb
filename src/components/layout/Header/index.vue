<template>
  <nav class="nav-box" >
    <div class="nav-left">
      <div>
        <RouterLink to="/"
          ><img class="logo" src="@/assets/img/logo.png" alt=""
        /></RouterLink>
      </div>
    </div>
    <div class="nav-right iconfont">
      <ul>
        <li>
          <RouterLink to="/">
            <i class="bi-house-door-fill"></i>首页</RouterLink
          >
        </li>
        <li v-for="item in navList" class="dropdown">
          <!-- 如果没有子菜单才允许跳转 -->
          <RouterLink :to="item.children ? '' : `/${item.path}`" :key="item.id">
            <span class="iconfont" :class="item.icon"></span>
            {{ item.title }}
            <span
              v-if="item.children"
              class="dropdown iconfont bi-chevron-down"
            ></span>
          </RouterLink>

          <!-- 子菜单 -->
          <div class="dropdown-menu" v-if="item.children">
            <div v-for="child in item.children">
              <RouterLink :to="`/${child.path}`">
                <span class="iconfont" :class="child.icon"></span>
                {{ child.title }}
              </RouterLink>
            </div>
          </div>
        </li>
      </ul>
      
      <!-- 搜索按钮 -->
      <div class="search-btn" @click="toggleSearchBox">
        <i class="bi bi-search"></i>
      </div>
      
      <!-- 昼夜切换 -->
      <div class="switch">
        <Switch></Switch>
      </div>
      <!-- 用户 -->
      <div class="user">
        <AuthModal></AuthModal>
      </div>
    </div>
  </nav>

  <!-- 搜索框弹窗 -->
  <div class="search-popup" v-if="showSearchBox" @click.self="toggleSearchBox">
    <div class="search-content">
      <a-input-search
        v-model:value="searchKeyword"
        placeholder="输入关键词搜索文章..."
        size="large"
        enter-button
        @search="handleSearch"
        @keyup.enter="handleSearch"
        ref="searchInput"
      />
      
      <!-- 热门搜索和提示 -->
      <div class="search-tips">
        <div class="hot-searches" v-if="hotSearchTags.length > 0">
          <span class="tips-title">热门搜索：</span>
          <a 
            v-for="(tag, index) in hotSearchTags" 
            :key="index"
            @click="quickSearch(tag)"
            class="hot-tag"
          >{{ tag }}</a>
        </div>
        <div class="hot-searches" v-else>
          <span class="tips-title">暂无热门搜索词</span>
        </div>
        <div class="keyboard-tips">
          <span><i class="bi bi-keyboard"></i> ESC 关闭</span>
          <span><i class="bi bi-keyboard"></i> Enter 搜索</span>
          <span><i class="bi bi-keyboard"></i> Ctrl+K 快捷打开</span>
        </div>
      </div>
      
      <div class="search-close" @click="toggleSearchBox">
        <i class="bi bi-x-lg"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Switch from "./Switch.vue";
import { AntDesignOutlined } from "@ant-design/icons-vue";
import { getHotTags } from "@/api/Article";
const user = useRouter();
const route = useRoute();
const router = useRouter();

// 搜索相关
const showSearchBox = ref(false);
const searchKeyword = ref('');
const searchInput = ref(null);
const hotSearchTags = ref([]);

// 获取热门标签
const fetchHotTags = async () => {
  try {
    const res = await getHotTags();
    if (res.code === 200) {
      // 取前6个热门标签，并提取标签名称
      hotSearchTags.value = res.data.slice(0, 6).map(item => item.tagName);
    } else {
      // 如果API失败，使用默认标签
      hotSearchTags.value = ['Vue', 'JavaScript', 'Spring Boot', '前端开发', '后端技术', '编程教程'];
    }
  } catch (error) {
    console.error('获取热门标签失败:', error);
    // 出错时使用默认标签
    hotSearchTags.value = ['Vue', 'JavaScript', 'Spring Boot', '前端开发', '后端技术', '编程教程'];
  }
};

// 切换搜索框显示状态
const toggleSearchBox = () => {
  showSearchBox.value = !showSearchBox.value;
  
  // 如果搜索框显示，则自动聚焦输入框
  if (showSearchBox.value) {
    setTimeout(() => {
      searchInput.value && searchInput.value.focus();
    }, 100);
  }
};

// 处理键盘事件
const handleKeyDown = (event) => {
  // ESC键关闭搜索框
  if (event.key === 'Escape' && showSearchBox.value) {
    showSearchBox.value = false;
  }
  
  // Ctrl+K 或 Command+K 打开搜索框
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault(); // 阻止浏览器默认行为
    toggleSearchBox();
  }
};

// 监听键盘事件
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  // 组件挂载时获取热门标签
  fetchHotTags();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

// 处理搜索
const handleSearch = (value) => {
  if (value && value.trim()) {
    router.push({
      path: '/search',
      query: { keyword: value.trim() }
    });
    showSearchBox.value = false;
  }
};

// 激活菜单的函数

const navList = [
  {
    id: 1,
    title: "文章",
    icon: "bi-archive",
    path: "",
    children: [
      {
        id: 1.1,
        title: "分类",
        path: "category",
        icon: "bi-archive",
      },
      {
        id: 1.2,
        title: "标签",
        path: "tag",
        icon: "bi-tags",
      },
    ],
  },
  {
    id: 3,
    title: "留言版",
    path: "message",
    icon: "bi-envelope",
  },
  {
    id: 3,
    title: "关于我",
    path: "about",
    icon: "bi-window-stack",
  },
];
// 当前路径
const currentPath = computed(() => route.path);

// 判断是否是当前菜单或子菜单激活
function isMenuActive(item) {
  if (item.path && currentPath.value.includes(`/${item.path}`)) {
    return true;
  }
  if (item.children) {
    return item.children.some(
      (child) => currentPath.value === `/${item.path}/${child.path}`
    );
  }
  return false;
}
// 移动端
// 抽屉开关
const visible = ref(false);
const divStyle = ref({ display: "block" });
// 当前展开的子菜单
const currentSubMenu = ref("");

// 切换子菜单显示
const toggleSubMenu = (name) => {
  currentSubMenu.value = currentSubMenu.value === name ? "" : name;
};

// 快速搜索方法
const quickSearch = (tag) => {
  searchKeyword.value = tag;
  handleSearch(tag);
};
</script>
<style lang="scss" scoped>
// .router-link-active {
//   color: #0c94ed;
// }

// .router-link-exact-active {
//   color: #0c94ed;
// }
nav,
.nav-box {
  display: flex;
  align-items: center;
  z-index: 9;
  // position: fixed;
  // top: 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

nav {
  width: 100%;
  height: 80px;
  justify-content: space-around;
  background-color: transparent;
}

.nav-box {
  max-width: 1400px;
  justify-content: space-between;
  padding: 0 20px;
  height: 100px;
  max-width: 1400px;
  background-color: transparent;
  margin: 0 auto;
  


  .logo {
    width: 100px;
    height: auto;
  }

  .nav-right {
    display: flex;
    align-items: center;
    position: relative;

    ul {
      display: flex;
      position: relative;

      li {
        display: flex;
        align-items: center;
        margin: 0 10px;
        position: relative;
        cursor: pointer;

        a {
          display: flex;
          height: 60px;
          line-height: 60px;
          font-size: 16px;
          text-decoration: none;

          // color: #000;
          &:hover {
            color: #0c94ed;
          }
        }

        &:hover .dropdown-menu {
          opacity: 1;
          -webkit-transform: translateX(-50%) rotateX(0) rotateX(0);
          transform: translateX(-50%) rotateX(0) rotateX(0);
          -webkit-transition: opacity 0.1s, -webkit-transform 0.3s;
          -o-transition: transform 0.3s, opacity 0.1s;
          transition: transform 0.3s, opacity 0.1s;
          transition: transform 0.3s, -webkit-transform 0.3s;
          visibility: visible;
        }

        &:hover {
          .dropdown {
            -webkit-transform: rotate(-180deg);
            -ms-transform: rotate(-180deg);
            transform: rotate(-180deg);
            -webkit-transition: -webkit-transform 0.3s;
            -o-transition: transform 0.3s;
            transition: transform 0.3s;
            transition: transform 0.3s, -webkit-transform 0.3s;
          }
        }
      }
    }

    .dropdown-menu {
      opacity: 0;
      width: auto;
      position: absolute;
      left: 40%;
      top: 50px;
      background: var(--bg-color);
      line-height: 30px;
      min-width: 100px;
      max-width: 200px;
      text-align: center;
      display: block;
      transform: translateX(-50%);
      background-color: var(--bg-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      opacity: 0;
      transition: all 0.3s ease;
      visibility: hidden;

      & a {
        display: block;
        height: 50px;
        margin-right: 0;
        line-height: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 15px;
        transition: color 0.35s, 0.35s;
        -webkit-transition: -webkit-transform 0.3s;
        -o-transition: transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
      }

      & a:hover {
        background-color: rgb(201, 201, 201, 0.3);
        color: #0c94ed;
      }
    }

    .search-btn {
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // width: 38px;
      height: 35px;
      margin: 0 10px;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 50%;
      
      &:hover {
        color: #0c94ed;
        transform: scale(1.1);
      }
    }

    .switch {
      height: 38px;
    }

  }

  // 移动端
  .nav-box__wrap {
    display: none;

    .nav-right__warp {
      display: flex;
      align-items: center;
    }

    .warp-drawer {
      .nav-warp {
        margin-top: 20px;
        padding: 0 5px;

        .dropdown__warp {
          a {
            width: 45%;
            display: inline-block;
          }
        }

        ul {
          display: flex;
          flex-direction: column;
          line-height: 30px;
          padding: 0 10px;
          li {
            position: relative;
          }
        }

        .dropdown-warp__icon {
          width: 100%;
          position: absolute;
          text-align: right;
          top: 0;
          text-align: center;
          -webkit-transition: all 0.3s ease-out 0s;
          -o-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
          // color: #fff;
        }

        .shake {
          -webkit-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          transform: rotate(180deg);
        }

        .dropdown-menu__warp {
          display: none;

          a {
            width: 100%;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .nav-box {
    .nav-right {
      display: none;
    }

    // 移动端
    .nav-box__wrap {
      display: block;
    }
  }
}

// 搜索弹窗
.search-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
  
  .search-content {
    width: 80%;
    max-width: 600px;
    padding: 2rem;
    background-color: var(--bg-color);
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: slideDown 0.3s ease;
    
    .search-tips {
      margin-top: 1.5rem;
      
      .hot-searches {
        margin-bottom: 1rem;
        
        .tips-title {
          font-size: 0.9rem;
          color: var(--text-secondary-color, #666);
          margin-right: 0.5rem;
        }
        
        .hot-tag {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          background-color: rgba(12, 148, 237, 0.1);
          color: #0c94ed;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
          
          &:hover {
            background-color: rgba(12, 148, 237, 0.2);
          }
        }
      }
      
      .keyboard-tips {
        display: flex;
        justify-content: flex-end;
        color: var(--text-secondary-color, #666);
        font-size: 0.8rem;
        
        span {
          margin-left: 1rem;
          
          i {
            margin-right: 0.3rem;
          }
        }
      }
    }
    
    .search-close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s ease;
      
      i {
        font-size: 1.2rem;
      }
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
