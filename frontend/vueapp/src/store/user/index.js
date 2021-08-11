// import { login, register } from '@/api'

import * as api from '@/api'

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
    removeUserInfo: state => {
      state.info = null
      localStorage.removeItem('user')
    },
  },
  actions: {
    register: ({}, data) => {
      return api.register(data)
    },
    login: async ({ commit }, data) => {
      try {
        let res = await api.login(data)
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
    logout: async ({ commit }) => {
      // try {
      //   let res = await logout()
      // } catch (e) {
      //   throw e
      // }
      console.log('logou')
      commit('removeUserInfo')
    },
  },
}
