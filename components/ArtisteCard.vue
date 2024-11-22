<template>
    <div class="card-container">
        <div class="text-section">
            <p>{{ artist.name }}</p>
        </div>

        <div>
            <carousel :items-to-show="1.5"
                      :autoplay="tattoos.length > 1 ? 7000 : 0"
                      :wrapAround="tattoos.length > 1"
                      class="w-full max-w-md mx-auto">
                <slide v-for="tattoo in tattoos"
                       :key="tattoo.id"
                       class="slide flex flex-col items-center mx-2">
                    <div class="w-40 h-40 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
                        <img :src="tattoo.image_url"
                             alt="Tattoo"
                             class="object-cover w-full h-full" />
                    </div>
                    <span class="text-center font-bold">{{ tattoo.title.length < 14 ? tattoo.title : tattoo.title.slice(0, 14) + '...' }}</span>
                </slide>

                <template>
                    <navigation />
                    <pagination />
                </template>
            </carousel>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    modules: [
        'vue3-carousel-nuxt'
    ],
    props: {
        artist: {
            type: Object,
            required: true
        },
        tattoos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            settings: {
                'dots': true,
                'speed': 500,
                'slidesToShow': 4,
                'slidesToScroll': 4,
                'initialSlide': 0,
                'responsive': [
                    {
                        'breakpoint': 1024,
                        'settings': {
                            'slidesToShow': 3,
                            'slidesToScroll': 3,
                            'infinite': true,
                            'dots': true
                        }
                    },
                    {
                        'breakpoint': 600,
                        'settings': {
                            'slidesToShow': 2,
                            'slidesToScroll': 2,
                            'initialSlide': 2
                        }
                    },
                    {
                        'breakpoint': 480,
                        'settings': {
                            'slidesToShow': 1,
                            'slidesToScroll': 1
                        }
                    }
                ]
            }
        };
    },
    mounted() {
        try {
            axios.get('http://localhost:5000/tattoos')
                 .then(response => {
                     this.tattoos = response.data;
                 });
            axios.get('http://localhost:5000/users')
                 .then(response => {
                     this.artists = response.data;
                     this.artists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                 });
        } catch (error) {
            console.error('Erreur lors de la récupération des artistes :', error);
        }
    }
};
</script>

<style scoped>
.card-container{
    max-width: 300px;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-container:hover{
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.text-section{
    text-align: center;
    padding: 10px 0;
    font-size: 1.2rem;
    color: #333;
}

.slide:first-child{
    margin-left: auto;
}

.slide:last-child{
    margin-right: auto;
}
</style>
