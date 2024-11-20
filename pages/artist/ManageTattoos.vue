<template>
    <div v-if="userRole === 'tattoo_artist'">
        <div class="artist-dashboard">
            <div class="content">
                <ListingComponent
                    title="Liste de vos Flash Tattoos"
                    :headers="['Nom', 'Prix', 'Disponible', 'Taille', 'Couleur', 'Description', 'Image']"
                    :items="tattoos"
                    :onEdit="editTattoo"
                    :onDelete="deleteTattoo"
                    :onCreate="createTattoo"
                    :items-per-page="10"
                />

                <!-- Modal pour l'édition -->
                <EditModal
                    v-if="selectedTattoo"
                    :isVisible="isEditModalVisible"
                    title="Éditer le Flash Tattoo"
                    @close="closeEditModal"
                >
                    <DynamicForm
                        :fields="fields"
                        :model="selectedTattoo"
                        @submit="submitEdit"
                    />
                </EditModal>

                <!-- Modal pour la création -->
                <EditModal
                    v-if="isCreateModalVisible"
                    :isVisible="isCreateModalVisible"
                    title="Créer un Flash Tattoo"
                    @close="closeCreateModal"
                >
                    <DynamicForm
                        :fields="fields"
                        :model="newTattoo"
                        @submit="submitCreate"
                    />
                </EditModal>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>Vous n'avez pas les droits pour accéder à cette page</h1>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import apiClient from '~/src/api/axiosConfig.js';
import ListingComponent from '@/components/admin/ListingComponent.vue';
import EditModal from '@/components/admin/EditModal.vue';
import DynamicForm from '@/components/admin/DynamicForm.vue';

const tattoos = ref([]);
const isEditModalVisible = ref(false);
const isCreateModalVisible = ref(false);
const selectedTattoo = ref(null);
const newTattoo = ref({});
const userRole = ref('');
let userId = ref('');

// Champs dynamiques
const fields = ref([
    {
        key: 'nom',
        label: 'Nom',
        type: 'text'
    },
    {
        key: 'prix',
        label: 'Prix (€)',
        type: 'number'
    },
    {
        key: 'available',
        label: 'Disponible',
        type: 'select',
        options: [
            {
                value: true,
                label: 'Oui'
            },
            {
                value: false,
                label: 'Non'
            }
        ]
    },
    {
        key: 'size',
        label: 'Taille',
        type: 'select',
        options: [
            {
                value: 'petit',
                label: 'Petit'
            },
            {
                value: 'moyen',
                label: 'Moyen'
            },
            {
                value: 'grand',
                label: 'Grand'
            }
        ]
    },
    {
        key: 'couleur',
        label: 'Couleur',
        type: 'select',
        options: [
            {
                value: true,
                label: 'Oui'
            },
            {
                value: false,
                label: 'Non'
            }
        ]
    },
    {
        key: 'description',
        label: 'Description',
        type: 'textarea'
    },
    {
        key: 'image',
        label: 'Image',
        type: 'file'
    }
]);

// Récupérer l'id de l'artiste connecté
async function fetchUserId() {
    try {
        const {data} = await apiClient.get('/users/me');
        return data.id;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'id de l\'artiste :', error);
    }
}

// Charger les tatouages de l'artiste connecté
async function fetchTattoos() {
    try {
        const {data} = await apiClient.get(`/tattoos?user_id=${userId}`);
        tattoos.value = data.map(tattoo => ({
            id: tattoo.id,
            nom: tattoo.title,
            prix: `${tattoo.price} €`,
            disponible: tattoo.available ? 'Oui' : 'Non',
            taille: tattoo.size,
            couleur: tattoo.color ? 'Oui' : 'Non',
            description: tattoo.description || 'Non renseignée',
            image_url: tattoo.image_url
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des tattoos de l\'artiste :', error);
    }
}

// Récupérer un tatouage à éditer
function editTattoo(tattoo) {
    selectedTattoo.value = {
        id: tattoo.id,
        nom: tattoo.nom,
        prix: parseFloat(tattoo.prix.replace(' €', '')),
        available: tattoo.disponible === 'Oui',
        size: tattoo.taille,
        couleur: tattoo.couleur === 'Oui',
        description: tattoo.description
    };
    isEditModalVisible.value = true;
}

// Soumettre l'édition d'un tatouage
async function submitEdit(updatedTattoo) {
    try {
        const formData = new FormData();
        formData.append('title', updatedTattoo.nom);
        formData.append('price', updatedTattoo.prix);
        formData.append('available', updatedTattoo.available);
        formData.append('size', updatedTattoo.size);
        formData.append('color', updatedTattoo.couleur);
        formData.append('description', updatedTattoo.description);
        formData.append('user_id', userId);

        if (updatedTattoo.image instanceof File) {
            formData.append('image', updatedTattoo.image); // Ajout du fichier si présent
        }

        await apiClient.put(`/tattoos/${updatedTattoo.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        alert('Flash tattoo mis à jour avec succès.');
        closeEditModal();
        fetchTattoos();
    } catch (error) {
        console.error('Erreur lors de la mise à jour du flash tattoo :', error);
        alert('Une erreur est survenue lors de la mise à jour.');
    }
}

// Fermer le modal d'édition
function closeEditModal() {
    isEditModalVisible.value = false;
    selectedTattoo.value = null;
}

// Créer un nouveau tattoo
function createTattoo() {
    newTattoo.value = {};
    isCreateModalVisible.value = true;
}

// Soumettre la création d'un tatouage
async function submitCreate(newTattooData) {
    try {
        const formData = new FormData();
        formData.append('title', newTattooData.nom);
        formData.append('price', parseFloat(newTattooData.prix));
        formData.append('available', newTattooData.available);
        formData.append('size', newTattooData.size);
        formData.append('color', newTattooData.couleur);
        formData.append('description', newTattooData.description);
        formData.append('user_id', userId);

        if (newTattooData.image) {
            formData.append('image', newTattooData.image); // Ajout du fichier si présent
        }

        await apiClient.post('/tattoos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        alert('Flash tattoo créé avec succès.');
        closeCreateModal();
        fetchTattoos();
    } catch (error) {
        console.error('Erreur lors de la création du flash tattoo :', error);
        alert('Une erreur est survenue lors de la création.');
    }
}

// Fermer le modal de création
function closeCreateModal() {
    isCreateModalVisible.value = false;
    newTattoo.value = null;
}

// Supprimer un tattoo
async function deleteTattoo(tattooId) {
    console.log(tattooId);
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce flash tattoo ?');
    if (confirmation) {
        try {
            await apiClient.delete(`/tattoos/${tattooId}`);
            fetchTattoos();
            alert('Flash tattoo supprimé avec succès.');
        } catch (error) {
            console.error('Erreur lors de la suppression du flash tattoo :', error);
            alert('Une erreur s\'est produite lors de la suppression.');
        }
    }
}

// Charger les données au montage
onMounted(() => {
    fetchUserId().then(id => {
        if (localStorage.getItem('role')) {
            userRole.value = localStorage.getItem('role');
        }
        userId = id;
        fetchTattoos();
    });
});
</script>
