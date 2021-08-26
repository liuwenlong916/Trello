import * as api from '@/api/boardList'

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
    getBoardList: ({ boardlists }) => listid => {
      return Array.isArray(boardlists)
        ? boardlists.find(item => item.id == listid)
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
    updateBoardList: (state, data) => {
      state.boardlists = state.boardlists.map(list => {
        if (list.id == data.id) {
          return { ...list, ...data }
        }
        return list
      })
      console.log(state.boardlists)
    },
  },
  actions: {
    addBoardList: async ({ commit }, data) => {
      const res = await api.addBoardList(data)
      commit('addBoardList', res.data)
    },
    // getBoardLists: async ({ commit }, id) => {
    //   const res = await api.getBoardLists(id)
    //   commit('initBoardList', res.data)
    // },
    async getBoardLists({ commit }, id) {
      const res = await api.getBoardLists(id)
      commit('initBoardList', res.data)
    },
    editBoardList: async ({ commit }, data) => {
      await api.editBoardList(data)
      commit('updateBoardList', data)
    },
  },
}
