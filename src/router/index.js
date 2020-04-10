import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import EditDeck from '../views/EditDeck'

Vue.use(VueRouter)

const routes = [
  { name: 'dashboard', path: '/', component: Dashboard },
  { name: 'edit-deck', path: '/decks/:id', component: EditDeck },
  { name: '404', path: '*', component: Dashboard }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
