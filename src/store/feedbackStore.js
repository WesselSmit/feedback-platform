import { db } from '@/firebase';

export default {
  namespaced: true,

  state: {
    comments: [],
    error: {},
  },

  getters: {
    comments: (state) => state.comments,
    error: (state) => state.error,
  },

  mutations: {
    setComments(state, val) {
      state.comments = val;
    },
    setError(state, val) {
      state.error = val;
    },
  },

  actions: {
    async postComment({ dispatch, rootGetters }, payload) {
      try {
        await db.collection(`comments-${payload.projectId}`).add({
          ts: Date.now(),
          user: { // todo: user moet uit userStore komen (gebruikt nu allemaal placeholder's)
            id: 'TESTER',
            name: 'TESTER',
            role: 'TESTER',
            color: 'TESTER',
          },
          text: payload.comment,
          image: rootGetters['sidebar/feedbackImage']?.id || null,
          markers: rootGetters['sidebar/markers'],
          agrees: [],
        });
      } catch (err) {
        dispatch('setError', err);
      }
    },

    async getComments({ commit, dispatch }, payload) {
      try {
        const comments = [];
        const snapshot = await db.collection(`comments-${payload}`).get();
        snapshot.forEach((doc) => comments.push({ id: doc.id, data: doc.data() }));

        commit('setComments', comments);
      } catch (err) {
        dispatch('setError', err);
      }
    },

    async updateAgrees({ dispatch }, payload) {
      try {
        await db.collection(`comments-${payload.projectId}`).doc(payload.commentId).update({
          agrees: payload.agrees,
        });
        dispatch('getComments', payload.projectId);
      } catch (err) {
        dispatch('setError', err);
      }
    },

    setError({ commit }, payload) {
      commit('setError', payload);
      console.error('Error in feedbackStore:', payload);
    },
  },
};
