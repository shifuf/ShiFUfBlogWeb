<template>
  
  <div class="page-container">
    <vue-particles id="tsparticles" :options="particlesOptions" />
    
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const particlesOptions = ref({
  "autoPlay": true, //自动播放
  "background": {
    "color": {
      "value": "#fff"
    },
    "opacity": 0
  },
  "duration": 0, //持续时间
  "fpsLimit": 120, //帧数限制
  particles: {
    "color": {
      "value": "#fff",
    },
    "move": {//粒子移动
      "direction": "right",//粒子方向
      "enable": true,//是否启用粒子
      "speed": 3,//粒子速度
      // outModes: 'bounce', //粒子出界模式
    },
    random: false, //粒子随机
    straight: false, //粒子直线
    links: {//粒子连接
      color: '#fff',
      distance: 150,
      enable: false,
      opacity: 0.3,
      width: 0.3
    },
    "shadow": { //粒子阴影
      "blur": 0, //粒子阴影模糊
      "color": {
        "value": "#000" //粒子阴影颜色
      },
      "enable": false,
    },
    "number": {
      "value":200 //粒子数量
    },
    shape: {
      type: 'circle'
    },
    "size": {
      "value": 1 //粒子大小,
    },
  },
});
</script>
<style lang="scss" scoped>
body {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  color: #333;
}
.page-container {
  position: relative;
  width: 100%;
  height: 100%;
}

#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none; // 关键修改：禁用粒子画布的事件捕获
  z-index: 0; // 确保粒子效果在最底层
}

.content-wrapper {
  position: relative;
  z-index: 1; // 确保内容在粒子效果之上
  min-height: 100vh; // 确保内容区域至少占据整个视口高度
}
</style>
