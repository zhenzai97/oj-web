import serviceAxios from './index'

// 获取用户登录信息
export const loginUser = () => {
  return serviceAxios({
    url: '/api/user/get/login',
    method: 'get',
  })
}

// 用户登录
export const userLogin = (data: any) => {
  return serviceAxios({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

// 退出登录
export const userLoginOut = () => {
  return serviceAxios({
    url: '/api/user/logout',
    method: 'post',
  })
}
