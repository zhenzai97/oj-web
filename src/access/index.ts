import router from '@/router/index'
import ACCESS_ENUM from './accessEnum'
import checkAccess from '@/access/checkAccess'
import useUsers from '@/stores/user'

router.beforeEach(async (to, form, next) => {

  const userStore = useUsers()
  // 如果未登录，自动登录
  const loginUser = userStore.loginUser
  if (!loginUser || loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN) {
    // 等待登录成功
    // await userStore.getLoginUser()
  }

  const needAccess = to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN
  // 要跳转的页面必须登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登录，则跳转到登录页
    if (!loginUser || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }

    // 如果已经登录了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess as string)) {
      next('/noAuth')
      return
    }
  }
  next()
})
