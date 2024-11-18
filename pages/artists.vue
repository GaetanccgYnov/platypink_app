<template>
  <div class="p-4">
    <div :key="item.id" class="flex items-center border rounded-lg p-4 mb-4" v-for="item in items">
      <a href="artist/1/detail">
      <img alt="Placeholder image" class="mr-4" src="https://placehold.co/200x200" />
      </a>
      <div class="flex flex-col w-2/5 space-y-2">
        <a href="artist/1/detail">
        <div class="font-bold">
          Nom de l'artiste
        </div>
        <div class="text-gray-500">
          Note sur 5
        </div>
        <div class="text-gray-400">
          Description de l'artiste
        </div>
        </a>
      </div>
      <div class="flex items-center justify-center w-128 h-64">
        <vue-cal
            hide-view-selector
            :time-from="10 * 60"
            :time-to="23 * 60"
            active-view="month"
            locale="fr"
            :events="events"
            :disable-views="['years', 'year', 'day']"
            class="vuecal--full-height-delete">
          <template #arrow-prev>
            <font-awesome icon="fa-solid fa-arrow-left" />
          </template>
          <template #arrow-next>
            <font-awesome icon="fa-solid fa-arrow-right" />
          </template>
        </vue-cal>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: {
    VueCal,
  },
  data() {
    return {
      items: 4,
      // Liste d'événements avec une date et un fond vert
      events: [
        {
          start: '2024-11-20 14:00',
          end: '2024-11-20 17:30',
          title: 'Boring event',
          class: 'doctor-1'
        },
        {
          start: '2024-11-22',
          end: '2024-11-22',
          title: 'Événement 2',
        },
        {
          start: '2024-11-25',
          end: '2024-11-25',
          title: 'Événement 3',
        },
      ],
    };
  },
}
</script>

<style scoped>
.vuecal__event.doctor-1 {
  background-color: #f0fff1;
  color: #81d58b;
}
</style>

