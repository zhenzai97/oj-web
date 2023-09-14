<template>
  <el-row align="middle">
    <el-col class="hidden-xs-only" :span="2">
      <div class="title-bar">
        <img class="logo-img" src="@/assets/logo.svg" />
        <span class="logo-name">下饭oj</span>
      </div>
    </el-col>
    <el-col :span="21">
      <el-menu :default-active="selectedKeys" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="item in visibleRoutes" :index="item.path" :route="item">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col class="user-information" :span="1">
      <el-dropdown trigger="click" @command="hendelDropdown">
        <div class="user-status">
          {{ userStore.loginUser?.userName ?? '未登录' }}
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, index) in dropdownList" :key="index" :command="item">{{ item
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue'
import checkAccess from '@/access/checkAccess'
import { userLoginOut } from '@/axios/user'
import useUsers from '@/stores/user'
const router = useRouter()
const userStore = useUsers()
const dropdownList = ['个人信息', '退出登录']

console.log('useStore', userStore)

// 默认主页
const selectedKeys = ref('/')
// 刷新当前页面
router.afterEach((to, from, failure) => {
  selectedKeys.value = to.path
})

// 跳转路由
const handleSelect = (key: string, keyPath: string[]) => {
  router.push({
    path: key,
  })
}

const visibleRoutes = computed(() => {
  let dem = routes.filter((item, index) => {
    // 根据状态过滤菜单
    if (item.meta?.hideInMenu) {
      return false
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(userStore.loginUser, item?.meta?.access as string)
    ) {
      return false
    }
    return true
  })
  return dem
})

const hendelDropdown = async (res: any) => {
  if (res === '退出登录') {
    await userLoginOut()
    router.push({ path: '/user/login', replace: true })
    // userStore.getLoginUser()
  }
}


</script>

<style lang="scss" scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 50px;
  height: 50px;
}

.logo-name {
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
}

.user-status {
  cursor: pointer;
  text-align: center;
}

.user-information {
  display: flex;
  align-items: center;
}

::v-deep .el-menu {
  border-bottom: 0px !important;
}
</style>
