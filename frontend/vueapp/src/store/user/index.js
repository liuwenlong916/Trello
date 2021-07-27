import { login, register } from '../../api'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    register: ({}, data) => {
      return register(data)
    },
    login: ({}, data) => {
      return login(data)
    },
  },
}
