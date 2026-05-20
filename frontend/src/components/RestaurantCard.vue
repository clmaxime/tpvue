<script setup lang="ts">
defineProps<{
  restaurant: {
    id: number
    name: string
    description: string
  }
}>()
</script>

<template>
  <div class="card">
    <h2>{{ restaurant.name }}</h2>

    <p>
      {{ restaurant.description }}
    </p>

    <RouterLink :to="`/restaurant/${restaurant.id}`">
      Voir le restaurant
    </RouterLink>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
}
</style>