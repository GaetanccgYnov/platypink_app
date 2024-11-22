<template>
    <TattooDetailCard :tattoo="tattoo" />
</template>
<script>
import {useRoute} from 'vue-router';
import axios from 'axios';

export default {
    data() {
        return {
            tattoo: []
        };
    },
    mounted() {
        try {
            axios.get(`http://localhost:5000/tattoos/${this.$route.params.id}`)
                 .then(response => {
                     this.tattoo = response.data;
                 });
        } catch (error) {
            console.error('Erreur lors de la récupération du tatouage :', error);
        }
    }
};

</script>
