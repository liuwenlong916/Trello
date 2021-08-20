import * as api from '@/api'

export default {
  namespaced: true,
  state: { cards: [] },
  getters: {
    getCards: ({ cards }) => id => {
      return Array.isArray(cards)
        ? cards.filter(card => card.boardListId == id)
        : null
    },
  },
  mutations: {
    //state不可以解构，
    updateCards(state, data) {
      state.cards = [...state.cards, ...data]
    },
    addCard(state, data) {
      state.cards.push(data)
    },
  },
  actions: {
    async getCards({ commit, state }, boardListId) {
      const res = await api.getCards(boardListId)
      commit('updateCards', res.data)
    },
    async addCard({ commit }, data) {
      const res = await api.addCard(data)
      commit('addCard', res.data)
    },
  },
}
