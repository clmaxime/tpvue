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
  padding: 4px 10px;
  border-radius: 999px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.free {
  background: #16a34a;
}

.nearly_full {
  background: #ea580c;
}

.full {
  background: #dc2626;
}
</style>