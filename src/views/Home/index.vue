<template>
  <div>
    <PageReuse :list="list">
      <!-- <WidgetTags></WidgetTags> -->
    </PageReuse>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import PageReuse from "@/views/Home/PageReuse/PageReuse.vue";
import { getArticleList } from "@/api/Article";

//分页参数
let params = {
  page: 1,
  pageSize: 10,
};
//获取文章列表
const list = ref([]);
//进入页面获取数据
const getArticlelist = async (params) => {
  const res = await getArticleList(params);
  if (res.code === 200) {

    //获取数据成功
    list.value = res.data.rows;
  }
};
onMounted(() => {
  getArticlelist(params);
});
</script>
<style lang="scss" scoped>
.router-link-active {
  color: #0c94ed;
}

.router-link-exact-active {
  color: #0c94ed;
}

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
      left: 50%;
      top: 50px;
      background: var(--bg-color);
      line-height: 30px;
      border-radius: 5px;
      min-width: 100px;
      max-width: 200px;
      text-align: center;
      display: block;
      -webkit-transform: translateX(-50%) rotateX(-90deg) rotateX(-45deg);
      transform: translateX(-50%) rotateX(-90deg) rotateX(-45deg);
      -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transition: opacity 0.1s 0.2s, visibility 0.1s 0.3s,
        -webkit-transform 0.3s;
      -o-transition: transform 0.3s, opacity 0.1s 0.2s, visibility 0.1s 0.3s;
      transition: transform 0.3s, opacity 0.1s 0.2s, visibility 0.1s 0.3s;
      transition: transform 0.3s, opacity 0.1s 0.2s, visibility 0.1s 0.3s,
        -webkit-transform 0.3s;
      visibility: hidden;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      & a {
        display: block;
        height: 34px;
        margin-right: 0;
        line-height: 34px;
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
