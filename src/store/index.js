import { createStore } from 'vuex';
import groupStore from './groupStore';
import userStore from './userStore';
import stepStore from './stepStore';

export default createStore({
  modules: {
    group: groupStore,
    user: userStore,
    step: stepStore,
  },
});
