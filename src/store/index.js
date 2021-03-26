import { createStore } from 'vuex';
import groupStore from './groupStore';
import userStore from './userStore';
import stepStore from './stepStore';
import tabStore from './tabStore';

export default createStore({
  modules: {
    group: groupStore,
    user: userStore,
    step: stepStore,
    tab: tabStore,
  },
});
