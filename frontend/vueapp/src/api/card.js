import axios from './axios'
export const getCards = boardlistid => {
  return axios({
    method: 'get',
    url: '/card',
    params: {
      boardlistid,
    },
  })
}

export const addCard = data => {
  return axios({
    method: 'post',
    url: '/card',
    data,
  })
}

export const editCard = data => {
  return axios({
    method: 'put',
    url: `/card/${data.id}`,
    data: {
      boardListId: data.boardListId,
      name: data.name,
      order: data.order,
      description: data.description,
    },
  })
}

export const uploadAttachment = data => {
  const fd = new FormData()
  fd.append('cardId', data.cardId)
  fd.append('attachment', data.file)
  return axios({
    method: 'post',
    url: 'card/attachment',
    data: fd,
  })
}
export const deleteAttachment = id => {
  return axios({
    method: 'delete',
    url: `card/attachment/${id}`,
  })
}
export const removeCover = id => {
  return axios({
    method: 'put',
    url: `card/attachment/removeCover/${id}`,
  })
}
export const setCover = id => {
  return axios({
    method: 'put',
    url: `card/attachment/setCover/${id}`,
  })
}
export default {
  getCards,
  addCard,
  editCard,
  uploadAttachment,
  deleteAttachment,
  setCover,
  removeCover,
}
