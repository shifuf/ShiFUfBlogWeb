<template>
  <nav class="nav-box">
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
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Switch from "./Switch.vue";
import { AntDesignOutlined } from "@ant-design/icons-vue";
const user = useRouter();
const route = useRoute();

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
      {
        id: 1.3,
        title: "时间轴",
        path: "timeline",
        icon: "bi-clock",
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
  position: fixed;
  top: 0;
}

nav {
  width: 100%;
  height: 80px;
  justify-content: space-around;
  background-color: var(--bg-color);
}

.nav-box {
  max-width: 1400px;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
  height: 100px;
  max-width: 1400px;

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
          transition: transform 0.3s, opacity 0.1s, -webkit-transform 0.3s;
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
</style>
