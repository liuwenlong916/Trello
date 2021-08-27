import * as api from '@/api/card'

export default {
  namespaced: true,
  state: { cards: [] },
  getters: {
    getCards: ({ cards }) => boardListId => {
      return Array.isArray(cards)
        ? cards.filter(card => card.boardListId == boardListId)
        : null
    },
    getCard: ({ cards }) => id =>
      Array.isArray(cards) ? cards.find(item => item.id == id) : null,
  },
  mutations: {
    //state不可以解构，
    updateCards(state, data) {
      if (!state.cards) {
        state.cards = []
      }
      state.cards = [...state.cards, ...data]
    },
    addCard(state, data) {
      state.cards.push(data)
    },
    editCard(state, data) {
      state.cards = state.cards.map(card => {
        if (card.id == data.id) {
          return { ...card, ...data }
        }
        return card
      })
    },
    addAttachment(state, data) {
      state.cards = state.cards.map(card => {
        if (card.id == data.boardListCardId) {
          return {
            ...card,
            attachments: [...card.attachments, data],
          }
        }
        return card
      })
    },

    removeAttachment(state, { cardId, attachmentId }) {
      state.cards = state.cards.map(card => {
        if (card.id == cardId) {
          return {
            ...card,
            attachments: card.attachments.filter(
              item => item.id != attachmentId,
            ),
          }
        }
        return card
      })
    },
    setCover(state, { cardId, attachmentId }) {
      state.cards = state.cards.map(card => {
        if (card.id == cardId) {
          return {
            ...card,
            attachments: card.attachments.map(atta => {
              return {
                ...atta,
                isCover: attachmentId == atta.id,
              }
            }),
          }
        }
        return card
      })
    },
    removeCover(state, { cardId, attachmentId }) {
      state.cards = state.cards.map(card => {
        if (card.id == cardId) {
          return {
            ...card,
            attachments: attachments.map(atta => {
              return {
                ...atta,
                isCover: false,
              }
            }),
          }
        }
        return card
      })
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
    async editCard({ commit }, data) {
      const res = await api.editCard(data)
      commit('editCard', data)
    },
    async uploadAttachment({ commit }, data) {
      const res = await api.uploadAttachment(data)
      commit('addAttachment', res.data)
    },
    async deleteAttachment({ commit }, data) {
      const res = await api.deleteAttachment(data.attachmentId)
      commit('removeAttachment', data)
    },
    async removeCover({ commit }, data) {
      const res = await api.removeCover(data.attachmentId)
      commit('removeCover', { ...data, isCover: false })
    },
    async setCover({ commit }, data) {
      const res = await api.setCover(data.attachmentId)
      commit('setCover', { ...data, isCover: true })
    },
  },
}
