<template>
    <div class="p-4 bg-white shadow-md rounded-lg overflow-hidden flex">
        <div class="relative">
            <img alt="Chargement de l'image..."
                 class="object-cover h-96"
                 :src="tattoo.image_url" />
            <div class="absolute top-4 left-2 bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8"
                 @click="changeFavorite">
                <font-awesome :icon="isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                              :class="isFavorite ? 'liked' : ''" />
            </div>
        </div>
        <div class="p-4 flex flex-col justify-between">
            <div>
                <h2 class="text-xl font-bold">
                    {{ tattoo.title }}
                </h2>
                <h2 class="text-xl">
                    Tatoueur : <a class="underline cursor-pointer text-blue-500 ml-1" :href="`/artist/${artisteId}/detail`">{{ artisteName }}</a>
                </h2>
                <span class="inline-block bg-green-200 text-green-800 text-xs font-semibold mt-2 px-2 py-1 rounded">
                    {{ tattoo.color ? 'Couleur' : 'Noir et blanc' }}
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
        <div v-if="openBookingModal"
             class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Teleport to="body">
                <booking-modal :show="openBookingModal"
                               :artistId="tattoo.user_id"
                               :flash-id="tattoo.id"
                               @close="openBookingModal = false">
                </booking-modal>
            </Teleport>
        </div>
    </div>
</template>
<script>

import apiClient from '~/src/api/axiosConfig.js';
import axios from "axios";
import BookingModal from "~/components/BookingModal.vue";

export default {
    components: {BookingModal},
    props: {
        tattoo: Object
    },
    data() {
        return {
            isFavorite: false,
            favoriteId: null,
            artisteId: null,
            artisteName: null,
            openBookingModal: false
        }
    },
    methods: {
        bookTattoo() {
            const toast = useToast();
            if (localStorage.getItem('role')) {
                this.openBookingModal = true;
            } else {
                toast.add({
                    title: 'Vous devez être connecté pour réserver un flash',
                    color: 'red'
                });
            }
        },
        changeFavorite() {
            if (localStorage.getItem('token')) {
                if (this.isFavorite) {
                    apiClient.delete(`/favorites/${this.favoriteId}`)
                        .then(response => {
                            this.isFavorite = false;
                        });
                } else {
                    apiClient.post(`/favorites`, {
                        flash_tattoo_id: this.tattoo.id
                    })
                        .then(response => {
                            this.isFavorite = true;
                            this.favoriteId = response.data.favorite.id;
                        });
                }
            } else {
                const toast = useToast();
                toast.add({
                    title: 'Vous devez être connecté pour ajouter un flash en favori',
                    color: 'red'
                });
            }
        },
        async waitForTattoo() {
            while (!this.tattoo || !this.tattoo.id) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        },
    },
    mounted() {
        this.waitForTattoo();
        axios.get(`http://localhost:5000/users/${this.tattoo.user_id}`)
            .then(response => {
                this.artisteId = this.tattoo.user_id;
                this.artisteName = response.data.name;
            });
        if (localStorage.getItem('token')) {
            apiClient.get(`/tattoos/${this.tattoo.id}/favorite`)
                .then(response => {
                    this.isFavorite = response.data.checked;
                    this.favoriteId = response.data.favorite_id ?? null;
                });
        }
    }
};
</script>
<style scoped>
.liked{
    color: red;
}
</style>
