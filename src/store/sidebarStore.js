import areEqual from 'deep-equal';

export default {
  namespaced: true,

  state: {
    hideVisualisation: false,
    stepIndex: 3, // moet uit DB opgehaald worden
    showPopUp: true,
    activeTab: 'give',
    showFeedbackHelperZero: true,
    textInput: '',
    showMarkerOverlay: false,
    markers: [],
    sessionMarkers: [],
    showImageSidebar: false,
    // feedbackImage: null,
    // selectedImage: null,
    // selectedImagePreview: null,
    perm: null,
    semiTemp: null,
    semiTempPreview: null,
    temp: null,
    tempPreview: null,
  },

  /*
  MIS:
  - save X
  - cancel X
  - toevoegen + cancel X
  - toevoegen + verwijder + cancel Y (image preview weg)
  - toevoegen + change + cancel Y (save button not available)
  - toevoegen + verwijder + save Y (change image button moet add image button zijn)
  - toevoegen + change + save Y ()

  de perm image --> opgeslagen image
  de semi-temp image --> selected image (zonder change) [backup als change gecancelled wordt]
  de temp image --> (changed) selected image

  user upload : temp
  user save : perm = temp

  perm = perm, semi-temp = perm, temp = perm
  user remove : temp = null
  user upload : temp
    user cancel : perm = perm, semi-temp = semi-temp, temp = semi-temp
    user save : perm = temp
*/

  /*
  user upload : temp
  user save : perm = temp

  perm = perm, semi-temp = perm, temp = perm
  user remove : temp = null
  user upload : temp
    user cancel : perm = perm, semi-temp = semi-temp, temp = semi-temp
    user save : perm = temp

  toegevoegd
  verwijdert
  gecancelled
  perm && !temp

  todo: check of semiTempPreview nog wel gebruikt wordt/nodig is

  todo: check of de state gereset waordt als je een comment achter laat

  todo: check of de files daadwerkleijk geupload worden naar firebase storage
*/

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
    showImageSidebar: (state) => state.showImageSidebar,
    // feedbackImage: (state) => state.feedbackImage,
    // selectedImage: (state) => state.selectedImage,
    // selectedImagePreview: (state) => state.selectedImagePreview,
    // imageIsChanged: (state) => !areEqual(state.feedbackImage?.file, state.selectedImage),
    perm: (state) => state.perm,
    semiTemp: (state) => state.semiTemp,
    semiTempPreview: (state) => state.semiTempPreview,
    temp: (state) => state.temp,
    tempPreview: (state) => state.tempPreview,
    imageIsChanged: (state) => !areEqual(state.temp, state.semiTemp),
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
    setShowImageSidebar(state, val) {
      state.showImageSidebar = val;
    },
    // setFeedbackImage(state, val) {
    //   state.feedbackImage = val;
    // },
    // setSelectedImage(state, val) {
    //   state.selectedImage = val;
    // },
    // setSelectedImagePreview(state, val) {
    //   state.selectedImagePreview = val;
    // },
    setPerm(state, val) {
      state.perm = val;
    },
    setSemiTemp(state, val) {
      state.semiTemp = val;
    },
    setSemiTempPreview(state, val) {
      state.semiTempPreview = val;
    },
    setTemp(state, val) {
      state.temp = val;
    },
    setTempPreview(state, val) {
      state.tempPreview = val;
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

    resetAllMarkers({ commit }) {
      // only used when the feedback/comment has been posted and all associated data (markers & images) need to be reset
      commit('setMarkers', []);
      commit('setSessionMarkers', []);
    },

    updateShowImageSidebar({ commit }, payload) {
      commit('setShowImageSidebar', payload);
    },

    // updateFeedbackImage({ commit }, payload) {
    //   commit('setFeedbackImage', payload);
    // },

    // updateSelectedImage({ commit }, payload) {
    //   commit('setSelectedImage', payload);
    // },

    // updateSelectedImagePreview({ commit }, payload) {
    //   commit('setSelectedImagePreview', payload);
    // },

    // resetFeedbackImage({ commit }) {
    //   commit('setFeedbackImage', null);
    //   commit('setSelectedImage', null);
    //   commit('setSelectedImagePreview', null);
    // },

    resetImageState({ dispatch, getters }) {
      // todo: als dit niet werkt dat moet het met cleanSource gedaan worden, cleanSource verwijdert echter wel de File van het object
      dispatch('updateTemp', getters.perm);
      dispatch('updateSemiTemp', getters.perm);
    },

    updateTemp({ commit }, payload) {
      commit('setTemp', payload);
    },

    updateTempPreview({ commit, dispatch }, payload) {
      commit('setTempPreview', payload);

      if (payload) {
        dispatch('updateSemiTempPreview', payload);
      }
    },

    updateSemiTemp({ commit }, payload) {
      commit('setSemiTemp', payload);
    },

    updateSemiTempPreview({ commit }, payload) {
      commit('setSemiTempPreview', payload);
    },

    updatePerm({ commit }, payload) {
      commit('setPerm', payload);
    },
  },
};

function cleanSource(source) {
  // use native JSON functions to remove the reactivity so objects (including arrays) can be cloned without mutating the original source
  // also see: https://forum.vuejs.org/t/how-to-remove-array-binding/53751
  return JSON.parse(JSON.stringify(source));
}
