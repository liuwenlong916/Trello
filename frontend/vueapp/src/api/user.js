import axios from './axios'

// 注册
export const register = data => {
  return axios({
    method: 'post',
    url: 'user/register',
    data,
  })
}

export const login = data => {
  return axios({
    method: 'post',
    url: 'user/login',
    data,
  })
}
// export const logout = () => {
//   return axios({
//     method: 'post',
//     url: 'user/logout',
//   })
// }
export default {
  login,
  register,
}
