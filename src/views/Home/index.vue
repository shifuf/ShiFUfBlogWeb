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
import {useTitle} from "@vueuse/core";
import { getSeoSettings } from "@/api/Website";

//分页参数
let params = {
  page: 1,
  pageSize: 20,
};
//获取文章列表
const list = ref([]);
//进入页面获取数据
const getArticlelist = async (params) => {
  const res = await getArticleList(params);
  if (res.code === 200) {
    //获取数据成功
    list.value = res.data.rows;
      //获取网站设置
     let title = await getSeoSettings()
    useTitle(title.data.siteName);
    console.log(title.data.siteName);
  }
};
onMounted(() => {
  getArticlelist(params);

});
</script>
<style lang="scss" scoped>
</style>
