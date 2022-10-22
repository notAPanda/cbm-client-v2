<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import ImageComponent from '@/components/ImageComponent.vue'
import {
  HeartIcon,
  PlayIcon,
  PlayCircleIcon,
  ClockIcon,
  PauseCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/vue/24/solid'
import axios from '@/plugins/axios'
import { useRoute } from 'vue-router'
// import { formatTime } from '@/services/helper';
import { usePlayerStore } from '@/stores/player'
import type Track from '@/types/Track'

function play(track?: Track) {
  if (track) {
    return player.play({ track, playlist: playlist.value })
  }
  return player.play({ playlist: playlist.value })
}

function getPlaylist() {
  return axios.get(`/api/albums/${route.params.albumId}`).then(({ data }) => {
    playlist.value = data.album
  })
}

const playlist = ref(null)
const currentTrack = ref(null)
const playing = ref(false)
const player = usePlayerStore()
const route = useRoute()

onMounted(() => {
  getPlaylist()
})
</script>

<template>
  <div v-if="playlist" class="container mx-auto">
    <div class="mb-4 flex flex-col md:flex-row">
      <ImageComponent
        class="max-h-60 rounded object-cover md:max-h-60"
        :src="playlist.cover_photo"
      />
      <div class="md:ml-4">
        <div
          class="md-mt-0 mb-4 mt-4 text-4xl font-extrabold text-white md:mt-0"
        >
          {{ playlist.title }}
        </div>
        <div class="text-sm text-gray-300">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <div class="mx-4 my-6 md:mx-0">
      <div class="">
        <button
          class="rounded-full bg-indigo-600 p-3 text-white transition-all hover:scale-105"
          @click="play()"
        >
          <PlayIcon class="pl-1 w-8 h-8" size="25"></PlayIcon>
        </button>
      </div>
    </div>
    <div class="mx-4 md:mx-0">
      <table class="min-w-full">
        <tbody class="">
          <tr
            @click="play(track)"
            v-for="(track, index) in playlist.tracks"
            :key="track.id"
            class="transition-all"
            :class="{
              'cursor-pointer': track.src,
              'hover:bg-gray-800': track.src,
            }"
          >
            <td class="whitespace-nowrap py-2">
              <div class="flex items-center">
                <div class="">
                  <div
                    :class="[track.src ? 'text-white' : 'text-gray-400']"
                    class="max-w-[280px] truncate"
                  >
                    {{ track.title }}
                  </div>
                  <div
                    class="text-sm font-light max-w-[280px] truncate"
                    :class="[track.src ? 'text-gray-400' : 'text-gray-500']"
                  >
                    {{ playlist.author.name }}
                  </div>
                </div>
              </div>
            </td>
            <!-- <td class="">
              <LoveToggle :track="track" />
            </td> -->
            <!-- <td class="text-right text-gray-400">
              {{ formatTime(track.duration) }}
            </td> -->
            <td class="">
              <div class="flex justify-end">
                <HeartIcon class="w-6 h-6 text-indigo-500 mr-4"></HeartIcon>
                <EllipsisHorizontalIcon class="w-6 h-6 text-gray-500" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
