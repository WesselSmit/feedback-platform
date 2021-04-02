import areEqual from 'deep-equal';

// todo-now: cleanup all Store's --> sommige actions moeten alleen mutations worden + hernoem arguments naar 'payload'

export default {
  namespaced: true,

  state: {
    hideVisualisation: false,
    stepIndex: 1, // moet uit DB opgehaald worden
    showPopUp: true,
    activeTab: 'give',
    showFeedbackHelperZero: true,
    textInput: '',
    showMarkerOverlay: false,
    markers: [],
    sessionMarkers: [],
  },

  getters: {
    hideVisualisation: (state) => state.hideVisualisation,
    stepIndex: (state) => state.stepIndex,
    showPopUp: (state) => state.showPopUp,
    activeTab: (state) => state.activeTab,
    showFeedbackHelperZero: (state) => state.showFeedbackHelperZero,
    textInput: (state) => state.textInput,
    showMarkerOverlay: (state) => state.showMarkerOverlay,
    markers: (state) => state.markers,
    sessionMarkers: (state) => state.sessionMarkers,
    numberOfMarkers: (state) => state.markers.length,
    markersAreChanged: (state) => !areEqual(state.markers, state.sessionMarkers),
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
    setMarkers(state, val) {
      state.markers = val;
    },
    setSessionMarkers(state, val) {
      state.sessionMarkers = val;
    },
  },

  actions: {
    updateHideVisualisation({ commit }, payload) {
      commit('setHideVisualisation', payload);
    },

    updateStepIndex({ commit, getters, dispatch }, payload) {
      const newIndex = (payload === 'previousStep') ? getters.stepIndex - 1 : getters.stepIndex + 1;

      commit('setStepIndex', newIndex);
      dispatch('updateHideVisualisation', false); // always show visualisation unless disabled in blueprint
      dispatch('updateShowFeedbackHelperZero', true); // always show feedbackHelper zero state in new sidebar step
    },

    updateShowPopUp({ commit }) {
      commit('setShowPopUp', false);
    },

    updateActiveTab({ commit }, payload) {
      commit('setActiveTab', payload);
    },

    updateShowFeedbackHelperZero({ commit, getters }, payload) {
      // pass new value or toggle current value
      if (typeof payload === 'undefined') {
        payload = !getters.showFeedbackHelperZero;
      }

      commit('setShowFeedbackHelperZero', payload);
    },

    updateTextInput({ commit, dispatch }, payload) {
      dispatch('updateShowFeedbackHelperZero', payload === '');
      commit('setTextInput', payload);
    },

    updateShowMarkerOverlay({ commit }, payload) {
      commit('setShowMarkerOverlay', payload);
    },

    startNewMarkerSession({ commit, getters }) {
      // takes the markers that already excist as starting point for the 'marker session'
      commit('setSessionMarkers', cleanSource(getters.markers));
    },

    addSessionMarker({ commit, getters }, payload) {
      const { sessionMarkers } = getters;
      sessionMarkers.push(payload);
      commit('setSessionMarkers', sessionMarkers);
    },

    removeSessionMarker({ commit, getters }, payload) {
      const sessionMarkers = getters.sessionMarkers.filter((marker) => marker.id !== payload);
      commit('setSessionMarkers', sessionMarkers);
    },

    saveSessionMarkers({ commit, getters }) {
      commit('setMarkers', getters.sessionMarkers);
    },
  },
};

function cleanSource(source) {
  // use native JSON functions to remove the reactivity so objects (including arrays) can be cloned without mutating the original source
  // also see: https://forum.vuejs.org/t/how-to-remove-array-binding/53751
  return JSON.parse(JSON.stringify(source));
}
