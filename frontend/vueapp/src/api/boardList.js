import axios from './axios'
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
export default {
  addBoardList,
  getBoardLists,
  editBoardList,
}
