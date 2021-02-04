import { createStore } from 'vuex';
import * as firebase from '@/firebase';
import router from '@/router';

export default createStore({
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
  },
  actions: {
    async signUp({ dispatch }, form) {
      // Create user account in firebase authentication
      const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password);

      // Create user profile in db
      await firebase.usersRef.doc(user.uid).set({
        name: form.name,
        title: 'title',
      });

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user);
    },
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password);

      // Fetch user profile and set in state
      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      // Fetch user profile from db
      const userProfile = await firebase.usersRef.doc(user.uid).get();

      // Set user profile in state
      commit('setUserProfile', userProfile.data());

      // Navigate user to homepage
      router.push('/');
    },
  },
  modules: {
  },
});
