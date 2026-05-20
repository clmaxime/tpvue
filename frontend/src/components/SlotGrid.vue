<script setup lang="ts">
import SlotBadge from './SlotBadge.vue'

defineProps<{
  slots: {
    id: string
    startTime: string
    endTime?: string
    status: 'free' | 'nearly_full' | 'full'
  }[]
  selectedSlotId?: string
}>()

const emit = defineEmits<{
  select: [slotId: string]
}>()

function handleClick(
  id: string,
  status: string
) {
  if (status === 'full') {
    return
  }

  emit('select', id)
}
</script>

<template>
  <div class="grid">
    <button
      v-for="slot in slots"
      :key="slot.id"
      :disabled="slot.status === 'full'"
      @click="handleClick(slot.id, slot.status)"
      :class="['slot-button', { selected: slot.id === selectedSlotId } ]"
    >
      <div>
        {{ slot.startTime }}
      </div>

      <SlotBadge :status="slot.status" />
    </button>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(140px, 1fr)
  );
  gap: 12px;
  margin: 20px 0;
}

.slot-button {
  border: none;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #111;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slot-button.selected {
  border: 2px solid #2563eb;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

.slot-button:disabled {
  opacity: 0.5;
}
</style>