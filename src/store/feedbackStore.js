import { insightsRef, commentsRef } from '@/firebase';
import { v4 as uuid } from 'uuid';

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
        await insightsRef.add({
          projectId: payload.projectId,
          ts: Date.now(),
          user: rootGetters['user/user'],
          insight: payload.insight,
        });
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async addCommentsDocInProjectCollection({ dispatch }, payload) {
      // add an empty doc in the 'comments' collection
      try {
        await commentsRef.doc(payload).set({
          comments: [],
        });
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async postComment({ dispatch, rootGetters }, payload) {
      try {
        // declare image & markers as const to avoid proxies
        const image = rootGetters['sidebar/feedbackImage']?.id || null;
        const markers = rootGetters['sidebar/markers'];

        const doc = await commentsRef.doc(payload.projectId).get();
        const comments = doc?.data()?.comments || [];

        if (comments.length === 0) {
          // add zero-state 'comment' doc to collection 'comments' collection
          await commentsRef.doc(payload.projectId).set({
            comments: [],
          });
        }

        comments.push({
          id: uuid(),
          ts: Date.now(),
          user: rootGetters['user/user'],
          text: payload.comment,
          image,
          markers,
          agrees: [],
        });

        await commentsRef.doc(payload.projectId).update({ comments });
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async getComments({ commit, dispatch }, payload) {
      try {
        const doc = await commentsRef.doc(payload).get();
        const comments = doc?.data()?.comments || [];

        commit('setComments', comments);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async updateAgrees({ getters, rootGetters, dispatch }, payload) {
      try {
        const comments = getters.comments;
        const userId = rootGetters['user/id'];
        const comment = comments.find((comment) => comment.id === payload.commentId);
        const agreeIndex = comment.agrees.indexOf(userId);

        if (agreeIndex === -1) {
          comment.agrees.push(userId);
        } else {
          comment.agrees.splice(agreeIndex, 1);
        }

        await commentsRef.doc(payload.projectId).update({ comments });
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
