import axios from './axios'
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
export default {
  getBoards,
  addBoard,
  updateBoard,
  deleteBoard,
}
