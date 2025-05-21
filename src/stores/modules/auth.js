// src/store/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
    }),
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        clearToken() {
            this.token = '';
            localStorage.removeItem('token');
        }
    }
});