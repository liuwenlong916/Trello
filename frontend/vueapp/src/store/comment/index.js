import * as api from '@/api/comment'
export default {
  namespaced: true,
  state: {
    page: 1,
    pages: 1,
    // showPageCount: 5,
  },
  getters: {
    showPages: ({ pages, page }) => {
      const arr = [page]
      let start = page
      let end = page
      while (arr.length < 5) {
        if (start <= 1 && end >= pages) break
        if (start > 1) arr.unshift(--start)
        if (end < pages) arr.push(++end)
      }
      return arr
    },
  },
  mutations: {
    initPages(state, { pages, page }) {
      state.pages = pages
      state.page = page
    },
    updatePage(state, page) {
      state.page = page
    },
  },
  actions: {
    async addComment({ dispatch, state }, data) {
      const res = await api.addComment(data)
      return res.data
    },
    async getComments({ commit }, data) {
      const res = await api.getComments(data)
      commit('initPages', res.data)
      return res.data.commentList
    },
  },
}
