<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
  submit: [
    {
      customerName: string
      customerEmail: string
      customerPhone: string
      covers: number
    }
  ]
}>()

const form = reactive({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  covers: 1
})

function handleSubmit() {
  emit('submit', {
    customerName: form.customerName,
    customerEmail: form.customerEmail,
    customerPhone: form.customerPhone,
    covers: form.covers
  })
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="card"
  >
    <h2>Réserver</h2>

    <div class="form-group">
      <label>Nom</label>

      <input
        v-model="form.customerName"
        class="input"
      />
    </div>

    <div class="form-group">
      <label>Email</label>

      <input
        v-model="form.customerEmail"
        class="input"
      />
    </div>

    <div class="form-group">
      <label>Téléphone</label>

      <input
        v-model="form.customerPhone"
        class="input"
      />
    </div>

    <div class="form-group">
      <label>Nombre de couverts</label>

      <input
        v-model="form.covers"
        type="number"
        min="1"
        class="input"
      />
    </div>

    <button
      type="submit"
      class="primary-button"
    >
      Confirmer la réservation
    </button>
  </form>
</template>