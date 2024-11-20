<template>
    <div class="p-4 bg-white shadow-md rounded-lg overflow-hidden flex">
        <div class="relative">
            <img alt="Placeholder image"
                 class="object-cover h-96"
                 :src="tattoo.image_url" />
            <div class="absolute top-4 left-2 bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8"
                 @click="changeFavorite">
                <font-awesome :icon="isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                              :class="isFavorite ? 'liked' : ''"/>
            </div>
        </div>
        <div class="p-4 flex flex-col justify-between">
            <div>
                <h2 class="text-xl font-bold">
                    {{ tattoo.title }}
                </h2>
                <span class="inline-block bg-green-200 text-green-800 text-xs font-semibold mt-2 px-2 py-1 rounded">
                    {{ tattoo.color ? 'Couleur' : 'Noir et blanc'}}
                </span>
                <span class="inline-block bg-green-200 text-green-800 text-xs font-semibold ml-2 mt-2 px-2 py-1 rounded">
                    {{ tattoo.size }}
                </span>
                <div class="text-3xl font-bold mt-2">
                    {{ tattoo.price }} €
                </div>
                <p class="text-gray-600 mt-1">
                    {{ tattoo.description }}
                </p>
            </div>
            <button class="bg-gray-800 text-white py-2 px-4 rounded mt-4"
                    @click="bookTattoo">
                Réserver ce flash
            </button>
        </div>
      </div>
</template>
<script>

import apiClient from "~/src/api/axiosConfig.js";

export default {
    props: {
        tattoo: Object
    },
    data() {
        return {
            isFavorite: false
        }
    },
    methods: {
        bookTattoo() {
            const toast = useToast();
            if (localStorage.getItem('role')) {
                toast.add({title: 'Vous êtes connecté pour réserver un flash'});
            } else {
                toast.add({title: 'Vous devez être connecté pour réserver un flash', color: 'red'});
            }
        },
        changeFavorite() {
            if (localStorage.getItem('token')) {
                apiClient.post(`/favorites/${this.tattoo.id}`)
                    .then(response => {
                        this.isFavorite = response.data.checked;
                    });
            } else {
                const toast = useToast();
                toast.add({title: 'Vous devez être connecté pour ajouter un flash en favori', color: 'red'});
            }
        }
    },
    mounted() {
        if (localStorage.getItem('token')) {
            apiClient.get(`/favorites/${this.tattoo.id}`)
                .then(response => {
                    this.isFavorite = response.data.checked;
                });
        }
    }
}
</script>
<style scoped>
.liked {
    color: red;
}
</style>