<script setup lang="ts">
import SlotBadge from './SlotBadge.vue'

defineProps<{
  slots: {
    time: string
    status: 'free' | 'nearly_full' | 'full'
  }[]
}>()

const emit = defineEmits<{
  select: [time: string]
}>()

function handleClick(
  time: string,
  status: string
) {
  if (status === 'full') {
    return
  }

  emit('select', time)
}
</script>

<template>
  <div class="grid">
    <button
      v-for="slot in slots"
      :key="slot.time"
      :disabled="slot.status === 'full'"
      @click="handleClick(slot.time, slot.status)"
    >
      <div>
        {{ slot.time }}
      </div>

      <SlotBadge :status="slot.status" />
    </button>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 12px;
}

button {
  padding: 12px;
}
</style>