<template>
    <div class="p-4 bg-white shadow-md rounded-lg overflow-hidden flex">
        <div class="relative">
            <img alt="Placeholder image"
                 class="object-cover h-64 w-64"
                 :src="artist.profile_image" />
        </div>
        <div class="p-4 flex flex-col justify-between">
            <div>
                <div class="flex">
                    <h2 class="text-xl font-bold">
                        {{ artist.name }}
                    </h2>
                    <div v-if="artist.phone_number"
                         class="bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8"
                         :title="artist.phone_number">
                        <font-awesome icon="fa-solid fa-phone" />
                    </div>
                    <div v-if="artist.social_links && artist.social_links.twitter"
                         class="bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8"
                         :title="artist.social_links.twitter">
                        <font-awesome icon="fa-brands fa-twitter" />
                    </div>
                    <div v-if="artist.social_links && artist.social_links.instagram"
                         class="bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8"
                         :title="artist.social_links.instagram">
                        <font-awesome icon="fa-brands fa-instagram" />
                    </div>
                    <div v-if="artist.social_links && artist.social_links.linkedin"
                         class="bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8"
                         :title="artist.social_links.linkedin">
                        <font-awesome icon="fa-brands fa-linkedin" />
                    </div>
                </div>
                <div class="flex">
                    <div class="ml-2 flex items-center justify-center w-8 h-8">
                        <font-awesome icon="fa-solid fa-location-dot" />
                    </div>
                    <p class="text-gray-600 mt-1">
                        {{ artist.address }}
                    </p>
                </div>
                <div class="flex items-center text-gray-500">
                    <span v-for="n in Math.floor(avgRating)" :key="'full-' + n">
                        <font-awesome icon="fa-solid fa-star" class="text-yellow-500" />
                    </span>
                    <span v-if="avgRating % 1 >= 0.5">
                        <font-awesome icon="fa-regular fa-star-half-stroke" class="text-yellow-500" />
                    </span>
                    <span v-for="n in 5 - Math.ceil(avgRating)" :key="'empty-' + n">
                        <font-awesome icon="fa-regular fa-star" class="text-gray-300" />
                    </span>
                    ({{ reviews.length }} avis)
                    <span class="underline cursor-pointer text-blue-500 ml-1"
                          @click="openReviewsModal = true">
                        Voir les avis
                    </span>
                </div>
                <div class="text-gray-400">
                    {{ artist.description }}
                </div>
            </div>
            <button class="bg-gray-800 text-white py-2 px-4 rounded mt-4 w-48"
                    @click="reviewModal">
                Laisser un avis
            </button>
        </div>
        <div v-if="openReviewModal"
             class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Teleport to="body">
                <review-modal :show="openReviewModal"
                              :artist-id="artist.id"
                              @close="reloadReviews">
                </review-modal>
            </Teleport>
        </div>
        <div v-if="openReviewsModal"
             class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Teleport to="body">
                <reviews-modal :show="openReviewsModal"
                               :reviews="reviews"
                               @close="openReviewsModal = false">
                </reviews-modal>
            </Teleport>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import ReviewModal from "~/components/ReviewModal.vue";
import ReviewsModal from "~/components/ReviewsModal.vue";

export default {
    components: {ReviewsModal, ReviewModal},
    props: {
        artist: Object,
        reviews: [],
        avgRating: []
    },
    data() {
        return {
            reviews: [],
            avgRating: [],
            openReviewModal: false,
            openReviewsModal: false
        }
    },
    methods: {
        async waitForArtist() {
            while (!this.artist || !this.artist.id) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        },
        reviewModal() {
            const toast = useToast();
            if (localStorage.getItem('token')) {
                this.openReviewModal = true;
            } else {
                toast.add({title: 'Vous devez être connecté pour laisser un avis', color: 'red'});
            }
        },
        async reloadReviews() {
            try {
                this.openReviewModal = false;
                axios.get(`http://localhost:5000/reviews?tattoo_artist_id=${this.artist.id}`)
                    .then(response => {
                        this.reviews = response.data.reviews;
                        let totalRating = 0;
                        for (const review of this.reviews) {
                            totalRating += review.rating;
                        }
                        let average = this.reviews.length > 0 ? totalRating / this.reviews.length : 0;
                        this.avgRating = Math.round(average * 2) / 2
                    });
            } catch (error) {
                console.error('Erreur lors du rechargement des avis :', error);
            }
        },
    },
    async mounted() {
        await this.waitForArtist();
        try {
            axios.get(`http://localhost:5000/reviews?tattoo_artist_id=${this.artist.id}`)
                .then(response => {
                    this.reviews = response.data.reviews;
                    let totalRating = 0;
                    for (const review of this.reviews) {
                        totalRating += review.rating;
                    }
                    let average = this.reviews.length > 0 ? totalRating / this.reviews.length : 0;
                    this.avgRating = Math.round(average * 2) / 2
                });
        } catch (error) {
            console.error('Erreur lors de la récupération des artistes :', error);
        }
    }
}
</script>
<style scoped>
.liked {
  color: red;
}
.stars {
  color: #FFDF00;
}
</style>