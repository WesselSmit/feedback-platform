export default {
  namespaced: true,

  state: {
    message: null,
  },

  getters: {
    message: (state) => state.message,
  },

  mutations: {
    setMessage(state, val) {
      state.message = val;
    },
  },

  actions: {
    message({ commit, getters }, payload) {
      // return if a message is already showing to prevent async shenanigans
      if (getters.message) return;

      const message = {
        text: payload.message,
        mode: payload?.mode || null,
      };

      commit('setMessage', message);

      setTimeout(() => {
        commit('setMessage', null);
      }, payload?.duration || 3000);
    },
  },
};
