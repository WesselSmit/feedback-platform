import { createStore } from 'vuex';
import groupStore from '@/store/groupStore';
import projectStore from '@/store/projectStore';
import setupStore from '@/store/setupStore';
import userStore from '@/store/userStore';
import sidebarStore from '@/store/sidebarStore';
import feedbackStore from '@/store/feedbackStore';
import messageStore from '@/store/messageStore';

export default createStore({
  modules: {
    group: groupStore,
    project: projectStore,
    setup: setupStore,
    user: userStore,
    sidebar: sidebarStore,
    feedback: feedbackStore,
    message: messageStore,
  },
});
