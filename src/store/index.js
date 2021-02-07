import { createStore } from 'vuex';
// import userStore from './userStore';
import userStore from './userStore';

export default createStore({
  modules: {
    user: userStore,
  },
});

// import { createStore } from 'vuex';
// import { auth, usersRef } from '@/firebase';
// import router from '@/router';

// export default createStore({
//   state: {
//     user: {},
//     error: {},
//   },

//   getters: {
//     user: (state) => state.user,
//     error: (state) => state.error,
//   },

//   mutations: {
//     setUser(state, val) {
//       state.user = val;
//     },
//     setError(state, val) {
//       state.error = val;
//     },
//   },

//   actions: {
//     async signUp({ dispatch }, form) {
//       try {
//         const { user } = await auth.createUserWithEmailAndPassword(form.email, form.password);

//         // store user profile in db
//         await usersRef.doc(user.uid).set({
//           uid: user.uid,
//           name: form.name,
//           mail: form.email,
//           role: 'student',
//         });

//         // fetch user profile and set in state
//         dispatch('getUser', user);
//       } catch (err) {
//         dispatch('setError', err);
//       }
//     },

//     async login({ dispatch }, form) {
//       try {
//         const { user } = await auth.signInWithEmailAndPassword(form.email, form.password);

//         // fetch user profile and set in state
//         dispatch('getUser', user);
//       } catch (err) {
//         dispatch('setError', err);
//       }
//     },

//     async getUser({ commit }, user) {
//       const userProfile = await usersRef.doc(user.uid).get();

//       commit('setUser', userProfile.data());

//       // navigate user to homepage
//       if (router.currentRoute.value.name === 'login') {
//         router.push('/');
//       }
//     },

//     async logout({ commit }) {
//       await auth.signOut();

//       // reset userProfile and redirect to /login
//       commit('setUser', {});
//       router.push('/login');
//     },

//     setError({ commit }, error) {
//       commit('setError', error);
//       console.error(error);
//     },
//   },

//   modules: {
//   },
// });
