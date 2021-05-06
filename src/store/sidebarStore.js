import areEqual from 'deep-equal';

export default {
  namespaced: true,

  state: {
    insightInput: '',
    hideDocumentation: false,
    hideVisualisation: false,
    showPopUp: true,
    activeTab: null,
    showFeedbackHelperZero: true,
    textInput: '',
    activeTipIndex: null,
    showMarkerOverlay: false,
    markers: [],
    sessionMarkers: [],
    showImageSidebar: false,
    feedbackImage: null,
    selectedImageBackup: null,
    selectedImage: null,
    selectedImagePreview: null,
  },

  getters: {
    insightInput: (state) => state.insightInput,
    hideDocumentation: (state) => state.hideDocumentation,
    hideVisualisation: (state) => state.hideVisualisation,
    showPopUp: (state) => state.showPopUp,
    activeTab: (state) => state.activeTab,
    showFeedbackHelperZero: (state) => state.showFeedbackHelperZero,
    textInput: (state) => state.textInput,
    activeTipIndex: (state) => state.activeTipIndex,
    showMarkerOverlay: (state) => state.showMarkerOverlay,
    markers: (state) => state.markers,
    sessionMarkers: (state) => state.sessionMarkers,
    numberOfMarkers: (state) => state.markers.length,
    markersAreChanged: (state) => !areEqual(state.markers, state.sessionMarkers),
    showImageSidebar: (state) => state.showImageSidebar,
    feedbackImage: (state) => state.feedbackImage,
    selectedImageBackup: (state) => state.selectedImageBackup,
    selectedImage: (state) => state.selectedImage,
    selectedImagePreview: (state) => state.selectedImagePreview,
    imageIsChanged: (state) => !areEqual(state.selectedImage, state.selectedImageBackup),
  },

  mutations: {
    setInsightInput(state, val) {
      state.insightInput = val;
    },
    setHideDocumentation(state, val) {
      state.hideDocumentation = val;
    },
    setHideVisualisation(state, val) {
      state.hideVisualisation = val;
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
    setActiveTipIndex(state, val) {
      state.activeTipIndex = val;
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
    setShowImageSidebar(state, val) {
      state.showImageSidebar = val;
    },
    setFeedbackImage(state, val) {
      state.feedbackImage = val;
    },
    setSelectedImageBackup(state, val) {
      state.selectedImageBackup = val;
    },
    setSelectedImage(state, val) {
      state.selectedImage = val;
    },
    setSelectedImagePreview(state, val) {
      state.selectedImagePreview = val;
    },
  },

  actions: {
    updateInsightInput({ commit }, payload) {
      commit('setInsightInput', payload);
    },

    updateHideDocumentation({ commit }, payload) {
      commit('setHideDocumentation', payload);
    },

    updateHideVisualisation({ commit }, payload) {
      commit('setHideVisualisation', payload);
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
      dispatch('updateActiveTipIndex', null);
    },

    updateActiveTipIndex({ commit }, payload) {
      commit('setActiveTipIndex', payload);
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

    resetAllMarkers({ commit }) {
      // only used when the feedback/comment has been posted and all associated data (markers & images) need to be reset
      commit('setMarkers', []);
      commit('setSessionMarkers', []);
    },

    updateShowImageSidebar({ commit }, payload) {
      commit('setShowImageSidebar', payload);
    },

    resetImageState({ dispatch, getters }) {
      dispatch('updateSelectedImage', getters.feedbackImage);
      dispatch('updateSelectedImageBackup', getters.feedbackImage);
    },

    updateSelectedImage({ commit }, payload) {
      commit('setSelectedImage', payload);
    },

    updateSelectedImagePreview({ commit }, payload) {
      commit('setSelectedImagePreview', payload);
    },

    updateSelectedImageBackup({ commit }, payload) {
      commit('setSelectedImageBackup', payload);
    },

    updateFeedbackImage({ commit }, payload) {
      commit('setFeedbackImage', payload);
    },
  },
};

function cleanSource(source) {
  // use native JSON functions to remove the reactivity so objects (including arrays) can be cloned without mutating the original source
  // also see: https://forum.vuejs.org/t/how-to-remove-array-binding/53751
  return JSON.parse(JSON.stringify(source));
}
