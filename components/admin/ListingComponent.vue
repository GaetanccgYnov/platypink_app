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
                    v-for="item in items"
                    :key="item.id"
                    class="hover:bg-gray-50 transition"
                >
                    <td
                        v-for="header in headers"
                        :key="header"
                        class="px-4 py-2 border border-gray-200"
                    >
                        {{ item[headerKey(header)] }}
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
    </div>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
    title: {
        type: String,
        required: true
    },
    headers: {
        type: Array,
        required: true // Ex.: ['Nom', 'Email', 'Rôle']
    },
    items: {
        type: Array,
        required: true // Ex.: [{ id: 1, name: 'John', email: 'john@example.com' }]
    },
    onEdit: {
        type: Function,
        required: true // Fonction appelée avec l'élément à éditer
    },
    onDelete: {
        type: Function,
        required: true // Fonction appelée avec l'ID à supprimer
    },
    onCreate: {
        type: Function,
        required: true // Fonction appelée pour créer un nouvel élément
    }
});

// Helper pour formater les clés des headers
function headerKey(header) {
    return header.toLowerCase().replace(/\s+/g, '_'); // Transforme 'Nom' -> 'nom' pour correspondre à l'objet
}
</script>
