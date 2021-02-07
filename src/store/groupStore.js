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
    async getGroups({ commit }) {
      const snapshot = await groupsRef.get();

      const groups = snapshot.docs.map((doc) => doc.data());
      const groupNames = snapshot.docs.map((doc) => doc.id);

      commit('setGroups', groups);
      commit('setGroupNames', groupNames);
    },
  },
};
