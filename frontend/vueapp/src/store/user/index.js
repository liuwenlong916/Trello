import { login, register } from '@/api'

export default {
  namespaced: true,
  state: {
    // info: JSON.parse(localStorage.getItem('user')),
    info: null,
  },
  mutations: {
    initUserInfo: state => {
      try {
        let data = JSON.parse(localStorage.getItem('user'))
        state.info = data
      } catch (e) {
        throw e
      }
    },
    updateUserInfo: (state, data) => {
      state.info = data
      localStorage.setItem('user', JSON.stringify(data))
    },
  },
  actions: {
    register: ({}, data) => {
      return register(data)
    },
    login: async ({ commit }, data) => {
      try {
        let res = await login(data)
        commit('updateUserInfo', {
          id: res.data.id,
          name: res.data.name,
          authorization: res.headers.authorization,
        })
        return res
      } catch (e) {
        throw e
      }
    },
  },
}
