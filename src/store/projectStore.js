import { projectsRef } from '@/firebase';

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
          } else if (project.data.group === rootGetters['user/user'].group) { // todo: dit werkt voor 'students', als de gebruiker een teacher/expert/admin is moeten alle projecten altijd zichtbaar zijn
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

    async addProject({ rootGetters, dispatch }, payload) {
      try {
        const doc = await projectsRef.add({
          title: payload,
          ts: Date.now(),
          owner: rootGetters['user/user'],
          group: rootGetters['user/user'].group,
        });

        // todo: navigate naar project: doc.id
        // todo: om dit goed te laten werken moet de route guard waarschijnlijk geupdate worden met een check die kijkt in welke groep je zit en uit welke groep het project komt

        dispatch('getProjects');
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
