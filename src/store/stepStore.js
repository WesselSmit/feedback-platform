export default {
  namespaced: true,

  state: {
    stepIndex: 1, // moet uit DB opgehaald worden
  },

  getters: {
    stepIndex: (state) => state.stepIndex,
  },

  mutations: {
    setStepIndex(state, val) {
      state.stepIndex = val;
    },
  },

  actions: {
    updateStepIndex({ commit, getters }, action) {
      const newIndex = (action === 'previousStep') ? getters.stepIndex - 1 : getters.stepIndex + 1;

      commit('setStepIndex', newIndex);
    },
  },
};
