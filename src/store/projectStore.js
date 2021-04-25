import { projectsRef } from '@/firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    project: null,
    projects: [],
    myProjects: [],
    sharedProjects: [],
  },

  getters: {
    project: (state) => state.project,
    owner: (state) => state.project?.data?.owner.id,
    progress: (state) => state.project?.data?.progress,
    projects: (state) => state.projects,
    myProjects: (state) => state.myProjects,
    sharedProjects: (state) => state.sharedProjects,
  },

  mutations: {
    setProject(state, val) {
      state.project = val;
    },
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
          if (project.data.owner.id === rootGetters['user/userId']) {
            myProjects.push(project);
          } else if (project.data.group === rootGetters['user/group']) {
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

    async getProject({ commit, dispatch }, payload) {
      try {
        const doc = await projectsRef.doc(payload).get();
        const project = {
          id: doc.id,
          data: doc.data(),
        };

        commit('setProject', project);
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
          group: rootGetters['user/group'],
          progress: [{
            userId: rootGetters['user/userId'],
            progress: 1,
            type: 'setup',
          }],
        });

        dispatch('getProjects');
        router.push(`/project/${doc.id}`);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async getProgress({ getters, rootGetters, dispatch }) {
      try {
        const userId = rootGetters['user/id'];
        const userProgress = getters.project.data.progress.find((user) => user.id === userId);
        const fallback = { // used if user isn't yet added in the progress array (in DB) // todo: als fallback gebruikt wordt dan moet deze ook in de DB opgeslagen worden (anders blijft de gebruiker altijd op stap 1)
          id: userId,
          type: 'give',
          progress: 1,
        };

        return userProgress || fallback;
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
