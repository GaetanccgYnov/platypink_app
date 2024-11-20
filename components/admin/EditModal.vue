<template>
    <div
        v-if="isVisible"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
        <div class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
            <slot></slot>
            <button @click="closeModal" class="mt-4 px-4 py-2 bg-gray-700 text-white rounded">
                Fermer
            </button>
        </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
    isVisible: Boolean,
    title: String
});

const emit = defineEmits(['close']);

function closeModal() {
    emit('close');
}
</script>
