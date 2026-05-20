<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
  submit: [
    {
      customerName: string
      customerEmail: string
      partySize: number
    }
  ]
}>()

const form = reactive({
  customerName: '',
  customerEmail: '',
  partySize: 1
})

function handleSubmit() {
  emit('submit', {
    customerName: form.customerName,
    customerEmail: form.customerEmail,
    partySize: form.partySize
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Nom</label>

      <input v-model="form.customerName" />
    </div>

    <div>
      <label>Email</label>

      <input v-model="form.customerEmail" />
    </div>

    <div>
      <label>Nombre de couverts</label>

      <input
        v-model="form.partySize"
        type="number"
        min="1"
      />
    </div>

    <button type="submit">
      Réserver
    </button>
  </form>
</template>