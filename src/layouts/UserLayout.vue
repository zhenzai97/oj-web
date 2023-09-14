<template>
  <div id="user-layout">
    <a-layout class="item-layout">
      <a-layout-header class="header"></a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#user-layout {}

#user-layout .item-layout {
  min-height: 100vh;
}

#user-layout .arco-layout {}

#user-layout .header {
  box-shadow: 0 2px 8px #f0f1f2;
}

#user-layout .content {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: center;
  /* align-items: center; */
  /* overflow: auto; */
  background-image: url(https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr);
  background-size: 100% 100%;
}

#user-layout .footer {
  text-align: center;
  baground-color: #ccc;
  text-align: center;
  background-color: #f1eeee;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
</style>
