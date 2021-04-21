import { createStore } from 'vuex';
import groupStore from './groupStore';
import userStore from './userStore';
import sidebarStore from './sidebarStore';
import feedbackStore from './feedbackStore';
import messageStore from './messageStore';

export default createStore({
  modules: {
    group: groupStore,
    user: userStore,
    sidebar: sidebarStore,
    feedback: feedbackStore,
    message: messageStore,
  },
});
