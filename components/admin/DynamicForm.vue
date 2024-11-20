<template>
    <form @submit.prevent="submitForm">
        <div v-for="field in fields" :key="field.key" class="mb-4">
            <label :for="field.key" class="block text-sm font-medium">
                {{ field.label }}
            </label>

            <!-- Input types -->
            <div v-if="field.type === 'text' || field.type === 'email'">
                <input
                    :id="field.key"
                    v-model="formData[field.key]"
                    :type="field.type"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>

            <!-- Select -->
            <div v-else-if="field.type === 'select'">
                <select
                    :id="field.key"
                    v-model="formData[field.key]"
                    class="w-full px-3 py-2 border rounded"
                >
                    <option
                        v-for="option in field.options"
                        :key="option.value"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </option>
                </select>
            </div>

            <!-- Password -->
            <div v-else-if="field.type === 'password'">
                <input
                    :id="field.key"
                    v-model="formData[field.key]"
                    type="password"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>

            <!-- Number -->
            <div v-else-if="field.type === 'number'">
                <input
                    :id="field.key"
                    v-model.number="formData[field.key]"
                    type="number"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>

            <!-- Text -->
            <div v-else-if="field.type === 'textarea'">
                <textarea
                    :id="field.key"
                    v-model="formData[field.key]"
                    class="w-full px-3 py-2 border rounded"
                ></textarea>
            </div>

            <!-- Date -->
            <div v-else-if="field.type === 'date'">
                <input
                    :id="field.key"
                    v-model="formData[field.key]"
                    type="date"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>

            <!-- Heure -->
            <div v-else-if="field.type === 'time'">
                <input
                    :id="field.key"
                    v-model="formData[field.key]"
                    type="time"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>

            <!-- Input -->
            <div v-else-if="field.type === 'file'">
                <input
                    :id="field.key"
                    type="file"
                    @change="handleFileUpload(field.key, $event)"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>

            <!-- Other types can be added here -->
        </div>

        <!-- Submit Button -->
        <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Sauvegarder
        </button>
    </form>
</template>

<script setup>
import {defineProps, defineEmits, reactive, watch} from 'vue';

const props = defineProps({
    fields: {
        type: Array,
        required: true
    },
    model: {
        type: Object,
        required: true
    }
});

// Emits
const emit = defineEmits(['submit']);

// Reactive data (create a copy of the model)
const formData = reactive({});

// Watch the `model` prop and initialize `formData`
watch(() => props.model, (newModel) => {
    // Copie réactive de toutes les propriétés
    Object.keys(newModel).forEach((key) => {
        formData[key] = newModel[key] ?? ''; // Assigner une valeur par défaut si absente
    });
}, {immediate: true});

function handleFileUpload(key, event) {
    const file = event.target.files[0];
    if (file) {
        formData[key] = file; // Ajout du fichier à `formData`
    }
}

// Emit the form data on submit
function submitForm() {
    emit('submit', formData); // Emit the modified form data
}
</script>
