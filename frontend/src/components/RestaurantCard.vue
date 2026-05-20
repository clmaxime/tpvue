<script setup lang="ts">
defineProps<{
  restaurant: {
    id: string
    name: string
    description: string
    cuisineType?: string
    imageUrl?: string
  }
}>()
</script>

<template>
  <div class="card">
    <img
      v-if="restaurant.imageUrl"
      :src="restaurant.imageUrl"
      alt=""
      class="image"
    />

    <h2>
      {{ restaurant.name }}
    </h2>

    <p class="cuisine">
      {{ restaurant.cuisineType }}
    </p>

    <p>
      {{ restaurant.description }}
    </p>

    <RouterLink
      :to="`/restaurant/${restaurant.id}`"
      class="primary-button"
    >
      Réserver
    </RouterLink>
  </div>
</template>

<style scoped>
.image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.cuisine {
  color: #666;
  font-size: 14px;
}
</style>