<template>
  <!-- <el-button type="primary" @click="isOpen = true">Primary</el-button> -->
  <div class="drawer-wrapper" :class="{ 'is-open': isOpen }" >
    <div class="drawer-content"  @click.stop  >
      <!-- 抽屉的内容 -->
      <slot></slot>
    </div>
    <div class="backdrop" @click="closeDrawer" ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false)  
  
const props = defineProps({  
  open: {  
    type: Boolean,  
    default: false  
  }  
})  
// const emit = defineEmits(['update:open'])  
  
// watch(() => props.open, (newVal) => {  
//   isOpen.value = newVal  
// })  
  
const closeDrawer = () => {  
  isOpen.value = false  
  // emit('update:open', false)  
  document.body.style.overflow = '';
}  

const open = () =>{
  isOpen.value = true
  document.body.style.overflow = 'hidden';
}
// 暴漏给父组件的数据
defineExpose({open})


</script>

<style scoped>
.drawer-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  /*overflow: hidden; /~ 防止主内容区域滚动 ~/ */
}

.drawer-wrapper.is-open {
  opacity: 1;
  pointer-events: auto;
  z-index: 999;
}

.drawer-content {
  z-index: 1000;
  width: 300px;
  height: 100%;
  overflow: auto;
  background:var(--bg-color);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-x: hidden;
}

.drawer-wrapper.is-open .drawer-content {
  transform: translateX(0);
}

.backdrop {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* backdrop-filter: saturate(180%) blur(10px); */
  transition: transform 0.3s ease;
}
</style>
