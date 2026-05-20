<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import SlotGrid from '../components/SlotGrid.vue'
import ReservationForm from '../components/ReservationForm.vue'
import http from '../api/http'
import { useRestaurantStore } from '../stores/restaurantStore'

type SlotStatus = 'free' | 'nearly_full' | 'full'

type Slot = {
  id: string
  startTime: string
  endTime?: string
  status: SlotStatus
}

const route = useRoute()
const store = useRestaurantStore()

const slots = ref<Slot[]>([])
const loading = ref(false)
const error = ref('')
const selectedSlot = ref<Slot | null>(null)
const confirmation = ref<any | null>(null)
const clipboardMessage = ref('')

const selectedSlotLabel = computed(() =>
  selectedSlot.value ? `${selectedSlot.value.startTime}${selectedSlot.value.endTime ? ` - ${selectedSlot.value.endTime}` : ''}` : ''
)

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

async function load() {
  const id = String(route.params.id)
  await store.fetchRestaurantById(id)

  const date = formatDate(new Date())
  loading.value = true
  error.value = ''

  try {
    const resp = await http.get(`/restaurants/${id}/slots`, {
      params: { date }
    })

    slots.value = resp.data.map((s: any) => ({
      id: s.id,
      startTime: s.startTime,
      endTime: s.endTime,
      status: s.status
    }))
  } catch (err) {
    console.error(err)
    error.value = "Impossible de charger les créneaux"
  } finally {
    loading.value = false
  }
}

function handleSelect(slotId: string) {
  selectedSlot.value = slots.value.find((slot) => slot.id === slotId) ?? null
}

async function handleReservation(data: any) {
  confirmation.value = null
  error.value = ''

  if (!selectedSlot.value || !store.selectedRestaurant) {
    error.value = 'Veuillez sélectionner un créneau et vérifier le restaurant.'
    return
  }

  const payload = {
    restaurantId: store.selectedRestaurant.id,
    timeSlotId: selectedSlot.value.id,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone,
    covers: Number(data.covers)
  }

  try {
    const resp = await http.post('/reservations', payload)
    confirmation.value = resp.data
    clipboardMessage.value = ''

    if (navigator.clipboard && resp.data?.token) {
      try {
        await navigator.clipboard.writeText(resp.data.token)
        clipboardMessage.value = 'Token copié dans le presse-papiers.'
      } catch (clipboardErr) {
        console.warn('Clipboard copy failed', clipboardErr)
        clipboardMessage.value = 'La réservation est créée, mais la copie automatique du token a échoué.'
      }
    } else {
      clipboardMessage.value = 'Token de réservation créé. Copiez-le manuellement si besoin.'
    }
  } catch (err: any) {
    console.error(err)

    if (err.response && err.response.status === 400) {
      const body = err.response.data
      error.value = body.message ?? 'Données invalides'
    } else {
      error.value = 'Erreur serveur lors de la réservation'
    }
  }
}

onMounted(load)
</script>

<template>
  <div class="container">
    <h1>Détail restaurant</h1>
    <p v-if="store.selectedRestaurant">{{ store.selectedRestaurant.name }}</p>

    <div v-if="loading">Chargement des créneaux…</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <SlotGrid
        :slots="slots"
        :selectedSlotId="selectedSlot?.id"
        @select="handleSelect"
      />

      <div v-if="selectedSlot" class="muted">
        Créneau sélectionné: {{ selectedSlotLabel }}
      </div>

      <ReservationForm
        @submit="handleReservation"
      />

      <div v-if="confirmation" class="confirmation card">
        <h3>Réservation confirmée</h3>
        <p>Statut: {{ confirmation.status }}</p>
        <p>{{ confirmation.message }}</p>
        <p>Restaurant: {{ confirmation.restaurant?.name }}</p>
        <p>Créneau: {{ confirmation.slot?.date }} {{ confirmation.slot?.startTime }} - {{ confirmation.slot?.endTime }}</p>
        <p>Token: {{ confirmation.token }}</p>
        <p v-if="clipboardMessage" class="muted">{{ clipboardMessage }}</p>
        <router-link to="/reservation">Gérer / annuler ma réservation</router-link>
      </div>
    </div>
  </div>
</template>
