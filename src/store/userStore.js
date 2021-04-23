import { auth, usersRef } from '@/firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    user: {},
    colors: {
      blueLight: '#85BEF5',
      blueDark: '#48A4FE',
      purpleLight: '#C5BAFA',
      purpleDark: '#9761F6',
      pinkLight: '#F661BA',
      pinkDark: '#FF97D5',
      redLight: '#EF8B7C',
      redDark: '#E05933',
      orangeLight: '#FEBF84',
      orangeDark: '#F79A44',
      yellowLight: '#F0CD6A',
      yellowDark: '#F7C844',
      greenLight: '#5CC083',
      greenDark: '#4DA560',
    },
  },

  getters: {
    user: (state) => state.user,
    id: (state) => state.user.id,
    role: (state) => state.user.role,
    group: (state) => state.user.group,
    color: (state) => state.user.color,
    colors: (state) => state.colors,
  },

  mutations: {
    setUser(state, val) {
      state.user = val;
    },
  },

  actions: {
    async signUp({ dispatch, getters }, payload) {
      try {
        // abort and display error if inputs are empty (email & password inputs are checked by firebase auth)
        if (!payload.name || !payload.group) {
          const err = {
            message: !payload.name ? 'Enter your name' : 'Select your group',
          };
          dispatch('handleError', err);
          return;
        }

        const { user } = await auth.createUserWithEmailAndPassword(payload.email, payload.password);

        await usersRef.doc(user.uid).set({
          id: user.uid,
          name: payload.name,
          mail: payload.email,
          group: payload.group,
          role: 'student',
          color: chooseColor(getters.colors),
        });

        dispatch('getUser', user);
        dispatch('group/addUserToGroup', { userId: user.uid, group: payload.group }, { root: true });
      } catch (err) {
        dispatch('handleError', err);
      }
    },

    getColorHex({ getters }, payload) {
      const matchingColorObj = Object.entries(getters.colors).filter((colorObj) => colorObj[0] === payload);
      const colorArr = [...matchingColorObj][0];

      if (!colorArr) return;
      return colorArr[1];
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

    async resetPassword({ dispatch }, payload) {
      if (payload === '') {
        dispatch('handleError', { message: 'Enter an email' });
      }

      try {
        await auth.sendPasswordResetEmail(payload);
        dispatch('message/message', { message: 'A reset link has been sent to your email', mode: 'succes' }, { root: true });
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
  console.log(errorObj, errorObj.code, errorObj.message);
  switch (errorObj.code) {
    case 'auth/invalid-email':
      return 'Email is invalid';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long';
    case 'auth/email-already-in-use':
      return 'Email is already in use';
    case 'auth/user-not-found':
      return 'No account found with login credentials';
    default:
      return errorObj.message;
  }
}

function chooseColor(colors) {
  const colorsArray = Object.keys(colors);
  const random = Math.floor(Math.random() * colorsArray.length);
  return colorsArray[random];
}
