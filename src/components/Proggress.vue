<template>
  <div>
    <div>
      <input
        type="range"
        min="0"
        :max="player.durationInSeconds"
        class="custom-range w-full"
        v-model="seekInSeconds"
      />
    </div>
    <div>
      <div class="flex justify-between text-xs text-gray-200">
        <p>{{ player.seek }}</p>
        <p>{{ player.duration }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import _ from 'lodash'
import { usePlayerStore } from '@/stores/player'

const player = usePlayerStore()

const seekInSeconds = computed({
  get() {
    return player.seekInSeconds
  },
  set(value) {
    player.setHowlSeek(value)
  },
})
</script>
