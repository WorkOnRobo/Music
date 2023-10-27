import { createRouter, createWebHistory } from 'vue-router'

import useUserStore from '@/stores/user'

const HomeView = () => import('@/views/HomeView.vue')
const ManageView = () => import('@/views/ManageView.vue')
const SongView = () => import('@/views/SongView.vue')
const AboutView = () => import('@/views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/song/:id', name: 'song', component: SongView },
    { path: '/About', name: 'about', component: AboutView },

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
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const store = useUserStore()
  if (store.isLogin) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
