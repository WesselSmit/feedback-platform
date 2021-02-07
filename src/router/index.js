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
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['coach', 'admin'],
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

  // TODO: note: Vuex state word gereset wanneer de page refreshed (https://stackoverflow.com/questions/43027499/vuex-state-on-page-refresh#:~:text=Vuex%20state%20is%20kept%20in,does%20not%20persist%20on%20reload.)
  // TODO: miss is het een idee om een een functie te maken (in App.vue?) die altijd meteen de user fetched van firebase en deze in de store zet

  if (requiresAuth && !auth.currentUser) {
    console.log('requires authorisation and user is not authorised');
    next('/login');
  } else if (allowedRoles) { // TODO make separate function for all code inside 'else if (allowedRules)'
    if (!auth.currentUser) { // if role/permission is required authorisation is also required
      console.log('requires permission and user is not authorised');
      next('/login');
    } else {
      // this needs to dispatch first because it needs to wait for the user data to be fetched and set in state
      const role = await store.dispatch('user/getUser', auth.currentUser).then(() => store.getters['user/role']);

      if (role && allowedRoles.includes(role)) { // check if user has permission
        console.log('user is allowed to view');
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
