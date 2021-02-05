import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import { auth } from '@/firebase';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/disallowed',
    name: 'disallowed',
    component: () => import(/* webpackChunkName: "disallowed" */ '@/views/Disallowed.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['coach', 'admin'],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store,
});

// Check if user should be able to see page, otherwise redirect to login page
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const { allowedRoles } = to.meta;

  console.log(allowedRoles);

  if (requiresAuth && !auth.currentUser) {
    console.log('requires authorisation and user is not authorised');
    next('/login');
  } else if (allowedRoles) {
    if (!auth.currentUser) { // if role/permission is required authorisation is also required
      console.log('requires permission and user is not authorised');
      next('/login');
    } else {
      // this needs to dispatch first because of racing conditions
      const { role } = await store.dispatch('getUser', auth.currentUser).then(() => store.getters.user);

      if (allowedRoles.includes(role)) { // check if user has permission
        console.log('user is allowed to view');
        next();
      } else {
        console.log('user does not have the required permissions');
        next('/disallowed');
      }
    }
  } else {
    console.log('all went well');
    next();
  }
});

export default router;
