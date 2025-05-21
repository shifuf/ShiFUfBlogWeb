import { defineStore } from 'pinia';
import { getCurrentUser } from '@/api/User';
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null, // 用户信息
    isLoggedIn: false, // 登录状态
  }),
  actions: {
    /**
     * 登录成功后获取用户信息并存储
     */
    async fetchUserInfo() {
      try {
        const res = await getCurrentUser();
        this.userInfo = res.data;
        this.isLoggedIn = true; // 设置登录状态为已登录
      } catch (error) {
        console.error('获取用户信息失败', error);
        throw error;
      }
    },
    /**
     * 退出登录，清空用户信息
     */
    logout() {
      this.userInfo = null;
      this.isLoggedIn = false; // 设置登录状态为未登录
    },
  },
  getters: {
    /**
     * 获取用户信息
     * @returns {object|null} 用户信息
     */
    getUserInfo: (state) => state.userInfo,
        /**
     * 获取登录状态
     * @returns {boolean} 登录状态
     */
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
  // 配置持久化，将用户信息和 token 存储在 localStorage 中
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
        storage: localStorage,
        paths: ['userInfo','isLoggedIn'],
      },
    ],
  },
});