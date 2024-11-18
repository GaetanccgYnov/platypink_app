<template>
    <section>
        <p>This page will be displayed at the {{ id }} route.</p>
    </section>
    <TattooDetailCard />
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
</script>