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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/:boardId?',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!store.state.board.boards.some(v => v._id === to.params.boardId)) {
          const cfg = { name: 'home' }

          if (store.state.board.boards.length) {
            cfg.params = { boardId: store.state.board.boards[0]._id }
          }

          if (to.params.boardId) {
            Vue.nextTick(() => Vue.notify({ type: 'error', msg: 'The board you are trying to access does not exist.' }))
            next(cfg)
          } else {
            if (cfg.params) next(cfg)
            else next()
          }
        } else next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['login/isLoggedIn']) next({ name: 'login' })
  else next()
})

export default router
