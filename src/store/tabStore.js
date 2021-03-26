export default {
  namespaced: true,

  state: {
    activeTab: 'give',
  },

  getters: {
    activeTab: (state) => state.activeTab,
  },

  mutations: {
    setActiveTab(state, val) {
      state.activeTab = val;
    },
  },

  actions: {
    updateActiveTab({ commit }, value) {
      commit('setActiveTab', value);
    },
  },
};
