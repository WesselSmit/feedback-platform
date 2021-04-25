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
    projectId: (state) => state.project?.id,
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
          if (project.data.owner.id === rootGetters['user/id']) {
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
            userId: rootGetters['user/id'],
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
        const project = getters.project;
        const userProgress = project.data.progress.find((user) => user.userId === userId);
        const fallback = { // used if user had no progress (object) for the selected project (in firestore db)
          userId,
          type: 'give',
          progress: 1,
        };

        if (!userProgress) {
          dispatch('updateProgress', { project, userProgress: fallback });
        }

        return userProgress || fallback;
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async updateProgress({ dispatch }, payload) {
      try {
        // add user progress to project progress
        payload.project.data.progress.push(payload.userProgress);
        await projectsRef.doc(payload.project.id).set(payload.project.data);
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
