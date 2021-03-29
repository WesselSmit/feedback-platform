export default {
  namespaced: true,

  state: {
    stepIndex: 1, // moet uit DB opgehaald worden
    showPopUp: true,
    activeTab: 'give', // options: give, view
    showFeedbackHelperZero: true,
    textInput: '',
  },

  getters: {
    stepIndex: (state) => state.stepIndex,
    showPopUp: (state) => state.showPopUp,
    activeTab: (state) => state.activeTab,
    showFeedbackHelperZero: (state) => state.showFeedbackHelperZero,
    textInput: (state) => state.textInput,
  },

  mutations: {
    setStepIndex(state, val) {
      state.stepIndex = val;
    },
    setShowPopUp(state, val) {
      state.showPopUp = val;
    },
    setActiveTab(state, val) {
      state.activeTab = val;
    },
    setShowFeedbackHelperZero(state, val) {
      state.showFeedbackHelperZero = val;
    },
    setTextInput(state, val) {
      state.textInput = val;
    },
  },

  actions: {
    updateStepIndex({ commit, getters, dispatch }, action) {
      const newIndex = (action === 'previousStep') ? getters.stepIndex - 1 : getters.stepIndex + 1;

      commit('setStepIndex', newIndex);
      dispatch('updateShowFeedbackHelperZero', true); // always show feedbackHelper zero state in new sidebar step
    },

    updateShowPopUp({ commit }) {
      commit('setShowPopUp', false);
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

    updateTextInput({ commit, dispatch }, value) {
      const isEmpty = (value === '');

      dispatch('updateShowFeedbackHelperZero', isEmpty);
      commit('setTextInput', value);
    },
  },
};
