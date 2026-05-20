<script setup lang="ts">
import { ref } from 'vue'
import http from '../api/http'

type ReservationCustomer = {
  name: string
  email: string
  phone: string
}

type ReservationSlot = {
  id: string
  date: string
  startTime: string
  endTime: string
}

type ReservationResponse = {
  id: string
  token: string
  status: 'confirmed' | 'cancelled'
  message: string
  restaurant: { id: string; name: string }
  slot: ReservationSlot
  covers: number
  customer: ReservationCustomer
}

const token = ref('')
const reservation = ref<ReservationResponse | null>(null)
const loading = ref(false)
const error = ref('')
const message = ref('')

async function fetchReservation() {
  reservation.value = null
  error.value = ''
  message.value = ''

  if (!token.value.trim()) {
    error.value = 'Veuillez saisir un token.'
    return
  }

  loading.value = true
  try {
    const resp = await http.get(`/reservations/by-token/${token.value.trim()}`)
    reservation.value = resp.data
  } catch (err: any) {
    console.error(err)
    if (err.response && err.response.status === 404) {
      error.value = 'Réservation introuvable.'
    } else {
      error.value = 'Erreur lors de la recherche de la réservation.'
    }
  } finally {
    loading.value = false
  }
}

async function cancelReservation() {
  if (!reservation.value) {
    return
  }

  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const resp = await http.patch(`/reservations/${reservation.value.id}/cancel`, {
      token: token.value.trim(),
    })
    reservation.value = resp.data.reservation
    message.value = resp.data.message
  } catch (err: any) {
    console.error(err)
    if (err.response && err.response.data) {
      error.value = err.response.data.message ?? 'Erreur lors de l\'annulation.'
    } else {
      error.value = 'Erreur lors de l\'annulation.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Gérer ma réservation</h1>

    <div class="card">
      <label>Token de réservation</label>
      <input v-model="token" class="input" />
      <button class="primary-button" @click="fetchReservation" :disabled="loading">
        Rechercher
      </button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="message" class="confirmation card">{{ message }}</div>

    <div v-if="reservation" class="card">
      <h2>Réservation</h2>
      <p><strong>Restaurant:</strong> {{ reservation.restaurant.name }}</p>
      <p><strong>Créneau:</strong> {{ reservation.slot.date }} {{ reservation.slot.startTime }} - {{ reservation.slot.endTime }}</p>
      <p><strong>Couverts:</strong> {{ reservation.covers }}</p>
      <p><strong>Client:</strong> {{ reservation.customer.name }} ({{ reservation.customer.email }})</p>
      <p><strong>Statut:</strong> {{ reservation.status }}</p>

      <button
        class="secondary-button"
        @click="cancelReservation"
        :disabled="loading || reservation.status !== 'confirmed'"
      >
        Annuler la réservation
      </button>
    </div>
  </div>
</template>
