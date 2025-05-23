<template>
  <header class="header" :style="articleDetail.articleCover ? { backgroundImage: `url(${articleDetail.articleCover})` } : {}">
    <div class="bg-overlay"></div>
    <div class="info" >
      <div class="firstinfo">
        <div class="meta-firstline">
          <!-- <RouterLink class="meta-original" to="/" title="转载">转载</RouterLink> -->
          <!-- 分类 -->
          <span class="meta-categories">
            <RouterLink :to="`/category/${articleDetail.categoryId}`">{{ articleDetail. categoryName}}</RouterLink>
          </span>
          <!-- 标签 -->
          <div class="tag_share" v-for="item in articleDetail.tag">
            <div class="meta__tag-list">
              <RouterLink class="meta__tags" :to="`/tag/${item.id}`"><i class="iconfont jinghao"></i>#{{item.tagName}}</RouterLink>
              <!-- <RouterLink class="meta__tags" to="/"><i class="iconfont jinghao"></i>Nuxt</RouterLink> -->
            </div>
          </div>
        </div>
      </div>
      <h1 class="title">{{articleDetail.title}}</h1>
      <div class="meta">
        <div class="meta-secondline">
          <div class="meta__date">
            发布时间<time class=" shijian">{{articleDetail.updateTime}}</time>
          </div>
          <div>字数统计<i class="iconfont  bi-file-earmark-font"></i>{{countMd}}</div>
          <div><i class="iconfont bi-eye"></i>{{articleDetail.viewCount}}</div>
          <div><i class="iconfont bi-heart"></i>{{articleDetail.countLike}}</div>
        </div>
      </div>
    </div>

  </header>

  <!-- 文章详情 -->
  <main class="layout">
    <div class="details">
      <div class="content">

        <MdPreview :id="mdeditorId" :modelValue="articleDetail.content" :theme="editorTheme" :on-html-changed="mdHtml"/>
      </div>
      <!-- 版权声明 -->
      <div class="copyright">
        <a class="copyright__author_img">
          <img src="https://q1.qlogo.cn/g?b=qq&nk=2523059882&s=100" alt="">
        </a>
        <div class="copyright__author">
          <RouterLink to="/" class="copyright-title">快乐是福</RouterLink>
        </div>
        <div class="copyright__notice">
          <div class="copyright-info">
            <span>本文是原创文章，<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">采用 CC
                BY-NC-ND4.0 协议</a>，完整转载请注明来自 快乐是福</span>
          </div>
        </div>
        <div class="tool">
          <div class="tool-left">
            <div class="controls">
              <a-button
                type="primary"
                class="action-btn"
                @click="handleLike"
                :class="{ 'liked': articleDetail.isLiked }">
                <template #icon>
                  <i class="iconfont bi-heart" :class="{ 'filled': articleDetail.isLiked }"></i>
                </template>
                {{ articleDetail.isLiked ? '已点赞' : '点赞' }} ({{ articleDetail.countLike || 0 }})
              </a-button>
              <a-button
                type="default"
                class="action-btn"
                @click="handleFavorite"
                :class="{ 'favorited': articleDetail.isFavorited }">
                <template #icon>
                  <i class="iconfont bi-star" :class="{ 'filled': articleDetail.isFavorited }"></i>
                </template>
                {{ articleDetail.isFavorited ? '已收藏' : '收藏' }}
              </a-button>
            </div>
          </div>
          <div class="tool-right">
            <div class="tag_share">
              <div class="meta__tag-list">
                <RouterLink class="meta__tag" :to="`/category/${articleDetail.categoryId}`"><span >{{articleDetail.categoryName}}</span></RouterLink>
              </div>
            </div>
            <div class="tag_share" v-for="item in articleDetail.tag">
              <div class="meta__tag-list">
                <RouterLink class="meta__tag" :to="`/tag/${item.id}`"><span >#{{item.tagName}}</span></RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="msg">
      <MessageBoard :article-id="articleId" />
    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { getArticleDetail, likeArticle, favoriteArticle } from "@/api/Article";
import { useRoute } from "vue-router";
import { MdPreview } from 'md-editor-v3';
import {useColorMode, useTitle} from "@vueuse/core";
import 'md-editor-v3/lib/preview.css';
import { message } from 'ant-design-vue';
import MessageBoard from './MessageBoard/index.vue';

//根据路由参数获取文章id
const route = useRoute();
const articleId = route.params.id;
console.log(articleId);
//获取文章详情
const articleDetail = ref([]);
//监听路由参数变化
watch(
  () => route.params.id,
  () => {
    getDetail();
  }
);
//进入页面获取数据
onMounted(async () => {
  await getDetail();
});

/**
 * 获取文章详情
 * @param {number} articleId 文章id
 * @returns {Promise<void>}
 */
const getDetail = async () => {
  const res = await getArticleDetail(articleId);
  if (res.code === 200) {
    //处理时间格式
    res.data.createTime = res.data.createTime.split(' ')[0]
    res.data.updateTime = res.data.updateTime.split(' ')[0]
    
    // 处理点赞和收藏状态
    res.data.isLiked = res.data.liked || false;
    res.data.isFavorited = res.data.favorited || false;
    
    //获取数据成功赋值
    articleDetail.value = res.data;
    useTitle(`快樂是福-${articleDetail.value.title}`);
    console.log(articleDetail.value);
  }
};

// 编辑器相关
const mdeditorId = 'preview-only';
const editorTheme = useColorMode();
//字数统计
 const countMd = ref(0)
 function mdHtml(htmlText) {
  // 获取html中的所有文字，去掉空格与标点符号
  const text = htmlText.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "").replace(/[ ]/g, "").replace(/[\s+\.\!\/_,$%^*(+\"\']+|[+——！，。？、~@#￥%……&*（）]+/g, "")
  countMd.value = countWords(text.length)
};
//获取字数
function countWords(count) {
  if (count <= 1000) {
    return count
  } else {
    let counts = (count / 1000);
    // 留小数点一位数
    counts = (counts.toFixed(1));
    return counts + 'k';
  }
};

// 处理点赞
const handleLike = async () => {
  try {
    const res = await likeArticle(articleId);
    if (res.code === 200) {
      // 更新本地状态
      articleDetail.value.isLiked = !articleDetail.value.isLiked;
      articleDetail.value.countLike = articleDetail.value.isLiked 
        ? (articleDetail.value.countLike || 0) + 1 
        : (articleDetail.value.countLike || 1) - 1;
      
      message.success(articleDetail.value.isLiked ? '点赞成功' : '已取消点赞');
    } else {
      message.error(res.msg || '操作失败');
    }
  } catch (error) {
    console.error('点赞操作失败:', error);
    message.error('操作失败，请稍后重试');
  }
};

// 处理收藏
const handleFavorite = async () => {
  try {
    const res = await favoriteArticle(articleId);
    if (res.code === 200) {
      // 更新本地状态
      articleDetail.value.isFavorited = !articleDetail.value.isFavorited;
      message.success(articleDetail.value.isFavorited ? '收藏成功' : '已取消收藏');
    } else {
      message.error(res.msg || '操作失败');
    }
  } catch (error) {
    console.error('收藏操作失败:', error);
    message.error('操作失败，请稍后重试');
  }
};
</script>
<style lang="scss" scoped>
#tp-weather-widget {
  min-height: 200px;
  min-width: 200px;
  background-color: red;
}
.header {
  position: relative;
  padding: 1rem 1.5rem;
  display: flex;
  width: 100%;
  justify-content: center;
  height: 25rem;
  background-color: rgb(203, 209, 211);
  background-size: cover;
  background-position: center;
  z-index: 0;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  .bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7));
    z-index: 2;
  }
}

.info {
  width: 100%;
  text-align: center;
  top: 0;
  position: absolute;
  padding: 0 3rem;
  margin: 0 auto;
  z-index: 10;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: calc(100% + 0px);
  justify-content: center;
  animation: slide-in 0.6s 0s backwards;

  .firstinfo {
    text-align: left;
    display: flex;
    white-space: nowrap;

    .meta-firstline {
      display: flex;
      align-items: center;
      height: 32px;

      a {
        text-decoration: none;
        transition: all 0.3s ease 0s;
        overflow-wrap: break-word;
        -webkit-user-drag: none;
        color: #fff;
      }

      .meta-original,
      .meta-categories,
      .meta__tags {
        height: 32px;
        line-height: 32px;
        background: rgba(255, 255, 255, 0.2) !important;
        color: #fff !important;
        /*color: var(--Jay-white)!important;*/
        padding: 0 0.5rem;
        font-size: 0.7rem;
        margin: auto;
        border-radius: 8px;
        font-weight: 700;
        transition: 0.3s ease-out;
      }

      .meta-original {
        width: 100%;
        height: 100%;
        display: flex;
        margin-right: 10px;
      }

      .meta-original,
      .meta-categories {
        &:hover {
          background: rgba(255, 255, 255, 0.4) !important;
          color: #fff !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
      }

      .tag_share {
        display: flex;
        align-items: center;
        margin-left: 1rem;

        .meta__tag-list {
          display: flex;
          align-items: center;

          .meta__tags {
            background: rgba(255, 255, 255, 0.1) !important;
            border-radius: 8px;
            font-weight: 700;
            transition: 0.3s ease-out;
            margin-left: 10px;
            opacity: 0.8;

            &:hover {
              background: rgba(255, 255, 255, 0.3) !important;
              color: #fff !important;
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
              opacity: 1;
            }
          }
        }
      }
    }
  }

  /*标题*/
  .title {
    color: #fff;
    font-weight: 700;
    font-size: 2.3rem;
    line-height: 1.2;
    text-align: left;
    margin: 1rem 0 1rem 0 !important;
    line-clamp: 2;
    padding: 0;
    overflow: hidden;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  /*时间*/
  .meta {
    color: #fff;
    margin-top: 0.4rem;
    transition: 0.3s;
    display: flex;

    .meta-secondline {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 8px 12px;
      border-radius: 8px;

      div {
        margin-right: 15px;
        opacity: 0.9;
      }
    }
  }
  .iconfont{
    padding-right: 5px;
  }
}

.layout {
  max-width: 1400px;
  // display: flex;
  padding: 1rem 1.5rem;
  margin: 0 auto;



  .details {
    width:100%;
    height: fit-content;
    animation: slide-in 0.6s 0.1s backwards;
    box-shadow: 0 8px 16px -4px #2c2d300c;
    padding: 1rem 2rem;
    border-radius: 12px;
    background: var(--card-bg-color);
    border: 1px solid #e3e8f7;

    .content {
      display: block;
      color: black;
    }
  }
  // .aside-content {
  //   width: calc(25% - 30px);
  //   height: fit-content;
  //   margin-right: 10px;
  //   margin-left: 15px;
  // }
  .msg{
    width: 100%;
    height: 100%;
    margin-top: 20px;
  }
  // 版权声明
  .copyright {
    display: flex;
    background: #f7f7f9;
    padding: 1rem 1.3rem;
    // overflow: hidden;
    border: 1px solid #e3e8f7;
    border-width: 1px;
    transition: 0.3s;
    position: relative;
    margin: 1.8rem 0px 0.5rem;
    border-radius: 12px;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
.copyright__author_img{
  width: 66px;
    height: 66px;
    margin: auto;
    border-radius: 66px;
    overflow: hidden;
    position: absolute;
    top: -33px;
    border: var(--style-border-always);
    box-shadow: var(--heo-shadow-main);
    img{
      max-width: 100%;
    transition: all 0.2s ease 0s;
    border-style: none;
    }
    &:hover img {
      transform: scale(1.05);
    }
}
  //
  .copyright__author {
    display: flex;
    align-items: center;
    margin-top: 40px;


    .copyright-title {
      padding-left: 0;
      color: #000;
      overflow: hidden;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 1rem;
      font-weight: bold;
    }
  }

  // 版权
  .copyright__notice {
    font-size: 0.7rem;
    line-height: 1rem;
    margin: 0.5rem 0;

    .copyright-info {
      color: #363636;
      padding-left: 0;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin-top: 15px;

      a {
        font-weight: bold;
      }
    }
  }

  // 工具
  .tool {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 1rem;
    flex-wrap: wrap;

    .tool-left {
      display: flex;
      align-items: center;

      .controls {
        display: flex;
        gap: 15px;
        
        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          
          &.liked {
            background-color: #ff4d4f;
            color: white;
            border-color: #ff4d4f;
          }
          
          &.favorited {
            background-color: #faad14;
            color: white;
            border-color: #faad14;
          }
          
          .iconfont {
            margin-right: 5px;
            
            &.filled {
              color: currentColor;
            }
          }
        }
      }
    }

    // 右侧标签
    .tool-right {
      display: flex;
      align-items: center;

      // 标签
      .tag_share {
        .meta__tag-list {
          display: flex;
          padding: 0;
          width: 100%;
          flex-wrap: wrap;
          flex-direction: row;

          .meta__tag {
            display: flex;
            align-items: center;
            // background: #79bbff;
            color: #fff;
            border: 1px solid #e3e8f7;
            padding: 0.2rem 0.5rem;
            font-size: 0.85em;
            border-radius: 8px;
            margin-right: 0.5rem;
            font-weight: bold;
            line-height: 1.5;
            white-space: nowrap;
            color: #363636;
            .tags-punctuation::before {
              content: "\e71a";
              font-family: "iconfont" !important;
              opacity: 0.4;
              margin-right: 2px;
            }

            .tagsPageCount {
              padding: 2px;
              background: #fff;
              border: 1px solid #e3e8f7;
              min-width: 22.5px;
              display: inline-block;
              border-radius: 4px;
              text-align: center;
              font-size: 0.6rem;
              color: #000;
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1300px) {
  .layout {
    justify-content: space-between;

    .details {
      width: 100%;
    }

    .aside-content {
      display: none;
    }
  }
}
</style>
