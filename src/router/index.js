import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase';
import store from '@/store';
import Dashboard from '@/views/Dashboard.vue';

/*
  users must have one of the following 'roles':
  - admin
  - teacher
  - expert
  - student
*/

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () => import(/* webpackChunkName: "project" */ '@/views/Project.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      isProject: true,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin'],
    },
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
  const { allowedRoles, isProject } = to.meta;

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
        next(); // user is allowed to visit page
      } else {
        console.log('user does not have the required permissions');
        next('/dashboard');
      }
    }
  } else if (isProject) {
    // fetch user and project data to check if user is allowed to visit the page
    const { group: userGroup, role } = await store.dispatch('user/getUser', auth.currentUser).then(() => store.getters['user/user']);
    const project = await store.dispatch('project/getProject', to.params.id).then(() => store.getters['project/project']);

    if (!project) {
      console.log('requested project does not exist');
      next('/dashboard');
    } else if (userGroup === project.data.group || ['admin', 'teacher', 'expert'].includes(role)) { // user has permission to project if they are groupmembers or if they are admin/teacher/expert
      next(); // user is allowed to visit page
    } else if (auth.currentUser) {
      console.log('requires authorisation and user is not authorised');
      next('/dashboard');
    } else {
      console.log('user does not have the required permissions');
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
