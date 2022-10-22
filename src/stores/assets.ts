import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from '@/plugins/axios'
import type Album from '@/types/Album'

const auth = useAuthStore()

export const useAssetsStore = defineStore('assets', {
  state: () => ({
    albums: [] as Album[],
    playlists: [] as Album[],
    likes: [],
  }),
  getters: {},
  actions: {
    getAlbums() {
      return axios.get('/api/albums').then(({ data }) => {
        this.albums = data.albums
        if (data.user) {
          auth.setUser(data)
        }
      })
    },
    getPlaylists() {
      return axios.get('/api/albums').then(({ data }) => {
        if (data.playlists) {
          this.playlists = data.playlists
        }
      })
    },
    getLikes() {
      return axios.get('/api/liked').then(({ data }) => {
        if (data.liked) {
          this.likes = data.liked
        }
      })
    },
  },
})
