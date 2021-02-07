import { groupsRef } from '@/firebase';

export default {
  namespaced: true,

  state: {
    groups: [],
    groupNames: [],
    error: {},
  },

  getters: {
    groups: (state) => state.groups,
    groupNames: (state) => state.groupNames,
    error: (state) => state.error,
  },

  mutations: {
    setGroups(state, val) {
      state.groups = val;
    },
    setGroupNames(state, val) {
      state.groupNames = val;
    },
    setError(state, val) {
      state.error = val;
    },
  },

  actions: {
    async fetchGroups({ dispatch, commit }) {
      try {
        const snapshot = await groupsRef.get();
        const groups = snapshot.docs.map((doc) => doc.data());
        const groupNames = snapshot.docs.map((doc) => doc.id);

        // TODO: voeg gebruiker toe in firestore group (in een array met uid's + namen van alle users die onderdeel zijn). Gebruik hiervoor een 2e action
        // TODO: hoe moet dit met coaches? zij behoren niet tot een groep, dus moeten ze dan een eigen coach group hebben?

        commit('setGroups', groups);
        commit('setGroupNames', groupNames);
      } catch (err) {
        dispatch('setError', err);
      }
    },

    setError({ commit }, error) {
      commit('setError', error);
      console.error('Error in groupStore:', error);
    },
  },
};
