<template>
<title>Tattoos</title>
<div class="p-4 font-montserrat"
     id="app">
    <div class="flex">
        <div class="w-1/4 p-4 bg-white rounded-lg shadow">
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Mots-clés
                </h2>
            </div>
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Prix
                </h2>
                <div v-if="showTooltip"
                     :style="tooltipStyle"
                     class="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded -translate-y-7">
                  {{ price }}€
                </div>
                <input v-model="price"
                       id="price"
                       class="w-full"
                       :max="maxPrice"
                       min="0"
                       step="10"
                       type="range"
                       @input="updateTooltip"
                       @mouseover="showTooltip = true"
                       @mouseleave="showTooltip = false"
                       @change="applyFilters"/>
                <div class="flex justify-between text-gray-600">
                    <span>
                        0€
                    </span>
                    <span>
                        {{ maxPrice }}€
                    </span>
                </div>
            </div>
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Couleur
                </h2>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input v-model="blackAndWhite"
                                   class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"
                                   @change="toggleColor('blackAndWhite')"/>
                            <span class="ml-2 text-gray-700">
                                Noir et blanc
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input v-model="color"
                                   class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"
                                   @change="toggleColor('color')"/>
                            <span class="ml-2 text-gray-700">
                                Couleur
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">
                    Taille
                </h2>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input v-model="small"
                                   class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Petit
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input v-model="medium"
                                   class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Moyen
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input v-model="large"
                                   class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Grand
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-3/4 p-4">
            <div class="flex items-center mb-4">
                <input v-model="searchQuery"
                       class="flex-grow p-2 border border-gray-300 rounded-lg"
                       placeholder="Search"
                       type="text"
                       @keydown.enter="applyFilters"
                       @blur="applyFilters" />
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                  <font-awesome icon="fa-solid fa-search" />
                </button>
                <button class="ml-4 p-2 rounded-lg flex items-center"
                        :class="newest ? 'bg-black text-white' : 'bg-gray-200'"
                        @click="sortBy('newest')">
                    Nouveautées
                </button>
                <button class="ml-2 p-2 rounded-lg"
                        :class="priceAsc ? 'bg-black text-white' : 'bg-gray-200'"
                        @click="sortBy('priceAsc')">
                    Prix ascendant
                </button>
                <button class="ml-2 p-2 rounded-lg"
                        :class="priceDesc ? 'bg-black text-white' : 'bg-gray-200'"
                        @click="sortBy('priceDesc')">
                    Prix descendant
                </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <TattooCard v-for="tattoo in paginatedTattoos"
                            :key="tattoo"
                            :tattoo="tattoo"/>
            </div>
            <div class="flex justify-center items-center mt-4 space-x-2">
            <button @click="previousPage"
                    :disabled="currentPage === 1"
                    class="p-2 bg-gray-200 rounded-lg">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
            <button v-for="page in totalPages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="page === currentPage ? 'bg-black text-white' : 'bg-gray-200'"
                    class="p-2 rounded-lg">
                {{ page }}
            </button>
            <button @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="p-2 bg-gray-200 rounded-lg">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        </div>

        </div>
    </div>
</div>
</template>
<script>
    import TattooCard from '~/components/TattooCard.vue'
    import axios from "axios";
    export default {
        components: {
            TattooCard
        },
        data() {
            return {
                allTattoos: [],
                filteredTattoos: [],
                paginatedTattoos: [],
                currentPage: 1,
                itemsPerPage: 9,
                totalPages: 0,
                price: 0,
                showTooltip: false,
                tooltipStyle: {
                    left: '0px'
                },
                maxPrice: 0,
                blackAndWhite: false,
                color: false,
                small: false,
                medium: false,
                large: false,
                newest: true,
                priceAsc: false,
                priceDesc: false,
                searchQuery: ''
            }
        },
        watch: {
            blackAndWhite() {
                this.applyFilters();
            },
            color() {
                this.applyFilters();
            },
            small() {
                this.applyFilters();
            },
            medium() {
                this.applyFilters();
            },
            large() {
                this.applyFilters();
            },
            price() {
                this.applyFilters();
            }
        },
        methods: {
            updateTooltip(event) {
              const slider = event.target;
              const sliderWidth = slider.offsetWidth;

              const valueRatio = (this.price - slider.min) / (slider.max - slider.min);
              const tooltipLeft = valueRatio * sliderWidth;

              this.tooltipStyle = {
                left: `${tooltipLeft}px`,
              };
            },
            toggleColor(option) {
                if (option === 'blackAndWhite') {
                    this.color = false;
                } else {
                    this.blackAndWhite = false;
                }
            },
            applyFilters() {
                this.filteredTattoos = this.allTattoos.filter(tattoo => {
                    if (this.blackAndWhite && tattoo.color !== false) return false;
                    if (this.color && tattoo.color !== true) return false;
                    const sizeSelected = [];
                    if (this.small) sizeSelected.push('petit');
                    if (this.medium) sizeSelected.push('moyen');
                    if (this.large) sizeSelected.push('grand');
                    if (tattoo.price > this.price) return false;
                    if (sizeSelected.length > 0 && !sizeSelected.includes(tattoo.size)) return false;
                    if (this.searchQuery && tattoo.title && !tattoo.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        return false;
                    }
                    return true;
                });
                this.currentPage = 1;
                this.updatePagination();
            },
            sortBy(option) {
                if (option === 'newest') {
                    this.filteredTattoos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    this.newest = true;
                    this.priceAsc = false;
                    this.priceDesc = false;
                }
                if (option === 'priceAsc') {
                    this.filteredTattoos.sort((a, b) => a.price - b.price);
                    this.newest = false;
                    this.priceAsc = true;
                    this.priceDesc = false;
                }
                if (option === 'priceDesc') {
                    this.filteredTattoos.sort((a, b) => b.price - a.price);
                    this.newest = false;
                    this.priceAsc = false;
                    this.priceDesc = true;
                }
                this.updatePagination();
            },
            updatePagination() {
                this.totalPages = Math.ceil(this.filteredTattoos.length / this.itemsPerPage);
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                this.paginatedTattoos = this.filteredTattoos.slice(start, end);
                console.log(this.paginatedTattoos)
            },
            goToPage(page) {
                if (page >= 1 && page <= this.totalPages) {
                    this.currentPage = page;
                    this.updatePagination();
                }
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.updatePagination();
                }
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updatePagination();
                }
            },
        },
        beforeMount() {
            try {
                axios.get('http://localhost:5000/tattoos')
                    .then(response => {
                        this.allTattoos = response.data;
                        this.filteredTattoos = this.allTattoos;
                        this.allTattoos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                        this.maxPrice = Math.max(...this.allTattoos.map(tattoo => tattoo.price))
                        this.price = this.maxPrice
                        this.updatePagination();
                    });
            } catch (error) {
                console.error('Erreur lors de la récupération des artistes :', error);
            }
        }
    }
</script>