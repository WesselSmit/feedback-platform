import { createStore } from 'vuex';
import groupStore from './groupStore';
import userStore from './userStore';
import sidebarStore from './sidebarStore';

export default createStore({
  modules: {
    group: groupStore,
    user: userStore,
    sidebar: sidebarStore,
  },
});
