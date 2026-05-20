<script setup lang="ts">
import SlotGrid from '../components/SlotGrid.vue'
import ReservationForm from '../components/ReservationForm.vue'

type SlotStatus = 'free' | 'nearly_full' | 'full'

type Slot = {
  time: string
  status: SlotStatus
}

const slots: Slot[] = [
  {
    time: '19:00',
    status: 'free'
  },
  {
    time: '19:30',
    status: 'nearly_full'
  },
  {
    time: '20:00',
    status: 'full'
  }
]

function handleSelect(time: string) {
  console.log('slot selected', time)
}

function handleReservation(data: unknown) {
  console.log(data)
}
</script>

<template>
  <div>
    <h1>Détail restaurant</h1>

    <SlotGrid
      :slots="slots"
      @select="handleSelect"
    />

    <ReservationForm
      @submit="handleReservation"
    />
  </div>
</template>