import axios from 'axios'
import { Message } from '../components/TMessage/TMessage.js'
import store from '@/store'
import router from '@/router'

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH

axios.interceptors.request.use(configs => {
  // try{
  //   let data = JSON.parse(localStorage.getItem('user'))
  // }catch(e){
  //   throw e
  // }
  if (configs.url !== 'user/login') {
    const { authorization } = store.state.user.info
    if (authorization) {
      configs.headers.authorization = authorization
    }
  }
  return configs
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let { message, errorDetails, statusCode } = error.response.data
    if (errorDetails) {
      message += ' : ' + errorDetails
    }
    //权限过期重新登陆
    if (statusCode === 401) {
      router.push({
        name: 'Login',
      })
    }
    Message.error(message)
    throw error
  },
)
export default axios
