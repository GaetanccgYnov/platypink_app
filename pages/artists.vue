<template>
    <div class="p-4">
        <div v-for="artist in artists"
             :key="artist.id"
             class="flex items-center border rounded-lg p-4 mb-4">
            <a :href="`artist/${artist.id}/detail`">
                <img :src="artist.profile_image"
                     alt="Image de profil"
                     class="mr-4 h-48" />
            </a>
            <div class="flex flex-col w-2/5 space-y-2">
                <a :href="`artist/${artist.id}/detail`">
                    <div class="font-bold">
                        {{ artist.name}}
                    </div>
                    <div class="flex items-center text-gray-500">
                        <span v-for="n in Math.floor(avgRating[artist.id])" :key="'full-' + n">
                            <font-awesome icon="fa-solid fa-star" class="text-yellow-500" />
                        </span>
                        <span v-if="avgRating[artist.id] % 1 >= 0.5">
                            <font-awesome icon="fa-regular fa-star-half-stroke" class="text-yellow-500" />
                        </span>
                        <span v-for="n in 5 - Math.ceil(avgRating[artist.id])" :key="'empty-' + n">
                            <font-awesome icon="fa-regular fa-star" class="text-gray-300" />
                        </span>
                        ({{ reviews[artist.id].length }} avis)
                    </div>
                    <div class="text-gray-400">
                        {{ artist.description }}
                    </div>
                </a>
            </div>
            <div class="flex items-center justify-center w-128 h-64">
                <vue-cal hide-view-selector
                         :time-from="10 * 60"
                         :time-to="23 * 60"
                         active-view="month"
                         locale="fr"
                         :disable-views="['years', 'year', 'day']"
                         class="vuecal--full-height-delete">
                <template #arrow-prev>
                    <font-awesome icon="fa-solid fa-arrow-left" />
                </template>
                <template #arrow-next>
                    <font-awesome icon="fa-solid fa-arrow-right" />
                </template>
                </vue-cal>
            </div>
        </div>
    </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from "axios";

export default {
    components: {
        VueCal,
    },
    data() {
        return {
            artists: null,
            avgRating: [],
            reviews: [],
        };
    },
    async mounted() {
        try {
            await axios.get('http://localhost:5000/users')
                .then(response => {
                    this.artists = response.data;
                });
            this.artists.forEach(artist => {
                axios.get(`http://localhost:5000/reviews?tattoo_artist_id=${artist.id}`)
                    .then(response => {
                        this.reviews[artist.id] = response.data.reviews;
                        let totalRating = 0;
                        for (const review of this.reviews[artist.id]) {
                            totalRating += review.rating;
                        }
                        let average = this.reviews[artist.id].length > 0 ? totalRating / this.reviews[artist.id].length : 0;
                        this.avgRating[artist.id] = Math.round(average * 2) / 2
                    });
                console.log(this.avgRating[artist.id]);
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des artistes :', error);
        }
    }
}
</script>
