import { groupsRef } from '@/firebase';

export default {
  namespaced: true,

  state: {
    groups: [],
    groupNames: [],
  },

  getters: {
    groups: (state) => state.groups,
    groupNames: (state) => state.groupNames,
  },

  mutations: {
    setGroups(state, val) {
      state.groups = val;
    },
    setGroupNames(state, val) {
      state.groupNames = val;
    },
  },

  actions: {
    async fetchGroups({ dispatch, commit }) {
      try {
        const snapshot = await groupsRef.get();
        const groups = snapshot.docs.map((doc) => doc.data());
        const groupNames = snapshot.docs.map((doc) => doc.id);

        // TODO: voeg gebruiker toe in firestore group (in een array met uid's + namen van alle users die onderdeel zijn). dispatch hiervoor een nieuwe action
        // TODO: coaches + experts worden toegevoegd aan alle groups

        commit('setGroups', groups);
        commit('setGroupNames', groupNames);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    handleError({ dispatch }, payload) {
      console.error('Error in groupStore:', payload);
      dispatch('message/message', { message: payload.message, mode: 'error' }, { root: true });
    },
  },
};
