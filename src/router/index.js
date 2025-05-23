// 1引入路由对象
import { createRouter, createWebHistory } from 'vue-router'
// 2. 定义路由组件.
const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/components/layout/index.vue'),
        children: [
            // 首页
            {
                path: '',
                component: () => import('@/views/Home/index.vue'),
                name: 'home',
                meta: {
                    title: '快乐是福',
                }
            },
            // 分类
            {
                path: '/category/:id?',
                component: () => import('@/views/Category/index.vue'),
                name: 'category',
                meta: {
                    title: '分类',
                }
            },
            // 文章详情
            {
                path: '/article/:id?',
                component: () => import('@/views/Article/index.vue'),
                name: 'article',
                meta: {
                    title: '文章详情',
                }
            },
            // 标签
            {
                path: '/tag/:id?',
                component: () => import('@/views/Tags/index.vue'),
                name: 'tag',
                meta: {
                    title: '标签',
                }
            },
            // 搜索
            {
                path: '/search',
                component: () => import('@/views/Search/index.vue'),
                name: 'search',
                meta: {
                    title: '搜索文章',
                }
            },
            //用户中心
            {
                path: '/user',
                component: () => import('@/views/User/index.vue'),
                name: 'user',
                meta: {
                    title: '用户中心',
                }
            },

            // 关于
            {
                path: '/about',
                component: () => import('@/views/About/index.vue'),
                name: 'about',
                meta: {
                    title: '关于本站',
                }
            },
            // 留言板
            {
                path: '/message',
                component: () => import('@/views/Message/index.vue'),
                name: 'message',
                meta: {
                    title: '留言板',
                }
            },
        ]
    },

]

// 3. 创建路由实例并传递 `routes` 配置.
const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 History 模式
    routes
})

// 4. 导出路由对象
export default router
