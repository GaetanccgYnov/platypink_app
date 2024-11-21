<template>
    <div>
        <ListingComponent
            title="Liste des Réservations"
            :headers="['Client', 'Artiste', 'Tattoo', 'Date', 'Heure', 'Statut']"
            :items="bookings"
            :onEdit="editBooking"
            :onDelete="deleteBooking"
            :onCreate="createBooking"
            :items-per-page
        />

        <!-- Modal pour l'édition -->
        <EditModal
            v-if="isEditModalVisible"
            :isVisible="isEditModalVisible"
            title="Éditer la Réservation"
            @close="closeEditModal"
        >
            <DynamicForm
                :fields="editFields"
                :model="selectedBooking"
                @submit="submitEdit"
            />
        </EditModal>

        <!-- Modal pour la création -->
        <EditModal
            v-if="isCreateModalVisible"
            :isVisible="isCreateModalVisible"
            title="Créer une Réservation"
            @close="closeCreateModal"
        >
            <DynamicForm
                :fields="createFields"
                :model="newBooking"
                @submit="submitCreate"
            />
        </EditModal>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import apiClient from '~/src/api/axiosConfig.js';
import ListingComponent from '@/components/admin/ListingComponent.vue';
import EditModal from '@/components/admin/EditModal.vue';
import DynamicForm from '@/components/admin/DynamicForm.vue';

const bookings = ref([]);
const isEditModalVisible = ref(false);
const isCreateModalVisible = ref(false);
const selectedBooking = ref(null);
const newBooking = ref({});
const clients = ref([]);
const artists = ref([]);
const flashTattoos = ref([]);

// Champs pour l'édition
const editFields = ref([
    {
        key: 'client_id',
        label: 'Client',
        type: 'select',
        options: clients.value
    },
    {
        key: 'tattoo_artist_id',
        label: 'Artiste',
        type: 'select',
        options: artists.value
    },
    {
        key: 'flash_tattoo_id',
        label: 'Tattoo',
        type: 'select',
        options: flashTattoos.value
    },
    {
        key: 'date',
        label: 'Date',
        type: 'date'
    },
    {
        key: 'time',
        label: 'Heure',
        type: 'time'
    },
    {
        key: 'status',
        label: 'Statut',
        type: 'select',
        options: [
            {
                value: 'pending',
                label: 'En attente'
            },
            {
                value: 'confirmed',
                label: 'Confirmée'
            },
            {
                value: 'completed',
                label: 'Terminée'
            }
        ]
    }
]);

// Champs pour la création
const createFields = ref([...editFields.value]); // Identique aux champs d'édition

// Récupérer les données nécessaires pour les selects
async function fetchSelectData() {
    try {
        const [clientsRes, artistsRes, flashTattoosRes] = await Promise.all([
            apiClient.get('/admin/users?role=client'),
            apiClient.get('/admin/users?role=tattoo_artist'),
            apiClient.get('/admin/tattoos')
        ]);

        clients.value = clientsRes.data.map(client => ({
            value: client.id,
            label: client.name
        }));

        artists.value = artistsRes.data.map(artist => ({
            value: artist.id,
            label: artist.name
        }));

        flashTattoos.value = flashTattoosRes.data.map(tattoo => ({
            value: tattoo.id,
            label: tattoo.title
        }));

        // Mettre à jour les options des champs dynamiques
        createFields.value.find(field => field.key === 'client_id').options = clients.value;
        createFields.value.find(field => field.key === 'tattoo_artist_id').options = artists.value;
        createFields.value.find(field => field.key === 'flash_tattoo_id').options = flashTattoos.value;
        editFields.value.find(field => field.key === 'client_id').options = clients.value;
        editFields.value.find(field => field.key === 'tattoo_artist_id').options = artists.value;
        editFields.value.find(field => field.key === 'flash_tattoo_id').options = flashTattoos.value;
    } catch (error) {
        console.error('Erreur lors de la récupération des données des selects :', error);
    }
}

// Récupérer les réservations
async function fetchBookings() {
    try {
        const response = await apiClient.get('/admin/bookings');
        bookings.value = response.data.bookings.map((booking) => ({
            id: booking.id,
            client: booking.client_name || 'Non renseigné',
            artiste: booking.artist_name || 'Non renseigné',
            tattoo: booking.tattoo_title || 'Non renseigné',
            date: booking.date || 'Non renseignée',
            heure: booking.time || 'Non renseignée',
            statut: booking.status || 'Non renseigné'
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
    }
}

// Éditer une réservation
function editBooking(booking) {
    selectedBooking.value = {...booking};
    isEditModalVisible.value = true;
}

// Soumettre l'édition
async function submitEdit(updatedBooking) {
    try {
        const payload = {
            client_id: updatedBooking.client_id,
            tattoo_artist_id: updatedBooking.tattoo_artist_id,
            flash_tattoo_id: updatedBooking.flash_tattoo_id,
            date: updatedBooking.date,
            time: updatedBooking.heure,
            status: updatedBooking.statut
        };
        await apiClient.put(`/admin/bookings/${updatedBooking.id}`, payload);
        alert('Réservation mise à jour avec succès.');
        closeEditModal();
        fetchBookings();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation :', error);
        alert('Une erreur est survenue lors de la mise à jour.');
    }
}

// Fermer le modal d'édition
function closeEditModal() {
    isEditModalVisible.value = false;
    selectedBooking.value = null;
}

// Créer une nouvelle réservation
function createBooking() {
    newBooking.value = {};
    isCreateModalVisible.value = true;
}

// Soumettre la création
async function submitCreate(newBookingData) {
    try {
        const payload = {
            client_id: newBookingData.client_id,
            tattoo_artist_id: newBookingData.tattoo_artist_id,
            flash_tattoo_id: newBookingData.flash_tattoo_id,
            date: newBookingData.date,
            time: newBookingData.time,
            status: newBookingData.status
        };
        await apiClient.post('/admin/bookings', payload);
        alert('Réservation créée avec succès.');
        closeCreateModal();
        fetchBookings();
    } catch (error) {
        console.error('Erreur lors de la création de la réservation :', error);
        alert('Une erreur est survenue lors de la création.');
    }
}

// Fermer le modal de création
function closeCreateModal() {
    isCreateModalVisible.value = false;
    newBooking.value = null;
}

// Supprimer une réservation
async function deleteBooking(bookingId) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?');
    if (confirmation) {
        try {
            await apiClient.delete(`/admin/bookings/${bookingId}`);
            fetchBookings();
            alert('Réservation supprimée avec succès.');
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation :', error);
            alert('Une erreur s\'est produite lors de la suppression.');
        }
    }
}

// Charger les données au montage
onMounted(() => {
    fetchBookings();
    fetchSelectData();
});
</script>
