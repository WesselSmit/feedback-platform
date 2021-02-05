import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import { auth } from '@/firebase';

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
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Check if user should be able to see page, otherwise redirect to login page
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  // TODO: denk goed na over hoe je de routes gaat protecten
  // TODO: alleen coach/admin roles mogen alle projecten zien, student role moet beperkt zijn tot eigen projecten en de projecten die met hem gedeeld zijn

  // TODO: note: Vuex state word gereset wanneer de page refreshed (https://stackoverflow.com/questions/43027499/vuex-state-on-page-refresh#:~:text=Vuex%20state%20is%20kept%20in,does%20not%20persist%20on%20reload.)
  // TODO: miss is het een idee om een een functie te maken (in App.vue?) die altijd meteen de user fetched van firebase en deze in de store zet

  if (requiresAuth && !auth.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
