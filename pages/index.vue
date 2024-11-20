<template>
    <title>Accueil</title>
    <div class="text-center font-montserrat">
        <div class="py-8 bg-quaternary">
            <h1 class="text-4xl font-bold font-bangers text-gray">Platyp'Ink</h1>
            <p class="text-gray">Parce que chaque ornythorinque mérite son humain</p>
        </div>
        <div class="flex justify-center space-x-4 bg-tertiary py-4">
            <div v-for="artist in artists.slice(0, 3)"
                 :key="artist.id">
                <ArtisteCard :artist="artist"
                             :tattoos="this.tattoos.filter(tattoo => tattoo.user_id === artist.id)"/>
            </div>
        </div>
        <div class="py-8 bg-secondary">
            <h2 class="text-3xl font-bold mb-4 font-bangers">Les derniers flashs</h2>
            <div class="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                <div v-for="tattoo in tattoos.slice(0, 9)"
                     :key="tattoo.id"
                     class="bg-white p-4 rounded-lg shadow-md align-center">
                    <img :src="tattoo.image_url" alt="Artiste" class="object-cover h-full w-full" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data () {
        return {
            tattoos: [],
            artists: []
        }
    },
    beforeMount() {
        try {
            axios.get('http://localhost:5000/tattoos')
                .then(response => {
                    this.tattoos = response.data;
                    this.tattoos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                });
            axios.get('http://localhost:5000/users')
                .then(response => {
                    this.artists = response.data;
                    this.artists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                });
        } catch (error) {
            console.error('Erreur lors de la récupération des artistes :', error);
        }
    },
};
</script>

<style scoped>
.text-gray {
    color: #f8f8f8;
}
</style>
