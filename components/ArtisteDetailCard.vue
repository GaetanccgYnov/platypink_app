<template>
  <div class="p-4 bg-white shadow-md rounded-lg overflow-hidden flex">
    <div class="relative">
      <img alt="Placeholder image" class="object-cover" src="https://placehold.co/200x200" />
      <div class="absolute top-4 left-2 bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8">
        <font-awesome icon="fa-regular fa-heart" />
      </div>
    </div>
    <div class="p-4 flex flex-col justify-between">
      <div>
        <div class="flex">
          <h2 class="text-xl font-bold">
            Nom de l'artiste
          </h2>
          <div class="bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8">
            <font-awesome icon="fa-solid fa-phone" />
          </div>
          <div class="bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8">
            <font-awesome icon="fa-brands fa-twitter" />
          </div>
          <div class="bg-black text-white rounded-full ml-2 flex items-center justify-center w-8 h-8">
            <font-awesome icon="fa-brands fa-instagram" />
          </div>
        </div>
        <div class="flex">
          <div class="ml-2 flex items-center justify-center w-8 h-8">
            <font-awesome icon="fa-solid fa-location-dot" />
          </div>
          <p class="text-gray-600 mt-1">
            Addresse de l'artiste
          </p>
          <div class="flex items-center justify-center h-8 pl-2">
            <font-awesome icon="fa-solid fa-star" class="stars" />
          </div>
          <div class="flex items-center justify-center h-8">
            <font-awesome icon="fa-solid fa-star" class="stars" />
          </div>
          <div class="flex items-center justify-center h-8">
            <font-awesome icon="fa-solid fa-star" class="stars" />
          </div>
          <div class="flex items-center justify-center h-8">
            <font-awesome icon="fa-regular fa-star-half-stroke" class="stars" />
          </div>
          <div class="flex items-center justify-center h-8">
            <font-awesome icon="fa-regular fa-star" class="stars" />
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.liked {
  color: red;
}
.stars {
  color: #FFDF00;
}
</style>