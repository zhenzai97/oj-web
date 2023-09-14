<script setup lang="ts">
import { useRoute } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue'
import 'element-plus/theme-chalk/display.css'
const route = useRoute()
console.log("route", route)
</script>

<template>
  <div id="basic-lay_out">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
./stores/index