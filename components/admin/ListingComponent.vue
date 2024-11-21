<template>
    <div class="w-full mx-auto p-4 bg-white shadow rounded-md">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-bold">{{ title }}</h1>
            <button
                @click="onCreate"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Créer
            </button>
        </div>
        <table class="w-full border-collapse border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th
                        v-for="header in headers"
                        :key="header"
                        class="text-left px-4 py-2 border border-gray-200"
                    >
                        {{ header }}
                    </th>
                    <th class="text-left px-4 py-2 border border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in paginatedItems"
                    :key="item.id"
                    class="hover:bg-gray-50 transition"
                >
                    <td
                        v-for="header in headers"
                        :key="header"
                        class="px-4 py-2 border border-gray-200"
                    >
                        <div v-if="header === 'Image'">
                            <img
                                v-if="item.image_url"
                                :src="item.image_url"
                                alt="Tattoo Image"
                                class="object-cover"
                                style="width: 100px; height: 100px;"
                            />
                            <span v-else>Image non disponible</span>
                        </div>
                        <div v-else>
                            {{ item[headerKey(header)] }}
                        </div>
                    </td>
                    <td class="px-4 py-2 border border-gray-200">
                        <button
                            @click="onEdit(item)"
                            class="px-3 py-1 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Éditer
                        </button>
                        <button
                            @click="onDelete(item.id)"
                            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
                <tr v-if="!items.length">
                    <td colspan="100%" class="text-center py-4 text-gray-500">
                        Aucune donnée disponible
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center mt-4 space-x-2">
            <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                <i class="fas fa-chevron-left"></i> Précédent
            </button>
            <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-300'"
                class="px-3 py-2 rounded"
            >
                {{ page }}
            </button>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                Suivant <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import {defineProps, ref, computed, watch} from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    headers: {
        type: Array,
        required: true
    },
    items: {
        type: Array,
        required: true,
        default: () => []
    },
    onEdit: {
        type: Function,
        required: true
    },
    onDelete: {
        type: Function,
        required: true
    },
    onCreate: {
        type: Function,
        required: true
    },
    itemsPerPage: {
        type: Number,
        default: 10
    }
});

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage));

const paginatedItems = computed(() => {
    if (!props.items || props.items.length === 0) {
        return [];
    }
    const start = (currentPage.value - 1) * props.itemsPerPage;
    const end = start + props.itemsPerPage;
    return props.items.slice(start, end);
});

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

watch(props.items, () => {
    currentPage.value = 1;
});

function headerKey(header) {
    const headerMap = {
        'Nom': 'nom',
        'Prix': 'prix',
        'Disponible': 'disponible',
        'Taille': 'taille',
        'Couleur': 'couleur',
        'Description': 'description',
        'Image': 'image_url',
        'Email': 'email',
        'Rôle': 'rôle',
        'Adresse': 'adresse',
        'Téléphone': 'téléphone',
        'Réseaux': 'réseaux',
        'Artiste': 'artiste',
        'Client': 'client',
        'Tattoo': 'tattoo',
        'Date': 'date',
        'Heure': 'heure',
        'Statut': 'statut'
    };
    return headerMap[header] || header;
}
</script>
