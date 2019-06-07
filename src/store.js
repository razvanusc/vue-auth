import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    logIn({ commit }, { email, password }) {
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          commit('setUser', res.user)
        })
        .catch(error => {
          commit('setError', error)
        })
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
  }
})
