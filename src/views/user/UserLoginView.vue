<template>
  <div class="user-login_view">
    <div class="login-top">
      <img class="logo-img" src="@/assets/logo.svg" />
      <span class="logo-name">下饭开发社区</span>
    </div>
    <div class="login-content">
      <div class="login-tab">
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.value"></el-tab-pane>
        </el-tabs>
      </div>
      <el-form ref="ruleFormRef" :model="form" content-class="login-form" :rules="rules">
        <el-form-item prop="userAccount">
          <el-input class="item-input" v-model="form.userAccount" placeholder="请输入账号">
            <template #prefix>
              <el-icon size="18">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPassword" row-class="form-item">
          <el-input v-model="form.userPassword" class="item-input" type="password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon size="18">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="other">
          <span class="register">立即注册</span>
          <span class="password">忘记密码？</span>
        </div>
        <el-form-item>
          <el-button @click="handleSubmit(ruleFormRef)" class="item-button" type="primary">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lange="ts">
import { reactive, inject, ref, getCurrentInstance } from 'vue'
import { userLogin } from '@/axios/user'
import { useRouter } from 'vue-router'
import useUsers from '@/stores/user'

const form = reactive({
  userAccount: '',
  userPassword: '',
})
const activeTab = ref(1)
const ruleFormRef = ref({})
const rules = reactive({
  userAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const tabList = [{ label: '账号密码登录', value: 1 }, { label: '手机号登录', value: 2 }]
const message = inject('$message')

const router = useRouter()
const userStore = useUsers()


const handleSubmit = async (res) => {
  if (!res) return
  await res.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      henderLogin()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const henderLogin = async () => {
  const result = await userLogin(form)
  if (result.code === 0) {
    await userStore.getLoginUser()
    router.push({ path: '/', replace: true })
  } else {
    message.error('error')
  }
}
</script>

<style scoped>
.user-login_view {
  width: 328px;
  margin-top: 100px;
}

.login-top {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 44px;
  height: 44px;
  margin-inline-end: 16px;
}

.logo-name {
  position: relative;
  inset-block-start: 2px;
  font-weight: 600;
  font-size: 33px;
}

.login-tab {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.item-input {
  height: 40px;
  border-color: #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
}

.item-input:hover {
  background-color: #fff;
  border-color: #d9d9d9;
}



.item-button {
  height: 40px;
  border-radius: 6px;
  width: 100%;
}

.other {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.register {
  cursor: pointer;
}

.password {
  cursor: pointer;
  color: rgb(22, 119, 255);
}

/deep/ .el-input__inner {
  -webkit-box-shadow: 0 0 0px 32px #fff inset;
  /**通过边框阴影遮挡住背景*/
  -webkit-text-fill-color: #333;
  /*自动填充内容的文本颜色*/
}
</style>
