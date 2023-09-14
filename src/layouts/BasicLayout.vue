<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<template>
  <div class="common-layout">
    <el-container class="container ">
      <el-header class="header ">
        <GlobalHeader />
      </el-header>
      <el-main class="main ">
        <router-view />
      </el-main>
      <el-footer class="footer ">Footer</el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
}

.header {
  box-shadow: 0 2px 8px #f0f1f2;
}

.cu-border {
  border: 1px solid red;
}

.footer {
  text-align: center;
  background-color: #cccccc;
}
</style>
