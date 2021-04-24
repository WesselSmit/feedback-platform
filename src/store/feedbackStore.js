import { db } from '@/firebase';

export default {
  namespaced: true,

  state: {
    comments: [],
  },

  getters: {
    comments: (state) => state.comments,
  },

  mutations: {
    setComments(state, val) {
      state.comments = val;
    },
  },

  actions: {
    async postInsight({ dispatch, rootGetters }, payload) {
      try {
        await db.collection(`insights-${payload.projectId}`).add({
          ts: Date.now(),
          user: rootGetters['user/user'],
          insight: payload.insight,
        });
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async postComment({ dispatch, rootGetters }, payload) {
      try {
        await db.collection(`comments-${payload.projectId}`).add({
          ts: Date.now(),
          user: rootGetters['user/user'],
          text: payload.comment,
          image: rootGetters['sidebar/feedbackImage']?.id || null,
          markers: rootGetters['sidebar/markers'],
          agrees: [],
        });
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async getComments({ commit, dispatch }, payload) {
      try {
        const comments = [];
        const snapshot = await db.collection(`comments-${payload}`).get();
        snapshot.forEach((doc) => comments.push({ id: doc.id, data: doc.data() }));

        commit('setComments', comments);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async updateAgrees({ dispatch }, payload) {
      try {
        await db.collection(`comments-${payload.projectId}`).doc(payload.commentId).update({
          agrees: payload.agrees,
        });
        dispatch('getComments', payload.projectId);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    handleError({ dispatch }, payload) {
      console.error('Error in feedbackStore:', payload);
      dispatch('message/message', { message: payload.message, mode: 'error' }, { root: true });
    },
  },
};
