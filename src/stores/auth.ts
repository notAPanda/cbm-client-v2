import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type User from '@/types/User'
import router from '@/router/index'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: null as User | null,
  }),
  getters: {},
  actions: {
    setUser(data: any) {
      this.authenticated = true
      this.user = data.user
    },
    getUser() {
      return axios
        .get('/sanctum/csrf-cookie')
        .then(() => axios.get('/api/user'))
        .then(({ data }) => {
          if (data.user?.email) {
            this.user = data.user
            this.authenticated = true
          }
        })
    },
    logout() {
      return axios
        .get('/sanctum/csrf-cookie')
        .then(() => axios.post('/logout'))
        .then(() => {
          this.authenticated = false
          this.user = null
        })
    },
    login(data: any) {
      return axios
        .get('/sanctum/csrf-cookie')
        .then((response) => axios.post('/login', data))
        .then(({ data }) => {
          this.user = data.user
          this.authenticated = true
          router.push('/')
        })
    },
    register(data: any) {
      return axios
        .get('/sanctum/csrf-cookie')
        .then((response) => axios.post('/register', data))
        .then(({ data }) => {
          this.user = data.user
          this.authenticated = true
          router.push('/')
        })
    },
  },
})
