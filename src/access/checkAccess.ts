import ACCESS_ENUM from './accessEnum'

/**
 * @description 检查权限
 * @param loginUser 当前登录的用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前登录用户具有的权限
  const loginUserAccess = loginUser.userRole ?? ACCESS_ENUM.NOT_LOGIN
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }

  // 如果用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果用户没有登陆,则没有权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false
    }
  }

  // 如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 如果不为管理员，表示无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false
    }
  }

  return true
}
export default checkAccess
