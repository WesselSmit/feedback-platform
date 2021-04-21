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
        // abort and display error if inputs are empty (email & password inputs are checked by firebase auth)
        if (!payload.name || !payload.group) {
          const err = {
            message: !payload.name ? 'Enter your name' : 'Select a group',
          };
          dispatch('handleError', err);
          return;
        }

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
      const errorMessage = getErrorMessage(payload);
      dispatch('message/message', { message: errorMessage, mode: 'error' }, { root: true });
    },
  },
};

// map firebase errors to custom error messages
function getErrorMessage(errorObj) {
  switch (errorObj.code) {
    case 'auth/invalid-email':
      return 'Email is invalid';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long';
    case 'auth/email-already-in-use':
      return 'Email is already in use';
    default:
      return errorObj.message;
  }
}
