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

    async getUser({ commit }, payload) {
      const userProfile = await usersRef.doc(payload.uid).get();

      commit('setUser', userProfile.data());

      // navigate user to homepage
      // todo: check of user is ingelogd (zo niet, dan is er iets fout gegaan en moet de gebruiker op de login pagina blijven, als het wel goed gegaan is dan mag hij/zij naar het dashboard [in huidige situatie worden users ook naar het dashboard gestuurd als de login een error gaf])
      if (router.currentRoute.value.name === 'login') {
        router.push('/');
      }
    },

    async isUserLoggedIn({ getters }) {
      return getters.user;
    },

    async logout({ commit }) {
      await auth.signOut();

      commit('setUser', {});
      router.push('/login');
    },

    handleError({ dispatch }, payload) {
      console.error('Error in userStore:', payload);
      dispatch('message/message', { message: payload.message, mode: 'error' }, { root: true });
    },
  },
};
