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

  // todo: wanneer een user de role van expert/coach krijgt moet hij aan alle groups toegevoegd worden

  actions: {
    async fetchGroups({ dispatch, commit }) {
      try {
        const snapshot = await groupsRef.get();
        const groups = snapshot.docs.map((doc) => doc.data());
        const groupNames = snapshot.docs.map((doc) => doc.id);

        commit('setGroups', groups);
        commit('setGroupNames', groupNames);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async addUserToGroup({ dispatch }, payload) {
      try {
        let userIdsInGroup;
        const snapshot = await groupsRef.get();
        snapshot.forEach((doc) => {
          if (doc.id === payload.group) {
            userIdsInGroup = doc.data().users;
          }
        });
        userIdsInGroup.push(payload.userId);

        await groupsRef.doc(payload.group).set({
          users: userIdsInGroup,
        });
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
