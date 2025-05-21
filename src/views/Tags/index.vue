<template>
  <main class="box">
    <div class="box_card">
      <div class="content">
        <div class="list" v-if="paramsId">
          <WidgetTags
            :list="tagyList"
            :path="'tag'"
            @tagChange="handleTagChange"
          ></WidgetTags>
          <div class="tags-layout">
            <slot> </slot>
          </div>
          <!-- 文章 -->
          <div
            class="list-item"
            v-for="(item, index) in articleList"
            :key="index"
          >
            <!-- 文章图片 -->
            <div class="item-img">
              <RouterLink :to="'/article/' + item.id">
                <a-image
                  class="img"
                  :src="item.articleCover"
                  :alt="item.title"
                  lazy
                />
                <div class="cat-float">
                  {{ item.categoryName }}
                </div>
              </RouterLink>
            </div>
            <!-- 文章标题摘要 -->
            <div class="item-info">
              <!-- 标题 -->
              <div class="item-title">
                <RouterLink :to="'/article/' + item.id" :title="item.title">
                  <h2>{{ item.title }}</h2>
                </RouterLink>
                <!-- 摘要 -->
                <!-- <p class="intro">{{ item.content }}</p> -->
              </div>

              <!-- 标签 -->
              <div class="article-meta">
                <div class="tags">
                  <span v-for="tags in item.tag">
                    <RouterLink :to="'/tag/' + tags.id"
                      ><i>#</i>{{ tags.tagName }}</RouterLink
                    >
                  </span>
                </div>
                <div class="date">
                  <div>
                    <!-- 点赞 -->
                    <span
                      ><i class="iconfont bi-hand-thumbs-up">{{
                        item.countLike
                      }}</i></span
                    >
                    <!--<!~~ 收藏 ~~>
                  <span><i class="iconfont bi-heart">{{ item.countFavorite }}</i></span>
                  <!~~ 浏览 ~~>
                  <span
                    ><i class="iconfont bi-eye">{{ item.viewCount }}</i></span
                  >-->
                  </div>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="article-categories">
            <h2>标签分类</h2>
            <ul>
              <li
                v-for="(category, index) in tagyList"
                :key="index"
                :style="{ background: getRandomGradient() }"
              >
                <router-link
                  :to="`/tag/${category.id}`"
                  class="category-link"
                  >| {{ category.name }}</router-link
                >
                <div class="icon-text">
                  <i class="fas fa-folder"></i>
                  <span>{{ category.count }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sider_content">右侧</div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import WidgetTags from "@/components/Widget/Tag.vue";
import { getTagList, getTagArticle } from "@/api/Tag";
import { useRoute } from "vue-router";
const route = useRoute();
const paramsId = ref(route.params.id); // 响应式路由参数

// 分类列表
const tagyList = ref([]);
// 获取分类列表
const fetchGetTagList = async () => {
  const res = await getTagList();
  if (res.code === 200) {
    tagyList.value = res.data.rows;
  }
};

//文章列表
const articleList = ref([]);

// 处理标签变化事件
const handleTagChange = (id) => {
  getTagArticle({ id }).then((res) => {
    if (res.code === 200) {
      articleList.value = res.data.rows;
      console.log(res.data.rows);
    }
  });
};

// 随机生成一个十六进制颜色
function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

// 返回随机渐变背景
function getRandomGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  return `linear-gradient(90deg, ${color1}, ${color2})`;
}
// 路由参数监听（核心优化点）
watch(
  () => route.params.id,
  (newId) => {
    paramsId.value = newId;
    if (newId) {
      handleTagChange(newId);
    }
  },
  { immediate: true } // 立即执行一次以处理初始状态
);

//加载数据
// 获取分类列表
onMounted(() => {
  fetchGetTagList()
});
</script>
<style lang="scss" scoped>
// 主体
.box {
  max-width: 1400px;
  // display: flex;
  // justify-content: space-between;
  margin: 0 auto;
  padding: 10rem 20px;
  .box_card {
    display: flex;
  }
  //左侧
  .content {
    width: calc(100% - 300px);
    height: fit-content;
    animation: slide-in 0.6s 0.1s backwards;
    box-shadow: 0 8px 16px -4px #2c2d300c;
    padding: 1rem 2rem;
    border-radius: 12px;
    background: var(-bg-color);
    border: 1px solid #e3e8f7;
    // 左侧最近文章
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      align-content: flex-start;
      // width: calc(100% - 300px);
      // width: 75%;
      height: fit-content;
      // background: blue;

      // 文章列表
      .list-item {
        flex-direction: column;
        width: calc(100% / 2 - 0.5rem);
        margin-bottom: 0.75rem;
        position: relative;
        overflow: hidden;
        will-change: transform;
        // background-color: yellow;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-align: center;
        align-items: center;
        transition: all 0.3s ease 0s;
        border-radius: 12px;
        box-shadow: var(--shadow-border);
        border: 1px solid var(--border-color);

        // 文章图片
        .item-img {
          width: 100%;
          height: 100%;
          display: flex;

          a {
            min-height: 100%;
            min-width: 100%;
            background-color: transparent;
            text-decoration: none;
            transition: all 0.3s ease 0s;
            overflow-wrap: break-word;
            -webkit-user-drag: none;
          }

          .img {
            width: 100%;
            height: 100%;
            transition: all 0.6s ease 0s;
            object-fit: cover;
            max-width: 100%;
          }

          .cat-float {
            position: absolute;
            top: 10px;
            left: 5px;
            padding: 0.5rem 1rem;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            border-radius: 5px;
            font-size: 14px;
            padding: 2px 8px;
          }
        }

        // 文章标题摘要
        .item-info {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          // justify-content: space-between;
          justify-content: center;
          width: 100%;
          height: 150px;
          // background-color: var(--card-bg-color); --不使用背景让粒子穿透

          .article-meta {
            .tags {
              margin-right: 8px;
              padding: 0 0.2rem;
              padding-left: 0;

              i {
                color: var(--tags-color);
              }
            }

            span {
              margin-right: 0.6rem;
              font-size: 1.06rem;
            }

            .date {
              margin-top: 0.6rem;

              .iconfont {
                font-style: normal;
                font-size: 1.2rem;
              }

              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
  // 路由无参时
  .article-categories {
    h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    ul {
      display: flex;
      gap: 20px;

      li {
        width: 200px;
        height: 80px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        .category-link {
          font-size: 16px;
          color: white;
          text-decoration: none;
          margin: 0;
          padding-left: 5px;
          position: relative;
        }

        .icon-text {
          display: flex;
          align-items: center;
          color: white;
          margin-top: 10px;

          i {
            margin-right: 5px;
          }

          span {
            font-size: 18px;
          }
        }
      }
    }
  }
  //右侧
  .sider_content {
    width: calc(25% - 30px);
    height: fit-content;
    margin-right: 10px;
    margin-left: 15px;
  }
}
</style>
