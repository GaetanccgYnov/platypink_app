<template>
    <div>
        <ListingComponent
            title="Liste des utilisateurs"
            :headers="['Nom', 'Email', 'Rôle', 'Adresse', 'Téléphone', 'Réseaux']"
            :items="users"
            :onEdit="editUser"
            :onDelete="deleteUser"
            :onCreate="createUser"
            :items-per-page="10"
        />

        <!-- Modal pour l'édition -->
        <EditModal
            v-if="selectedUser"
            :isVisible="isEditModalVisible"
            title="Éditer l'utilisateur"
            @close="closeEditModal"
        >
            <DynamicForm
                :fields="fields"
                :model="selectedUser"
                @submit="submitEdit"
            />
        </EditModal>

        <!-- Modal pour la création -->
        <EditModal
            v-if="isCreateModalVisible"
            :isVisible="isCreateModalVisible"
            title="Créer un nouvel utilisateur"
            @close="closeCreateModal"
        >
            <DynamicForm
                :fields="fields"
                :model="newUser"
                @submit="submitCreate"
            />
        </EditModal>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import ListingComponent from '@/components/admin/ListingComponent.vue';
import EditModal from '@/components/admin/EditModal.vue';
import DynamicForm from '@/components/admin/DynamicForm.vue';
import apiClient from '~/src/api/axiosConfig.js';

const users = ref([]); // Liste des utilisateurs
const isEditModalVisible = ref(false); // État de visibilité du modal d'édition
const isCreateModalVisible = ref(false); // État de visibilité du modal de création
const selectedUser = ref(null); // Utilisateur sélectionné pour l'édition
const newUser = ref({}); // Données pour un nouvel utilisateur

// Configuration dynamique des champs
const fields = ref([
    {
        key: 'nom',
        label: 'Nom',
        type: 'text'
    },
    {
        key: 'email',
        label: 'Email',
        type: 'email'
    },
    {
        key: 'rôle',
        label: 'Rôle',
        type: 'select',
        options: [
            {
                value: 'admin',
                label: 'Admin'
            },
            {
                value: 'client',
                label: 'Client'
            },
            {
                value: 'tattoo_artist',
                label: 'Tattoo Artist'
            }
        ]
    },
    {
        key: 'adresse',
        label: 'Adresse',
        type: 'text'
    },
    {
        key: 'téléphone',
        label: 'Téléphone',
        type: 'text'
    },
    {
        key: 'réseaux',
        label: 'Réseaux',
        type: 'text'
    },
    // Ajouter le champ pour le mot de passe
    {
        key: 'mot_de_passe',
        label: 'Mot de passe',
        type: 'password'
    }
]);

// Récupérer les utilisateurs
async function fetchUsers() {
    try {
        const response = await apiClient.get('/admin/users');
        users.value = response.data.map((user) => ({
            id: user.id,
            nom: user.name || 'Non renseigné',
            email: user.email || 'Non renseigné',
            rôle: user.role || 'Non renseigné',
            adresse: user.address || 'Non renseignée',
            téléphone: user.phone_number || 'Non renseigné',
            réseaux: user.social_links ? JSON.stringify(user.social_links, null, 2) : 'Non renseigné'
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
}

// Éditer un utilisateur
function editUser(user) {
    selectedUser.value = {...user}; // Charger les données de l'utilisateur
    isEditModalVisible.value = true; // Afficher le modal d'édition
}

// Soumettre l'édition
async function submitEdit(updatedUser) {
    try {
        await apiClient.put(`/admin/users/${updatedUser.id}`, {
            name: updatedUser.nom,
            email: updatedUser.email,
            role: updatedUser.rôle,
            address: updatedUser.adresse,
            phone_number: updatedUser.téléphone,
            social_links: updatedUser.réseaux
        });
        alert('Utilisateur mis à jour avec succès.');
        closeEditModal(); // Fermer le modal d'édition
        fetchUsers(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        alert('Une erreur est survenue lors de la mise à jour.');
    }
}

// Fermer le modal d'édition
function closeEditModal() {
    isEditModalVisible.value = false;
    selectedUser.value = null;
}

// Créer un utilisateur
function createUser() {
    newUser.value = {}; // Réinitialiser les données du formulaire
    isCreateModalVisible.value = true; // Afficher le modal de création
}

// Soumettre la création
async function submitCreate(newUserData) {
    try {
        await apiClient.post('/admin/users', {
            name: newUserData.nom,
            email: newUserData.email,
            role: newUserData.rôle,
            address: newUserData.adresse,
            phone_number: newUserData.téléphone,
            social_links: newUserData.réseaux,
            password: newUserData.mot_de_passe
        });
        alert('Utilisateur créé avec succès.');
        closeCreateModal(); // Fermer le modal de création
        fetchUsers(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        alert('Une erreur est survenue lors de la création.');
    }
}

// Fermer le modal de création
function closeCreateModal() {
    isCreateModalVisible.value = false;
    newUser.value = null;
}

// Supprimer un utilisateur
async function deleteUser(userId) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (confirmation) {
        try {
            await apiClient.delete(`/admin/users/${userId}`);
            fetchUsers(); // Rafraîchir la liste
            alert('Utilisateur supprimé avec succès.');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            alert('Une erreur s\'est produite lors de la suppression.');
        }
    }
}

// Charger les utilisateurs au montage
onMounted(() => {
    fetchUsers();
});
</script>
