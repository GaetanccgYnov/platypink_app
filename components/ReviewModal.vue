<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <div class="text-center mb-6">
                        <h1 class="text-4xl font-bold font-bangers">Laisser un avis</h1>
                    </div>
                </div>

                <div class="modal-body">
                    <div v-if="errors" class="text-red-600 mb-4">
                        <span>Une erreur est survenue, veuillez réessayer.</span>
                    </div>
                    <form>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
                                Message
                            </label>
                            <textarea v-model="message"
                                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="message"
                                      placeholder="Votre avis ici..."
                                      rows="4">
                            </textarea>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Note
                            </label>
                            <div class="flex items-center space-x-2">
                                <span v-for="star in 5"
                                      :key="star"
                                      class="cursor-pointer"
                                      @click="rate(star)">
                                    <font-awesome :icon="rating >= star ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                                                  class="text-yellow-500 text-2xl" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <div class="flex items-center justify-center space-x-4">
                            <button class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    @click="submit">
                                Envoyer
                            </button>
                            <button class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    @click="$emit('close')">
                                Fermer
                            </button>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import apiClient from "~/src/api/axiosConfig.js";

export default {
    props: {
        show: Boolean,
        artistId: String,
    },
    data() {
        return {
            message: '',
            rating: 0,
            errors: false,
        };
    },
    methods: {
        rate(star) {
            this.rating = star;
        },
        async submit() {
            const toast = useToast();
            try {
                if (!this.message || this.rating === 0) {
                    this.errors = true;
                    return;
                }
                await apiClient.post('reviews', {
                    comment: this.message,
                    rating: this.rating,
                    tattoo_artist_id: this.artistId,
                });

                toast.add({ title: 'Avis envoyé avec succès!' });
                this.$emit('close');
            } catch (error) {
                this.errors = true;
                toast.add({ title: "Une erreur est survenue lors de l'envoi", color: 'red' });
            }
        },
    },
};
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 400px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header {
    text-align: center;
}

.modal-footer {
    margin-top: 20px;
}

.modal-body {
    margin: 20px 0;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
