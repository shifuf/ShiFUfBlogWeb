<template>
  <div class="pagerview">
    <div class="pagerBox centerLocation">
      <ul class="pagination">
        <!-- 上一页按钮 -->
        <li @click="handlePrevPage" :class="{ disabled: isPrevDisabled }">
          <a aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <!-- 页码列表 -->
        <li
          v-for="(item, index) in pageNumbers"
          :key="index"
          :class="{ active: item === currentPage }"
          @click="handleGoToPage(item)"
        >
          <a>{{ item === '...' ? '...' : item }}</a>
        </li>

        <!-- 下一页按钮 -->
        <li @click="handleNextPage" :class="{ disabled: isNextDisabled }">
          <a aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

// 组件 props 定义
const props = defineProps({
  modelValue: { // 使用 modelValue 作为 v-model 的默认 prop
    type: Number,
    default: 1
  },
  totalPages: { // 总页数
    type: Number,
    required: true
  },
  showCount: { // 显示的页码数量
    type: Number,
    default: 7
  }
});

// 组件事件定义
const emit = defineEmits(['update:modelValue']);

// 当前页码计算属性
const currentPage = computed(() => props.modelValue);

// 计算页码显示逻辑
const pageNumbers = computed(() => {
  const { modelValue, totalPages, showCount } = props;
  const half = Math.floor(showCount / 2);

  if (totalPages <= 0) return []; // 无数据时不显示页码

  if (totalPages <= showCount) {
    // 总页数少于显示数量，显示全部页码
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (modelValue <= half + 1) {
    // 当前页在前半部分，显示前几页 + 省略号 + 最后一页
    return [1, 2, 3, 4, 5, '...', totalPages];
  } else if (modelValue >= totalPages - half) {
    // 当前页在后半部分，显示第一页 + 省略号 + 后几页
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else {
    // 当前页在中间，显示第一页 + 省略号 + 当前页附近 + 省略号 + 最后一页
    return [1, '...', modelValue - 1, modelValue, modelValue + 1, '...', totalPages];
  }
});

// 判断上一页按钮是否禁用
const isPrevDisabled = computed(() => currentPage.value <= 1);

// 判断下一页按钮是否禁用
const isNextDisabled = computed(() => currentPage.value >= props.totalPages);

// 上一页处理函数
const handlePrevPage = () => {
  if (!isPrevDisabled.value) {
    emit('update:modelValue', currentPage.value - 1);
  }
};

// 下一页处理函数
const handleNextPage = () => {
  if (!isNextDisabled.value) {
    emit('update:modelValue', currentPage.value + 1);
  }
};

// 跳转到指定页处理函数
const handleGoToPage = (page) => {
  if (page !== '...' && page !== currentPage.value) {
    emit('update:modelValue', page);
  }
};
</script>

<style lang="scss" scoped>
.pagerview {
  margin: 25px 0 20px;

  .pagerBox {
    margin: 5px 0;
    text-align: center;

    .pagination {
      margin-bottom: 0;
      list-style: none;
      padding: 0;

      li {
        display: inline-block;
        margin: 0 5px;
        padding: 0 4px;
        min-width: 50px;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        border-radius: 2px;
        background-color: #f4f4f5;
        color: #606266;
        cursor: pointer;
        transition: background-color 0.2s;

        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
          pointer-events: none;
        }

        &.disabled {
          cursor: not-allowed;
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }
  }
}
</style>