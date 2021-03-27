export default {
  namespaced: true,

  state: {
    stepIndex: 3, // moet uit DB opgehaald worden
    activeTab: 'give',
    showFeedbackHelperZero: true,
  },

  getters: {
    stepIndex: (state) => state.stepIndex,
    activeTab: (state) => state.activeTab,
    showFeedbackHelperZero: (state) => state.showFeedbackHelperZero,
  },

  mutations: {
    setStepIndex(state, val) {
      state.stepIndex = val;
    },
    setActiveTab(state, val) {
      state.activeTab = val;
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
    updateActiveTab({ commit }, value) {
      commit('setActiveTab', value);
    },
    updateShowFeedbackHelperZero({ commit, getters }, value) {
      // pass new value or toggle current value
      if (typeof value === 'undefined') {
        value = !getters.showFeedbackHelperZero;
      }

      commit('setShowFeedbackHelperZero', value);
    },
  },
};
