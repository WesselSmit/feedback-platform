import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import { auth } from '@/firebase';
import store from '@/store';

const routes = [
  {
    path: '/poc/give',
    name: 'give',
    component: () => import(/* webpackChunkName: "give" */ '@/pocs/Give.vue'),
  },
  {
    path: '/poc/done',
    name: 'done',
    component: () => import(/* webpackChunkName: "done" */ '@/pocs/Done.vue'),
  },
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
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Admin.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin'],
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'dashboard' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Check if user should be able to see page, otherwise redirect to login page
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const { allowedRoles } = to.meta;

  if (requiresAuth && !auth.currentUser) {
    console.log('requires authorisation and user is not authorised');
    next('/login');
  } else if (allowedRoles) {
    if (!auth.currentUser) { // if role/permission is required authorisation is also required
      console.log('requires permission and user is not authorised');
      next('/login');
    } else {
      // this needs to dispatch first because it needs to wait for the user data to be fetched and set in state
      const role = await store.dispatch('user/getUser', auth.currentUser).then(() => store.getters['user/role']);

      if (role && allowedRoles.includes(role)) { // check if user has permission
        console.log('user is allowed to view page');
        next();
      } else {
        console.log('user does not have the required permissions');
        next('/404');
      }
    }
  } else {
    next();
  }
});

export default router;
