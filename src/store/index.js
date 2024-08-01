
import { createStore } from 'vuex';
import { AuthService } from '../service/AuthService';
import orders from './modules/Orders';
const store = createStore({
  state: {
    token: null,
  },
  modules: {
    orders,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const authService = new AuthService();
      try {
        const data = await authService.login(credentials);
        commit('setToken', data.token);
        return true; // Indicate login success
      } catch (error) {
        console.error('Error logging in:', error);
        return false; // Indicate login failure
      }
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
  getters: {
    token: state => state.token,
  },
});

export default store;
