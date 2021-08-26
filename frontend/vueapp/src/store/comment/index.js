import * as api from '@/api/comment'
export default {
  namespaced: true,
  state: {
    page: 1,
    pages: 1,
  },
  mutations: {
    initPages(state, pages) {
      state.pages = pages
    },
  },
  actions: {
    async addComment(store, data) {
      const res = await api.addComment(data)
      return res.data
    },
    async getComments({ commit }, data) {
      const res = await api.getComments(data)
      commit('initPages', res.data.pages)
      return res.data.commentList
    },
  },
}
