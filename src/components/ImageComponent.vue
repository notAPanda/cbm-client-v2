<template>
    <img
      :src="src"
      lazyload
    />
  </template>
  
  <script setup lang="ts">
    const props = defineProps({
        src: String,
    })
  </script>
  