import { createRouter, createWebHistory } from 'vue-router'

import RestaurantsPage from '../pages/RestaurantsPage.vue'
import RestaurantDetailPage from '../pages/RestaurantDetailPage.vue'
import ManageReservationPage from '../pages/ManageReservationPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: RestaurantsPage
    },
    {
      path: '/restaurant/:id',
      component: RestaurantDetailPage
    },
    {
      path: '/reservation',
      component: ManageReservationPage
    }
  ]
})

export default router