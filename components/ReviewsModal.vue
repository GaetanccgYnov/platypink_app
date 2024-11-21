<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <div class="text-center mb-6">
                        <h1 class="text-4xl font-bold font-bangers">Liste des avis</h1>
                    </div>
                </div>

                <div class="modal-body">
                    <div class="p-4">
                        <div v-if="reviews.length === 0" class="text-gray-500">
                            Aucun avis pour le moment.
                        </div>
                        <ul v-else>
                            <li v-for="review in reviews" :key="review.id" class="border-b py-2">
                                <div class="flex items-center">
                                    <span class="ml-2 text-gray-500">
                                        ({{ review.rating }} <font-awesome icon="fa-solid fa-star" class="text-yellow-500" />)
                                    </span>
                                </div>
                                <p class="text-gray-700 mt-1">{{ review.comment }}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <div class="flex items-center justify-center space-x-4">
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
export default {
    props: {
        show: Boolean,
        reviews: Object,
    }
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

