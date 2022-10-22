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
      class="fixed bottom-0 left-0 right-0 top-0 flex flex-col bg-gray-800"
      v-if="track && playlist && mobile && fullscreen"
      key="1"
    >
      <div
        class="mx-6 mt-6 text-white hover:cursor-pointer"
        @click="toggleSize"
      >
        <chevron-down-icon />
      </div>

      <div class="mx-12 mb-4 mt-auto text-center">
        <img
          :src="playlist.cover_photo"
          class="mx-auto max-h-60 rounded shadow-xl"
        />
      </div>

      <div class="mx-6 mt-4 mb-auto flex justify-between text-white">
        <div>
          <h3 class="truncate font-light">{{ track.title }}</h3>
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
            <pause-icon v-if="playing" />
            <play-icon v-else />
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
      v-else-if="track && playlist && mobile"
      key="2"
      class="fixed bottom-0 left-0 right-0 bg-gray-800"
    >
      <div class="mx-6 flex justify-between py-4 text-white">
        <div @click="toggleSize" class="w-8">
          <img :src="playlist.cover_photo" class="mx-auto rounded shadow-lg" />
        </div>
        <div @click="toggleSize">
          <h3 class="truncate text-sm font-light">{{ track.title }}</h3>
          <p class="mt-1 truncate text-xs font-light text-gray-300">
            {{ author }} - {{ album }}
          </p>
        </div>
        <div class="flex items-center">
          <div class="w-8 text-indigo-300 hover:cursor-pointer">
            <heart-icon />
          </div>
          <div @click="togglePlay" class="w-8 text-white hover:cursor-pointer">
            <pause-icon v-if="playing" />
            <play-icon v-else />
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="track && playlist"
      class="fixed bottom-0 left-0 right-0 bg-gray-800"
    >
      <div class="mx-6 flex justify-between pt-4 text-white">
        <div class="flex">
          <div class="flex w-8 items-center">
            <img
              :src="playlist.cover_photo"
              class="mx-auto rounded shadow-lg"
            />
          </div>
          <div class="ml-4 flex items-center">
            <div>
              <h3 class="truncate text-sm font-light">{{ track.title }}</h3>
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
              <pause-icon v-if="playing" />
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
// import Progress from './Proggress.vue'
// import PreviousIcon from './icons/PreviousIcon.vue'
// import NextIcon from './icons/NextIcon.vue'
// import HeartIcon from './icons/HeartIcon.vue'
// import PauseIcon from './icons/PauseIcon.vue'
// import LoopIcon from './icons/LoopIcon.vue'
// import ShuffleIcon from './icons/ShuffleIcon.vue'
// import ChevronDownIcon from './icons/ChevronDownIcon.vue'
// import PlayIcon from './icons/PlayIcon.vue'

// created
// if (typeof window !== 'undefined') {
//       window.addEventListener('resize', this.handleResize)
//     }
//     this.handleResize()


// computed
    // mobile() {
    //   return this.windowWidth <= 768
    // }
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

// methods
function handleResize() {
  if (typeof window !== 'undefined') {
    this.windowWidth = window.innerWidth
  }
}
function toggleSize() {
  this.fullscreen = !this.fullscreen
}
function playNext() {
  if (this.nextTrack) {
    this.$store.dispatch('player/play', { track: this.nextTrack })
  }
}
function playPrevious() {
  if (this.previousTrack) {
    this.$store.dispatch('player/play', { track: this.previousTrack })
  }
}
function togglePlay() {
  this.$store.dispatch('player/playToggle')
}
</script>
