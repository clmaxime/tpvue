<script setup lang="ts">
defineProps<{
  status: 'free' | 'nearly_full' | 'full'
}>()
</script>

<template>
  <span :class="status">
    {{ status }}
  </span>
</template>

<style scoped>
span {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
}

.free {
  background: green;
}

.nearly_full {
  background: orange;
}

.full {
  background: red;
}
</style>