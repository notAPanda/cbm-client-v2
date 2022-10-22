<script setup lang="ts">
import type Album from '@/types/Album'

import axios from '@/plugins/axios'

import { onMounted, ref, type Ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ImageComponent from '@/components/ImageComponent.vue'
import { useAssetsStore } from '@/stores/assets'

const assets = useAssetsStore()
const auth = useAuthStore()

onMounted(() => {
  assets.getAlbums().then(assets.getPlaylists).then(assets.getLikes)
})
</script>

<template>
  <div>
    <div class="text-white mb-2 text-xl">Playlists</div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      <div v-for="album in assets.playlists" :key="album.id">
        <RouterLink
          :to="`/playlist/${album.id}`"
          class="relative block overflow-hidden"
        >
          <div class="rounded p-3 bg-blue-500">
            <h2 class="title-font font-medium text-gray-100">
              {{ album.title }}
            </h2>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="text-white mb-2 text-xl">Albums</div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      <div v-for="album in assets.albums" :key="album.id">
        <RouterLink
          class="relative block overflow-hidden"
          :to="`/album/${album.id}`"
        >
          <ImageComponent
            class="blockw-full rounded object-cover object-center"
            :src="album.cover_photo"
          />
          <div class="mt-3">
            <h3 class="title-font text-xs tracking-widest text-gray-300">
              {{ album.author.name }}
            </h3>
            <h2 class="title-font font-medium text-gray-100">
              {{ album.title }}
            </h2>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      <div v-if="auth.user && !auth.user.premium" class="flex">
        <RouterLink
          to="/subscription"
          class="rounded bg-indigo-600 px-4 py-2 text-white w-full text-center"
          >Premium</RouterLink
        >
      </div>
    </div>
  </div>
</template>
