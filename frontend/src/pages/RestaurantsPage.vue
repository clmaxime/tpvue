<script setup lang="ts">
import { onMounted } from 'vue'

import RestaurantCard from '../components/RestaurantCard.vue'

import { useRestaurantStore } from '../stores/restaurantStore'

const restaurantStore = useRestaurantStore()

onMounted(() => {
  restaurantStore.fetchRestaurants()
})
</script>

<template>
  <div class="container">
    <h1>Restaurants</h1>

    <p v-if="restaurantStore.loading">
      Chargement...
    </p>

    <p v-if="restaurantStore.error">
      {{ restaurantStore.error }}
    </p>

    <RestaurantCard
      v-for="restaurant in restaurantStore.restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>