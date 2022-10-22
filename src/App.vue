<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Dropdown from "./components/Dropdown.vue";
import Player from "./components/Player.vue"
</script>

<template>
  <div class="container mx-auto pt-4 pb-36 px-4">
    <header>
      <div class="">
        <nav class="flex">
          <Dropdown class="ml-auto"></Dropdown>
        </nav>
      </div>
    </header>

    <Suspense>
      <RouterView />
    </Suspense>

    <Player />
  </div>
</template>

<style scoped></style>
