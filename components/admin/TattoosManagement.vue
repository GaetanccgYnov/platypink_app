<template>
    <div>
        <ListingComponent
            title="Liste des Flash Tattoos"
            :headers="['Artiste', 'Nom', 'Prix', 'Disponible', 'Taille', 'Couleur', 'Description']"
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
const artists = ref([]); // Liste des artistes pour le select

// Champs dynamiques
const fields = ref([
    {
        key: 'artiste',
        label: 'Artiste',
        type: 'select',
        options: artists.value
    },
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

// Charger les artistes pour le select
async function fetchArtists() {
    try {
        const {data} = await apiClient.get('/admin/users?role=tattoo_artist');
        artists.value = data.map(artist => ({
            value: artist.id,
            label: artist.name
        }));

        // Mettre à jour les options du champ "artiste"
        const artistField = fields.value.find(field => field.key === 'artiste');
        if (artistField) {
            artistField.options = artists.value;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des artistes :', error);
    }
}

// Récupérer les flash tattoos
async function fetchTattoos() {
    try {
        const {data} = await apiClient.get('/admin/tattoos');

        tattoos.value = data.map((tattoo) => ({
            id: tattoo.id,
            artiste: tattoo.artist_name || 'Non renseigné', // Nom de l'artiste
            nom: tattoo.title || 'Non renseigné',
            prix: tattoo.price ? `${tattoo.price} €` : 'Non renseigné',
            disponible: tattoo.available ? 'Oui' : 'Non',
            taille: tattoo.size || 'Non renseignée',
            couleur: tattoo.color ? 'Oui' : 'Non',
            description: tattoo.description || 'Non renseignée'
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des flash tattoos :', error);
    }
}

function mapTattooData(tattoo) {
    return {
        title: tattoo.nom,
        price: parseFloat(tattoo.prix),
        available: tattoo.available,
        size: tattoo.size,
        color: tattoo.couleur,
        description: tattoo.description,
        user_id: tattoo.artiste // ID de l'artiste
    };
}


// Éditer un tattoo
function editTattoo(tattoo) {
    selectedTattoo.value = {
        id: tattoo.id,
        artiste: artists.value.find(artist => artist.label === tattoo.artiste)?.value || null,
        nom: tattoo.nom,
        prix: parseFloat(tattoo.prix.replace(' €', '')),
        available: tattoo.disponible === 'Oui',
        size: tattoo.taille,
        couleur: tattoo.couleur === 'Oui',
        description: tattoo.description
    };
    isEditModalVisible.value = true;
}

// Soumettre l'édition
async function submitEdit(updatedTattoo) {
    try {
        const formData = new FormData();

        formData.append('title', updatedTattoo.nom);
        formData.append('price', updatedTattoo.prix);
        formData.append('available', updatedTattoo.available);
        formData.append('size', updatedTattoo.size);
        formData.append('color', updatedTattoo.couleur);
        formData.append('description', updatedTattoo.description);
        formData.append('user_id', updatedTattoo.artiste);

        if (updatedTattoo.image instanceof File) {
            formData.append('image', updatedTattoo.image); // Ajout du fichier si présent
        }

        await apiClient.put(`/admin/tattoos/${updatedTattoo.id}`, formData, {
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

// Soumettre la création
async function submitCreate(newTattooData) {
    try {
        const formData = new FormData();

        formData.append('title', newTattooData.nom);
        formData.append('price', newTattooData.prix);
        formData.append('available', newTattooData.available);
        formData.append('size', newTattooData.size);
        formData.append('color', newTattooData.couleur);
        formData.append('description', newTattooData.description);
        formData.append('user_id', newTattooData.artiste);

        if (newTattooData.image) {
            formData.append('image', newTattooData.image); // Ajout du fichier
        }

        await apiClient.post('/admin/tattoos', formData, {
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
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce flash tattoo ?');
    if (confirmation) {
        try {
            await apiClient.delete(`/admin/tattoos/${tattooId}`);
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
    fetchArtists();
    fetchTattoos();
});
</script>
