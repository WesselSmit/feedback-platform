export default {
  namespaced: true,

  state: {
    hideVisualisation: false,
    stepIndex: 1, // moet uit DB opgehaald worden
    showPopUp: true,
    activeTab: 'give', // options: give, view
    showFeedbackHelperZero: true,
    textInput: '',
    showMarkerOverlay: false,
  },

  getters: {
    hideVisualisation: (state) => state.hideVisualisation,
    stepIndex: (state) => state.stepIndex,
    showPopUp: (state) => state.showPopUp,
    activeTab: (state) => state.activeTab,
    showFeedbackHelperZero: (state) => state.showFeedbackHelperZero,
    textInput: (state) => state.textInput,
    showMarkerOverlay: (state) => state.showMarkerOverlay,
  },

  mutations: {
    setHideVisualisation(state, val) {
      state.hideVisualisation = val;
    },
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
    setShowMarkerOverlay(state, val) {
      state.showMarkerOverlay = val;
    },
  },

  actions: {
    updateHideVisualisation({ commit }, value) {
      commit('setHideVisualisation', value);
    },

    updateStepIndex({ commit, getters, dispatch }, action) {
      const newIndex = (action === 'previousStep') ? getters.stepIndex - 1 : getters.stepIndex + 1;

      commit('setStepIndex', newIndex);
      dispatch('updateHideVisualisation', false); // always show visualisation unless disabled in blueprint
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

    updateShowMarkerOverlay({ commit }, value) {
      commit('setShowMarkerOverlay', value);
    },
  },
};

/*
 wanneer je ene sessie start kopieer je de markers --> sessionMarkers
 alle veranderingen (toevoegen en verwijderen gebeurt in sessionMarkers)
 diabled state word bepaald of er verschil zit tussen markers en sessionMarkers
 als je opslaat word markers overschreven met sessionMarkers en word sessionMarkers gereset
 als je canceled dan word alleen sessionMarkers gereset
 */
