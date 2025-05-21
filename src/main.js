import { createApp } from 'vue'
import App from './App.vue'
// 引入模板的全局的样式
import "@/assets/styles/global.scss"
//Bootstrap 图标库
import "bootstrap-icons/font/bootstrap-icons.css"
const app = createApp(App);
//路由
import router from './router/index'
app.use(router);

//粒子特效
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim"
app.use(Particles ,{
    init: async (engine) => {
      await loadSlim(engine);
    },
  });
//Antd UI
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd);

// Pinia
import pinia from './stores/index'
app.use(pinia);

app.mount('#app');

