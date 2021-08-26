import axios from './axios'

export const addComment = data => {
  return axios({
    method: 'post',
    url: '/comment',
    data,
  })
}
export const getComments = params => {
  return axios({
    method: 'get',
    url: `/comment`,
    params,
  })
}
export default {
  addComment,
}
