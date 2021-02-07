import { createStore } from 'vuex';
import groupStore from './groupStore';
import userStore from './userStore';

export default createStore({
  modules: {
    group: groupStore,
    user: userStore,
  },
});
