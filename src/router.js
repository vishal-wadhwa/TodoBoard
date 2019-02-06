import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/:boardId',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.state.board.boards.some(v => v._id === to.params.boardId)) {
          next({
            name: 'home',
            params: { boardId: store.state.board.boards[0]._id }
          })
        } else next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/' && !store.getters['login/isLoggedIn']) next('/')
  else if (to.fullPath === '/' && store.getters['login/isLoggedIn']) {
    next({
      name: 'home',
      params: {
        boardId: store.state.board.boards[0]._id
      }
    })
  } else next()
})

export default router
