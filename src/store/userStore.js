import { auth, usersRef } from '@/firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    user: {},
  },

  getters: {
    user: (state) => state.user,
    id: (state) => state.user.uid,
    role: (state) => state.user.role,
    group: (state) => state.user.group,
  },

  mutations: {
    setUser(state, val) {
      state.user = val;
    },
  },

  actions: {
    async signUp({ dispatch }, payload) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(payload.email, payload.password);

        await usersRef.doc(user.uid).set({
          uid: user.uid,
          name: payload.name,
          mail: payload.email,
          group: payload.group,
          role: 'student',
        });

        dispatch('getUser', user);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async login({ dispatch }, payload) {
      try {
        const { user } = await auth.signInWithEmailAndPassword(payload.email, payload.password);

        dispatch('getUser', user);
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async getUser({ commit, dispatch }, payload) {
      try {
        const userProfile = await usersRef.doc(payload.uid).get();

        commit('setUser', userProfile.data());

        // navigate user to homepage
        if (router.currentRoute.value.name === 'login') {
          router.push('/');
        }
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    async logout({ commit, dispatch }) {
      try {
        await auth.signOut();

        commit('setUser', {});
        router.push('/login');
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    handleError({ dispatch }, payload) {
      console.error('Error in userStore:', payload);
      dispatch('message/message', { message: payload.message, mode: 'error' }, { root: true });
    },
  },
};
