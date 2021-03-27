export default {
  namespaced: true,

  state: {
    stepIndex: 3, // moet uit DB opgehaald worden
    showFeedbackHelperZero: true,
  },

  getters: {
    stepIndex: (state) => state.stepIndex,
    showFeedbackHelperZero: (state) => state.showFeedbackHelperZero,
  },

  mutations: {
    setStepIndex(state, val) {
      state.stepIndex = val;
    },
    setShowFeedbackHelperZero(state, val) {
      state.showFeedbackHelperZero = val;
    },
  },

  actions: {
    updateStepIndex({ commit, getters, dispatch }, action) {
      const newIndex = (action === 'previousStep') ? getters.stepIndex - 1 : getters.stepIndex + 1;

      commit('setStepIndex', newIndex);
      dispatch('updateShowFeedbackHelperZero', true); // always show feedbackHelper zero state in new sidebar step
    },
    updateShowFeedbackHelperZero({ commit, getters }, newVal) {
      // pass new value or toggle current value
      if (typeof newVal === 'undefined') {
        newVal = !getters.showFeedbackHelperZero;
      }

      commit('setShowFeedbackHelperZero', newVal);
    },
  },
};
