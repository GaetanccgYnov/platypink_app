<template>
<title>Tattoos</title>
<body class="font-montserrat">
<div class="p-4"
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
                    Label
                </h2>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Label
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Label
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Label
                            </span>
                        </label>
                    </div>
                </div>
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
                       max="100"
                       min="0"
                       step="1"
                       type="range"
                       @input="updateTooltip"
                       @mouseover="showTooltip = true"
                       @mouseleave="showTooltip = false" />
                <div class="flex justify-between text-gray-600">
                    <span>
                        0€
                    </span>
                    <span>
                        100€
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
                            <input class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Noir et blanc
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
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
                            <input class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Petit
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input class="form-checkbox h-4 w-4 text-gray-600"
                                   type="checkbox"/>
                            <span class="ml-2 text-gray-700">
                                Moyen
                            </span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer">
                            <input class="form-checkbox h-4 w-4 text-gray-600"
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
                <input class="flex-grow p-2 border border-gray-300 rounded-lg" placeholder="Search" type="text"/>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                  <font-awesome icon="fa-solid fa-search" />
                </button>
                <button class="ml-4 p-2 bg-black text-white rounded-lg flex items-center">
                    Nouveautées
                </button>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                    Prix ascendant
                </button>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                    Prix descendant
                </button>
                <button class="ml-2 p-2 bg-gray-200 rounded-lg">
                    Notes
                </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <TattooCard v-for="tattoo in tattoos"
                            :key="tattoo"/>
            </div>
            <div class="flex justify-between items-center mt-4">
                <button class="p-2 bg-gray-200 rounded-lg">
                    <i class="fas fa-chevron-left">
                    </i>
                    Previous
                </button>
                <div class="flex space-x-2">
                    <button class="p-2 bg-black text-white rounded-lg">
                        1
                    </button>
                    <button class="p-2 bg-gray-200 rounded-lg">
                        68
                    </button>
                </div>
                <button class="p-2 bg-gray-200 rounded-lg">
                    Next
                    <i class="fas fa-chevron-right">
                    </i>
                </button>
            </div>
        </div>
    </div>
</div>
</body>
</template>
<script>
    import TattooCard from '~/components/TattooCard.vue'
    export default {
        components: {
            TattooCard
        },
        data() {
            return {
              tattoos: 9,
              price: 50,
              showTooltip: false,
              tooltipStyle: {
                left: '0px'
              }
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
      },

    }
</script>