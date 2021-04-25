import { projectsRef } from '@/firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    project: null,
    newProgressAvailable: false,
    projects: [],
    myProjects: [],
    sharedProjects: [],
  },

  getters: {
    project: (state) => state.project,
    projectId: (state) => state.project?.id,
    owner: (state) => state.project?.data?.owner.id,
    newProgressAvailable: (state) => state.newProgressAvailable,
    projects: (state) => state.projects,
    myProjects: (state) => state.myProjects,
    sharedProjects: (state) => state.sharedProjects,
  },

  mutations: {
    setProject(state, val) {
      state.project = val;
    },
    setProgress(state, val) {
      state.project.data.progress = val;
    },
    setNewProgressAvailable(state, val) {
      state.newProgressAvailable = val;
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
          dispatch('addUserProgress', { project, userProgress: fallback });
        }

        return userProgress || fallback;
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async addUserProgress({ commit, dispatch }, payload) {
      try {
        // add user progress to project progress
        payload.project.data.progress.push(payload.userProgress);

        await projectsRef.doc(payload.project.id).set(payload.project.data);
        commit('setProgress', payload.project.data);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async updateProgress({ commit, getters, dispatch }, payload) {
      try {
        const userProgress = await dispatch('getProgress');

        switch (payload) {
          case 'nextStep':
            userProgress.progress += 1;
            break;
          case 'previousStep':
            userProgress.progress -= 1;
            break;
          default:
            console.error('unhandled progress update command');
        }

        const project = getters.project;
        const progress = project.data.progress;

        // remove old userProgress from project.progress
        const userIndex = progress.map((progressObj) => progressObj.userId).indexOf(userProgress.userId);
        progress.splice(userIndex, 1);

        // add updated userProgress to project.progress
        progress.push(userProgress);

        // update project in state
        commit('setProgress', progress);

        // update project in db
        await projectsRef.doc(project.id).update({ progress });

        // signal Project.vue to get new progress from store
        commit('setNewProgressAvailable', true);

        dispatch('sidebar/updateHideVisualisation', false, { root: true }); // always show visualisation unless disabled in blueprint
        dispatch('sidebar/updateShowFeedbackHelperZero', true, { root: true }); // always show feedbackHelper zero state in new sidebar step
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    resetNewProgressAvailable({ commit }) {
      commit('setNewProgressAvailable', false);
    },

    handleError({ dispatch }, payload) {
      console.error('Error in projectStore:', payload);
      dispatch('message/message', { message: payload.message, mode: 'error' }, { root: true });
    },
  },
};
