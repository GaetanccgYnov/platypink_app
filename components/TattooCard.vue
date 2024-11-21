<template>
    <a :href="`/tattoo/${tattoo.id}/detail`">
        <div class="bg-gray-100 p-4 rounded-lg shadow">
            <img alt="Chargement de l'image..."
                 class="w-full h-96 object-cover rounded-lg mb-2"
                 :src="tattoo.image_url"
                 width="200" />
            <div class="text-center">
                <p class="text-gray-700">
                    {{ tattoo.title }}
                </p>
                <p class="text-gray-500">
                    {{ tattoo.price }}€
                </p>
            </div>
        </div>
    </a>
</template>
<script>
export default {
    props: {
        tattoo: Object
    }
};
</script>
