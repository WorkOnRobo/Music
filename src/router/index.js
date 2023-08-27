import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'
import useUserStore from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/About', name: 'about', component: AboutView ,  },

    {
      path: '/manage-music',
      alias: '/manage',
      name: 'manage',
      meta: { requiresAuth: true },
      // beforeEnter: (to, from, next) => {
      //   console.log('Manage Guard')
      //   next()
      // },
      component: ManageView
    },
    // { path: '/manage' , redirect : {name:'manage'}},
    { path: '/:catchAll(.*)*', redirect: { name: 'home' } }
  ],
  linkActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {

  if(!to.meta.requiresAuth){
next()
return
  }
const store = useUserStore()
  if (store.isLogin)
  {
    next()
  }
  else {
    next( {name : 'home'})
  }

 
})

export default router
