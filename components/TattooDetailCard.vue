<template>
    <div class="p-4 bg-white shadow-md rounded-lg overflow-hidden flex">
        <div class="relative">
            <img alt="Placeholder image" class="object-cover" src="https://placehold.co/600x400" />
            <div class="absolute top-2 left-2 bg-black text-white rounded-full p-2">
                <font-awesome icon="fa-regular fa-heart" />
            </div>
        </div>
        <div class="p-4 flex flex-col justify-between">
            <div>
                <h2 class="text-xl font-bold">
                    Nom du flash
                </h2>
                <span class="inline-block bg-green-200 text-green-800 text-xs font-semibold mt-2 px-2 py-1 rounded">
                    Tag
                </span>
                <div class="text-3xl font-bold mt-2">
                    Prix €
                </div>
                <p class="text-gray-600 mt-1">
                    Description
                </p>
            </div>
            <button class="bg-gray-800 text-white py-2 px-4 rounded mt-4">
                Réserver ce flash
            </button>
        </div>
      </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.liked {
    color: red;
}
</style>