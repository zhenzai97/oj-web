import { defineStore } from 'pinia'
import { loginUser } from '@/axios/user'
import ACCESS_ENUM from '@/access/accessEnum'

const useUsers = defineStore('users', {
  state: () => {
    return {
      loginUser: {
        // 所有这些属性都将自动推断其类型
        userName: '未登录',
        userRole: 'noLogin',
      }
    }
  },
  getters: {},
  actions: {
    async getLoginUser() {
      const res: any = await loginUser()
      if (res.code === 0) {
        this.loginUser = res.data
      } else {
        this.loginUser.userRole = ACCESS_ENUM.NOT_LOGIN
      }
    },
  }
})

export default useUsers