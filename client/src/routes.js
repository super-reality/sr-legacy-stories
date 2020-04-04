import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './store';

Vue.use(VueRouter);

const isLoggedIn = async(to, from, next) => {
   if(localStorage.getItem('feathers-jwt')) {
      try {
         await store.dispatch('auth/authenticate');
         next();
      } catch (err) {
         next('/login');
      }
   } else {
      next('/login');
   }
}

export const routes = [
   {
      path: '/', 
      name: 'home',
      component: () => import('./views/Home.vue'),
      beforeEnter: isLoggedIn
   },
   {
      path: '/boards', 
      name: 'boards',
      component: () => import('./views/Boards.vue'),
      beforeEnter: isLoggedIn
   },
   {
      path: '/boards/:id',
      name: 'board',
      component: () => import('./views/Board.vue'),
      beforeEnter: isLoggedIn
   },
   {
      path: '/signup', 
      name: 'signup',
      component: () => import('./views/SignUp')
   },
   {
      path: '/login', 
      name: 'login',
      component: () => import('./views/Login')
   }
]

export default new VueRouter({ routes, mode: 'history' })