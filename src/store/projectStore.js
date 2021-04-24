import { projectsRef } from '@/firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    projects: [],
    myProjects: [],
    sharedProjects: [],
  },

  getters: {
    projects: (state) => state.projects,
    myProjects: (state) => state.myProjects,
    sharedProjects: (state) => state.sharedProjects,
  },

  mutations: {
    setProjects(state, val) {
      state.projects = val;
    },
    setMyProjects(state, val) {
      state.myProjects = val;
    },
    setSharedProjects(state, val) {
      state.sharedProjects = val;
    },
  },

  actions: {
    async getProjects({ rootGetters, commit, dispatch }) {
      try {
        const projects = [];
        const myProjects = [];
        const sharedProjects = [];
        const snapshot = await projectsRef.get();

        snapshot.forEach((doc) => projects.push({ id: doc.id, data: doc.data() }));
        projects.forEach((project) => {
          if (project.data.owner.id === rootGetters['user/user'].id) {
            myProjects.push(project);
          } else if (project.data.group === rootGetters['user/user'].group) {
            sharedProjects.push(project);
          }
        });

        commit('setProjects', projects);
        commit('setMyProjects', myProjects);
        commit('setSharedProjects', sharedProjects);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async getProject({ dispatch }, payload) {
      try {
        const doc = await projectsRef.doc(payload).get();
        return doc.data();
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async addProject({ rootGetters, dispatch }, payload) {
      try {
        const doc = await projectsRef.add({
          title: payload,
          ts: Date.now(),
          owner: rootGetters['user/user'],
          group: rootGetters['user/user'].group,
        });

        dispatch('getProjects');
        router.push(`/project/${doc.id}`);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    handleError({ dispatch }, payload) {
      console.error('Error in projectStore:', payload);
      dispatch('message/message', { message: payload.message, mode: 'error' }, { root: true });
    },
  },
};
