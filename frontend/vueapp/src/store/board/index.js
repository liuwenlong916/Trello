import * as api from '@/api'

export default {
  namespaced: true,
  state: {
    boards: null,
  },
  getters: {
    getBoard: ({ boards }) => id => {
      return Array.isArray(boards) ? boards.find(board => board.id == id) : null
    },
  },
  mutations: {
    updateBoards: (state, data) => {
      state.boards = data
    },
    addBoard: (state, board) => {
      if (!state.boards) {
        state.boards = []
      }
      state.boards.push(board)
    },
  },
  actions: {
    getBoards: async ({ commit }) => {
      try {
        const res = await api.getBoards()
        commit('updateBoards', res.data)
      } catch (e) {
        throw e
      }
    },
    getBoard: async ({ commit }, id) => {
      try {
        const res = await api.getBoard(id)
      } catch (e) {
        throw e
      }
    },
    addBoard: async ({ commit }, data) => {
      try {
        const res = await api.addBoard(data)
        commit('addBoard', res.data)
      } catch (e) {
        throw e
      }
    },
    deleteBoard: async ({ commit }, id) => {
      try {
        const res = await api.deleteBoard(id)
      } catch (e) {
        throw e
      }
    },
  },
}
