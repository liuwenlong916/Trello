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
    // if ((statusCode = 401)) {
    //   router.push({
    //     name: 'Login',
    //   })
    // }
    Message.error(message)
    throw error
  },
)

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

export const getBoards = () => {
  return axios({
    method: 'get',
    url: '/board',
  })
}
export const addBoard = data => {
  return axios({
    method: 'post',
    url: '/board',
    data,
  })
}

export const getBoard = id => {
  return axios({
    method: 'get',
    url: `/board/${id}`,
  })
}

export const updateBoard = (id, data) => {
  return axios({
    method: 'put',
    url: `/board/${id}`,
    data,
  })
}

export const deleteBoard = id => {
  return axios({
    method: 'delete',
    url: `/board/${id}`,
  })
}

export const addBoardList = data => {
  return axios({
    method: 'post',
    url: '/boardlist',
    data,
  })
}

export const getBoardLists = boardid => {
  return axios({
    method: 'get',
    url: `/boardlist`,
    params: {
      boardid,
    },
  })
}

export const editBoardList = data => {
  console.log(data.id)
  return axios({
    method: 'put',
    url: `/boardlist/${data.id}`,
    data: {
      order: data.order,
      boardId: data.boardId,
      name: data.name,
    },
  })
}
