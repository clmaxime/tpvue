<script setup lang="ts">
import RestaurantCard from '../components/RestaurantCard.vue'

const restaurants = [
  {
    id: 1,
    name: 'Pizza Roma',
    description: 'Restaurant italien'
  },
  {
    id: 2,
    name: 'Sushi Tokyo',
    description: 'Cuisine japonaise'
  }
]
</script>

<template>
  <div>
    <h1>Restaurants</h1>

    <RestaurantCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>