import { createStore } from 'vuex';
import * as firebase from '@/firebase';
import router from '@/router';

export default createStore({
  state: {
    user: {},
    error: {},
  },

  getters: {
    error: (state) => state.error,
  },

  mutations: {
    setUserProfile(state, val) {
      state.user = val;
    },
    setError(state, val) {
      state.error = val;
    },
  },

  actions: {
    async signUp({ dispatch }, form) {
      try {
        // Create user account in firebase authentication
        const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password);

        // Create user profile in db
        await firebase.usersRef.doc(user.uid).set({
          uid: user.uid,
          name: form.name,
        });

        // fetch user profile and set in state
        dispatch('getUserProfile', user);
      } catch (err) {
        dispatch('setError', err);
      }
    },

    async login({ dispatch }, form) {
      try {
        // sign user in
        const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password);

        // Fetch user profile and set in state
        dispatch('getUserProfile', user);
      } catch (err) {
        dispatch('setError', err);
      }
    },

    async getUserProfile({ commit }, user) {
      // Get user profile from db
      const userProfile = await firebase.usersRef.doc(user.uid).get();

      // Set user profile in state
      commit('setUserProfile', userProfile.data());

      // Navigate user to homepage
      router.push('/');
    },

    setError({ commit }, error) {
      commit('setError', error);
      console.error(error);
    },
  },

  modules: {
  },
});
