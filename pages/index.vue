<template>
    <title>Accueil</title>
    <div class="text-center font-montserrat">
        <div class="py-8 bg-quaternary">
            <h1 class="text-4xl font-bold font-bangers text-gray">Platyp'Ink</h1>
            <p class="text-gray">Parce que chaque ornythorinque mérite son humain</p>
        </div>
        <div class="flex justify-center space-x-4 bg-tertiary py-4">
            <ArtisteCard />
            <ArtisteCard />
            <ArtisteCard />
        </div>
        <div class="py-8 bg-secondary">
            <h2 class="text-3xl font-bold mb-4 font-bangers">Les derniers flashs</h2>
            <div class="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                <div v-for="flash in 9" :key="flash"
                     class="bg-white p-4 rounded-lg shadow-md">
                    <img src="https://placehold.co/300x300" alt="Artiste" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { data } = await useFetch('https://rickandmortyapi.com/api/character')

    if (data.value.results != null) {
      console.log(data.value.results[0].name)
    }
</script>

<style scoped>
.text-gray {
    color: #f8f8f8;
}
</style>