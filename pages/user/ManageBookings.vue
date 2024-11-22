<template>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl font-bold mb-6">Vos réservations</h1>

        <div v-if="errors" class="text-red-600 mb-4">
            <span>{{ errors }}</span>
        </div>

        <div v-if="loading" class="text-center">
            <span>Chargement des réservations...</span>
        </div>

        <div v-else>
            <table class="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2 text-left">Tatoueur</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Flash</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Date</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Heure</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Statut</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-100">
                    <td class="border border-gray-300 px-4 py-2">{{ booking.artist.name }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ booking.flash_tattoo.title }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ booking.date }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ booking.time }}</td>
                    <td class="border border-gray-300 px-4 py-2"
                        :class="booking.status">{{ booking.status }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import apiClient from "~/src/api/axiosConfig.js";

export default {
    data() {
        return {
            bookings: [],
            errors: null,
            loading: true,
        };
    },
    methods: {
        async fetchBookings() {
            try {
                const response = await apiClient.get("/bookings/client");
                this.bookings = response.data.bookings;
                this.loading = false;
            } catch (error) {
                this.errors =
                    error.response?.data?.message || "Erreur lors du chargement des réservations.";
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchBookings();
    },
};
</script>

<style>
.container {
    max-width: 900px;
    margin: auto;
}
table {
    width: 100%;
    border-spacing: 0;
}
th, td {
    text-align: left;
    padding: 10px;
}
select {
    min-width: 120px;
}
.pending {
    background-color: #FFD700;
}
.confirmed {
    background-color: #90EE90;
}
.rejected {
    background-color: #FF6347;
}
</style>
