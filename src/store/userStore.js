import { auth, usersRef } from '@/firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    user: {},
    error: {},
  },

  getters: {
    user: (state) => state.user,
    role: (state) => state.user.role,
    group: (state) => state.user.group,
    error: (state) => state.error,
  },

  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setError(state, val) {
      state.error = val;
    },
  },

  actions: {
    async signUp({ dispatch }, payload) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(payload.email, payload.password);

        // store user profile in db
        await usersRef.doc(user.uid).set({
          uid: user.uid,
          name: payload.name,
          mail: payload.email,
          group: payload.group,
          role: 'student',
        });

        // fetch user profile and set in state
        dispatch('getUser', user);
      } catch (err) {
        dispatch('setError', err);
      }
    },

    async login({ dispatch }, payload) {
      try {
        const { user } = await auth.signInWithEmailAndPassword(payload.email, payload.password);

        // fetch user profile and set in state
        dispatch('getUser', user);
      } catch (err) {
        dispatch('setError', err);
      }
    },

    async getUser({ commit }, payload) {
      const userProfile = await usersRef.doc(payload.uid).get();

      commit('setUser', userProfile.data());

      // navigate user to homepage
      if (router.currentRoute.value.name === 'login') {
        router.push('/');
      }
    },

    async logout({ commit }) {
      await auth.signOut();

      // reset userProfile and redirect to /login
      commit('setUser', {});
      router.push('/login');
    },

    setError({ commit }, payload) {
      commit('setError', payload);
      console.error('Error in userStore:', payload);
    },
  },
};
