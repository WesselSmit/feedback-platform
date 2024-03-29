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
        dispatch('setup/populateWithDatabase', null, { root: true });
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async addProject({ getters, rootGetters, dispatch }, payload) {
      try {
        const doc = await projectsRef.add({
          title: payload,
          visualisation: null,
          explanation: null,
          questions: [],
          limits: '',
          ts: Date.now(),
          owner: rootGetters['user/user'],
          group: rootGetters['user/group'],
          progress: [{
            userId: rootGetters['user/id'],
            progress: 1,
            type: 'setup',
          }],
        });

        dispatch('feedback/addCommentsDocInProjectCollection', getters.projectId, { root: true });

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

        const userProgress = (project.data.progress.length > 0) ? project?.data?.progress?.find((user) => user.userId === userId) : null;

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
        dispatch('getProject', payload.project.id);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async updateProgress({ commit, getters, dispatch }, payload) {
      try {
        const userProgress = await dispatch('getProgress');

        switch (payload.instruction) {
          case 'saveSetup':
            userProgress.type = 'view';
            router.push('/');
            dispatch('message/message', { message: 'Documentation saved and published', mode: 'succes' }, { root: true });
            break;
          case 'nextStep':
            userProgress.progress += 1;
            break;
          case 'previousStep':
            userProgress.progress -= 1;
            if (userProgress.progress < 1) { // prevent progress from being lower than 1 (if the user double clicks)
              userProgress.progress = 1;
            }
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

        if (!payload.hideVisualisation) {
          dispatch('sidebar/updateHideVisualisation', false, { root: true }); // always reset hideVisualisation unless payload.hideVisualisation is true
        }
        dispatch('sidebar/updateShowFeedbackHelperZero', true, { root: true }); // always reset showFeedbackHelperZero (zero state) in sidebar
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    // used to update an individual setup property (field in DB) of the current project
    async updateSetupProp({ rootGetters, getters, dispatch }, payload) {
      try {
        const value = rootGetters[`setup/${payload}`];
        await projectsRef.doc(getters.projectId).update({ [payload]: value });

        dispatch('getProjects');
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    // update the visualisation property of a project
    async updateVisualisation({ getters, dispatch }, payload) {
      try {
        await projectsRef.doc(getters.projectId).update({ visualisation: payload });

        dispatch('getProjects');
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
