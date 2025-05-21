<template>
  <div style="margin-top: 30px">
    <!-- 主体内容 -->
    <main class="content">
      <!-- 左侧最近文章 -->
      <div class="list">
        <div class="tags-layout">
          <slot> </slot>
        </div>
        <!-- 文章 -->
        <div class="list-item" v-for="(item, index) in props.list">
          <!-- 文章图片 -->
          <div class="item-img">
            <RouterLink :to="'/article/'+item.id">
              <a-image class="img" :src="item.articleCover" :alt="item.title" lazy />
              <div class="cat-float">
                {{ item.categoryName }}
              </div>
            </RouterLink>
          </div>
          <!-- 文章标题摘要 -->
          <div class="item-info">
            <!-- 标题 -->
            <div class="item-title">
              <RouterLink :to="'/article/'+item.id" :title="item.title">
                <h2>{{ item.title }}</h2>
              </RouterLink>
              <!-- 摘要 -->
              <!-- <p class="intro">{{ item.content }}</p> -->
            </div>

            <!-- 标签 -->
            <div class="article-meta">
              <div class="tags">
                <span v-for="tags in item.tag">
                  <RouterLink :to="'/tag/'+tags.id"><i>#</i>{{ tags.tagName }}</RouterLink>
                </span>
              </div>
              <div class="date">
                <div>
                  <!-- 点赞 -->
                  <span><i class="iconfont bi-hand-thumbs-up">{{ item.countLike }}</i></span>
                  <!-- 收藏 -->
                  <span><i class="iconfont bi-heart">{{ item.countFavorite }}</i></span>
                  <!-- 浏览 -->
                  <span
                    ><i class="iconfont bi-eye">{{ item.viewCount }}</i></span
                  >
                </div>
                <span>{{ item.createTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
.tags-layout {
  width: 100%;
}
// 主体
.content {
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 5rem 20px;

  // 左侧最近文章
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
    width: calc(100% - 300px);
    width: 75%;
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

  // 右侧
  .aside-content {
    width: calc(25% - 30px);
    height: auto;
    // background: red;
    margin-right: 10px;

    .card-widget {
      border-radius: 12px;
    }

    .ipCard {
      height: 180px;
      width: 100%;
      margin-top: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .content {
    .list {
      width: 100%;

      .list-item {
        .item-info {
          height: 100%;
        }
      }
    }

    .aside-content {
      margin-left: 20px;
    }
  }
}

@media screen and (max-width: 1020px) {
  .aside-content,
  .intro,
  .date span:nth-child(2n + 1) {
    display: none;
  }
}

@media screen and (max-width: 760px) {
  .content {
    width: 100%;

    .list {
      .list-item {
        height: 225px;
        width: 100%;
        flex-direction: row;
      }
    }

    .tags {
      display: none;
    }
  }
}

@media screen and (max-width: 680px) {
  .content {
    .list {
      .list-item {
        width: 100%;
        height: 100%;
        flex-direction: column;

        .item-img {
          height: 170px;
        }
      }
    }
  }
}

@media screen and (max-width: 300px) {
  .content {
    flex-direction: column;
    padding: 0 20px;
  }
}
</style>
