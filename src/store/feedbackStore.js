import { commentsRef } from '@/firebase';

export default {
  namespaced: true,

  state: {
    feedback: [],
    error: {},
  },

  getters: {
    feedback: (state) => state.feedback,
    error: (state) => state.error,
  },

  mutations: {
    setFeedback(state, val) {
      state.feedback = val;
    },
    setError(state, val) {
      state.error = val;
    },
  },

  actions: {
    async postComment({ dispatch }, comment) {
      try {
        const res = await commentsRef.add({
          ts: Date.now(),
          user: 'You', // todo: should be fetched frmom userStore (when implemented with login)
          text: comment,
        });
      } catch (err) {
        dispatch('setError', err);
      }
    },

    setError({ commit }, error) {
      commit('setError', error);
      console.error('Error in feedbackStore:', error);
    },
  },
};
