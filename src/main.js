import { createApp } from 'vue'
import App from './App.vue'
// 引入模板的全局的样式
import "@/assets/styles/global.scss"
//Bootstrap 图标库
import "bootstrap-icons/font/bootstrap-icons.css"
import router from './router/index'
import pinia from './stores/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'


const app = createApp(App)



app.use(router)
app.use(pinia)
app.use(Antd)

//粒子特效
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim"
app.use(Particles ,{
    init: async (engine) => {
      await loadSlim(engine);
    },
  });

app.mount('#app')

