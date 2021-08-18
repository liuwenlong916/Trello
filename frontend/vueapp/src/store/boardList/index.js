import * as api from '@/api'

export default {
  namespaced: true,
  state: {
    boardlists: null,
  },
  getters: {
    getBoardLists: ({ boardlists }) => id => {
      return Array.isArray(boardlists)
        ? boardlists.filter(item => item.boardId == id)
        : null
    },
  },
  mutations: {
    initBoardList: (state, data) => {
      state.boardlists = data
    },
    addBoardList: (state, data) => {
      if (!state.boardlists) {
        state.boardlists = []
      }
      state.boardlists = [...state.boardlists, data]
    },
  },
  actions: {
    addBoardList: async ({ commit }, data) => {
      console.log('action')
      const res = await api.addBoardList(data)
      commit('addBoardList', res.data)
    },
    getBoardLists: async ({ commit }, id) => {
      const res = await api.getBoardLists(id)
      commit('initBoardList', res.data)
    },
  },
}
