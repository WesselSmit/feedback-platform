import { storageRef } from '@/firebase';

export default {
  namespaced: true,

  // todo: iterations

  state: {
    visualisation: null,
    visualisationPreview: null,
    explanation: '',
    questions: [],
    limits: '',
  },

  getters: {
    visualisation: (state) => state.visualisation,
    visualisationPreview: (state) => state.visualisationPreview,
    explanation: (state) => state.explanation,
    questions: (state) => state.questions,
    limits: (state) => state.limits,
  },

  mutations: {
    setVisualisation(state, val) {
      state.visualisation = val;
    },
    setVisualisationPreview(state, val) {
      state.visualisationPreview = val;
    },
    setExplanation(state, val) {
      state.explanation = val;
    },
    setQuestions(state, val) {
      state.questions = val;
    },
    setLimits(state, val) {
      state.limits = val;
    },
  },

  actions: {
    async populateWithDatabase({ commit, rootGetters }) {
      const project = rootGetters['project/project'];

      commit('setVisualisation', project.data.visualisation);
      commit('setExplanation', project.data.explanation);
      commit('setQuestions', project.data.questions);
      commit('setLimits', project.data.limits);

      if (project.data.visualisation) {
        try {
          const preview = await storageRef.child(`visualisations/${project.data.visualisation}`).getDownloadURL();
          commit('setVisualisationPreview', preview);
        } catch (err) {
          console.error('Couldn\'t get visualisation preview from DB');
        }
      } else {
        commit('setVisualisationPreview', null);
      }
    },

    updateVisualisation({ commit }, payload) {
      commit('setVisualisation', payload);
    },

    updateVisualisationPreview({ commit }, payload) {
      commit('setVisualisationPreview', payload);
    },

    updateExplanation({ commit }, payload) {
      commit('setExplanation', payload);
    },

    updateQuestions({ commit }, payload) {
      commit('setQuestions', payload);
    },

    updateLimits({ commit }, payload) {
      commit('setLimits', payload);
    },
  },
};
