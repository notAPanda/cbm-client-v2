<template>
  <transition
    mode="out-in"
    enter-active-class="transition duration-200 ease"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition duration-200 ease"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      class="fixed bottom-0 left-0 right-0 top-0 flex flex-col bg-gray-800 z-10"
      v-if="player.track && player.playlist && mobile && fullscreen"
      key="1"
    >
      <div
        class="mx-6 mt-6 text-white hover:cursor-pointer"
        @click="toggleSize"
      >
        <chevron-down-icon class="h-6 w-6" />
      </div>

      <div class="mx-12 mb-4 mt-auto text-center">
        <img
          :src="player.playlist.cover_photo"
          class="mx-auto max-h-60 rounded shadow-xl"
        />
      </div>

      <div class="mx-6 mt-4 mb-auto flex justify-between text-white">
        <div>
          <h3 class="truncate font-light">{{ player.track.title }}</h3>
          <p class="mt-1 truncate text-sm font-light text-gray-300">
            {{ author }} - {{ album }}
          </p>
        </div>
        <div class="flex items-center text-indigo-300 hover:cursor-pointer">
          <heart-icon />
        </div>
      </div>

      <Progress class="mx-8 mt-auto mb-6" />

      <div class="mx-6 mt-auto mb-6">
        <div class="flex items-center justify-between">
          <div class="text-white hover:cursor-pointer">
            <shuffle-icon />
          </div>
          <div @click="playPrevious" class="text-white hover:cursor-pointer">
            <previous-icon />
          </div>
          <div
            @click="togglePlay"
            class="rounded-full bg-indigo-600 p-8 text-white shadow-lg hover:cursor-pointer"
          >
            <pause-icon v-if="player.playing" />
            <play-icon class="h-6 w-6" v-else />
          </div>
          <div @click="playNext" class="text-white hover:cursor-pointer">
            <next-icon />
          </div>
          <div class="text-white hover:cursor-pointer">
            <loop-icon />
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="player.track && player.playlist && mobile"
      key="2"
      class="fixed bottom-0 left-0 right-0 bg-gray-800"
    >
      <div class="mx-6 flex justify-between py-4 text-white">
        <div @click="toggleSize" class="w-8">
          <img
            :src="player.playlist.cover_photo"
            class="mx-auto rounded shadow-lg"
          />
        </div>
        <div @click="toggleSize">
          <h3 class="truncate text-sm font-light">{{ player.track.title }}</h3>
          <p class="mt-1 truncate text-xs font-light text-gray-300">
            {{ author }} - {{ album }}
          </p>
        </div>
        <div class="flex items-center">
          <div class="w-8 text-indigo-300 hover:cursor-pointer">
            <heart-icon />
          </div>
          <div @click="togglePlay" class="w-8 text-white hover:cursor-pointer">
            <pause-icon v-if="player.playing" />
            <play-icon v-else />
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="player.track && player.playlist"
      class="fixed bottom-0 left-0 right-0 bg-gray-800"
    >
      <div class="mx-6 flex justify-between pt-4 text-white">
        <div class="flex">
          <div class="flex w-8 items-center">
            <img
              :src="player.playlist.cover_photo"
              class="mx-auto rounded shadow-lg"
            />
          </div>
          <div class="ml-4 flex items-center">
            <div>
              <h3 class="truncate text-sm font-light">
                {{ player.track.title }}
              </h3>
              <p class="mt-1 truncate text-xs font-light text-gray-300">
                {{ author }} - {{ album }}
              </p>
            </div>
          </div>
          <div
            class="ml-4 flex items-center text-indigo-300 hover:cursor-pointer"
          >
            <heart-icon />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <div class="mx-4 text-white hover:cursor-pointer">
              <shuffle-icon />
            </div>
            <div
              @click="playPrevious"
              class="mx-4 text-white hover:cursor-pointer"
            >
              <previous-icon />
            </div>
            <div
              @click="togglePlay"
              class="mx-2 rounded-full bg-indigo-600 p-4 text-white shadow-lg hover:cursor-pointer"
            >
              <pause-icon v-if="player.playing" />
              <play-icon v-else />
            </div>
            <div @click="playNext" class="mx-4 text-white hover:cursor-pointer">
              <next-icon />
            </div>
            <div class="mx-4 text-white hover:cursor-pointer">
              <loop-icon />
            </div>
          </div>
        </div>
      </div>
      <div class="mx-6 pb-2">
        <Progress />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { usePlayerStore } from '@/stores/player'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'

import Progress from './Proggress.vue'
import { PlayIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

import PreviousIcon from './icons/PreviousIcon.vue'
import NextIcon from './icons/NextIcon.vue'
import HeartIcon from './icons/HeartIcon.vue'
import PauseIcon from './icons/PauseIcon.vue'
import LoopIcon from './icons/LoopIcon.vue'
import ShuffleIcon from './icons/ShuffleIcon.vue'

function handleResize() {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth
  }
}

function toggleSize() {
  fullscreen.value = !fullscreen.value
}

function playNext() {
  player.playNext()
}

function playPrevious() {
  player.playPrevious()
}

function togglePlay() {
  player.playToggle()
}

const player = usePlayerStore()
const windowWidth: Ref<number> = ref(800)
const fullscreen: Ref<boolean> = ref(false)

const mobile: ComputedRef<boolean> = computed(() => {
  return windowWidth.value <= 768
})
const author: Ref<string> = computed(() => {
  return _.get(
    player.track,
    'author.name',
    _.get(player.track, 'album.author.name', '')
  )
})
const album: Ref<string> = computed(() => {
  if (_.has(player.playlist, 'author')) {
    return _.get(player.playlist, 'title')
  }
  return _.get(player.track, 'album.title', '')
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
  handleResize()
})

// playing() {
//   return this.$store.state.player.playing
// }
// author() {
//   return _.get(
//     this.track,
//     'author.name',
//     _.get(this.track, 'album.author.name', '')
//   )
// }
// album() {
//   if (_.has(this.playlist, 'author')) {
//     return _.get(this.playlist, 'title')
//   }
//   return _.get(this.track, 'album.title', '')
// }
// playing() {
//   return this.$store.state.player.playing
// }
// track() {
//   return this.$store.state.player.track
// }
// playlist() {
//   return this.$store.state.player.playlist
// }
// nextTrack() {
//   return this.$store.getters['player/nextTrack']
// }
// previousTrack() {
//   return this.$store.getters['player/previousTrack']
// }
</script>
