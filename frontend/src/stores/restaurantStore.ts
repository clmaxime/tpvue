import { defineStore } from 'pinia'
import http from '../api/http'

interface Restaurant {
  id: string
  name: string
  description: string
  address: string
  cuisineType: string
  imageUrl: string
}

export const useRestaurantStore = defineStore(
  'restaurant',
  {
    state: () => ({
      restaurants: [] as Restaurant[],
      selectedRestaurant: null as Restaurant | null,

      loading: false,
      error: ''
    }),

    actions: {
      async fetchRestaurants() {
        this.loading = true
        this.error = ''

        try {
          const response = await http.get(
            '/restaurants'
          )

          this.restaurants = response.data
        } catch (error) {
          console.error(error)

          this.error =
            'Impossible de charger les restaurants'
        } finally {
          this.loading = false
        }
      },

      async fetchRestaurantById(id: string) {
        this.loading = true
        this.error = ''

        try {
          const response = await http.get(
            `/restaurants/${id}`
          )

          this.selectedRestaurant = response.data
        } catch (error) {
          console.error(error)

          this.error =
            'Impossible de charger le restaurant'
        } finally {
          this.loading = false
        }
      }
    }
  }
)