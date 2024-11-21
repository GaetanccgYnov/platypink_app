<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <div class="text-center mb-6">
                        <h1 class="text-4xl font-bold font-bangers">Réserver ce flash</h1>
                    </div>
                </div>

                <div class="modal-body">
                    <div v-if="errors" class="text-red-600 mb-4">
                        <span>Veuillez saisir une date et une heure.</span>
                    </div>
                    <form>
                        <div class="mb-4">
                            <label for="date" class="block text-gray-700 font-bold mb-2">Choisissez une date :</label>
                            <input
                                id="date"
                                type="date"
                                v-model="date"
                                class="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div class="mb-4">
                            <label for="time" class="block text-gray-700 font-bold mb-2">Choisissez une heure :</label>
                            <select
                                id="time"
                                v-model="time"
                                class="w-full border rounded px-3 py-2"
                                required
                            >
                                <option disabled value="">-- Sélectionnez une heure --</option>
                                <option value="08:00">08:00</option>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
                            </select>
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
        flashId: Number,
    },
    data() {
        return {
            date: '',
            time: '',
            errors: false
        };
    },
    methods: {
        async submit() {
            const toast = useToast();
            try {
                if (!this.date || !this.time) {
                    this.errors = true;
                    return;
                }
                await apiClient.post('bookings', {
                    flash_tattoo_id: this.flashId,
                    tattoo_artist_id: this.artistId,
                    date: this.date,
                    time: this.time,
                });

                toast.add({ title: 'Le demande de réservation a été envoyé avec succès.', description: 'Le tatoueur doit confirmer ou annuler votre demande de rendez-vous.' });
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
