<template>
    <div>
        <h1>Autres fonctionnalités</h1>
        <button @click="fetchStatistics">Charger les statistiques</button>
        <div v-if="statistics">
            <p><strong>Nombre d'utilisateurs :</strong> {{ statistics.usersCount }}</p>
            <p><strong>Nombre de tattoos :</strong> {{ statistics.tattoosCount }}</p>
            <p><strong>Nombre de réservations :</strong> {{ statistics.bookingsCount }}</p>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

const statistics = ref(null);

// Fonction pour récupérer les statistiques globales
async function fetchStatistics() {
    try {
        const {data} = await axios.get('/admin/statistics', {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        statistics.value = data;
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
    }
}
</script>
