const state = {
  orderDetailsArray: [],
};

const mutations = {
  setOrderDetailsArray(state, orders) {
    state.orderDetailsArray = orders;
  },
};

const actions = {
  setOrderDetailsArray({ commit }, orders) {
    commit('setOrderDetailsArray', orders);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
