<template>
<div class="card-container">
    <div class="text-section">
        <p>Trouve des artistes</p>
    </div>

    <div>
        <carousel :items-to-show="1.5"
                  :wrapAround="true">
            <slide v-for="slide in 5"
                   :key="slide"
                   class="slide">
                {{ slide }}
                <img src="https://placehold.co/150x150" alt="Artiste" />
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
    export default {
        modules: [
            'vue3-carousel-nuxt'
        ],
        data() {
            return {
                settings: {
                    "dots": true,
                    "speed": 500,
                    "slidesToShow": 4,
                    "slidesToScroll": 4,
                    "initialSlide": 0,
                    "responsive": [
                        {
                            "breakpoint": 1024,
                            "settings": {
                                "slidesToShow": 3,
                                "slidesToScroll": 3,
                                "infinite": true,
                                "dots": true
                            }
                        },
                        {
                            "breakpoint": 600,
                            "settings": {
                                "slidesToShow": 2,
                                "slidesToScroll": 2,
                                "initialSlide": 2
                            }
                        },
                        {
                            "breakpoint": 480,
                            "settings": {
                                "slidesToShow": 1,
                                "slidesToScroll": 1
                            }
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
.card-container {
    max-width: 300px;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-section {
    text-align: center;
    padding: 10px 0;
    font-size: 1.2rem;
    color: #333;
}

.slide:first-child {
    margin-left: auto;
}

.slide:last-child {
    margin-right: auto;
}
</style>
