import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // import solo para tipos
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import New from '../components/New.vue';
import Edit from '../components/Edit.vue';
import Register from '../components/Register.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/', 
    name: 'login',
    component: Login
  },
  {
  path: '/register',
  name: 'register',
  component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/new',
    name: 'new',
    component: New
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔒 Proteger rutas
router.beforeEach((to, _from, next) => {
  const publicPages = ['/', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
});

export default router;
