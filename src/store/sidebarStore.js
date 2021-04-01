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
    markers: [],
    markerSessionId: '',
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
    numberOfMarkers: (state) => state.markers.length,
    markerSessionId: (state) => state.markerSessionId,
    sessionMarkers: (state) => state.markers.filter((marker) => marker.sessionId === state.markerSessionId),
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
    addMarker(state, val) {
      state.markers.push(val);
    },
    removeMarker(state, val) {
      state.markers.splice(val, 1);
    },
    setMarkerSessionId(state, val) {
      state.markerSessionId = val;
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

    updateShowMarkerOverlay({ commit, getters, dispatch }, value) {
      // pass new value or toggle current value
      if (typeof value === 'undefined') {
        value = !getters.showMarkerOverlay;
      }

      commit('setShowMarkerOverlay', value);
      dispatch('updateMarkerSessionId', value ? Date.now() : '');
    },

    addMarker({ commit }, value) {
      commit('addMarker', value);
    },

    removeMarker({ commit, getters }, id) {
      getters.markers.forEach((marker, i) => {
        if (marker.id === id) {
          commit('removeMarker', i);
        }
      });
    },

    updateMarkerSessionId({ commit }, sessionId) {
      commit('setMarkerSessionId', sessionId);
    },

    removeSessionMarkers({ getters, dispatch }) {
      getters.sessionMarkers.forEach((marker) => dispatch('removeMarker', marker.id));

      dispatch('updateShowMarkerOverlay', false);
    },
  },
};
