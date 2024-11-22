<template>
  <ArtisteDetailCard :artist="artist"
                     :tattoos="tattoos"/>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            artist: [],
            tattoos: [],
        };
    },
    mounted() {
        try {
            axios.get(`http://localhost:5000/users/${this.$route.params.id}`)
                .then(response => {
                    this.artist = response.data;
                });
            axios.get(`http://localhost:5000/tattoos?user_id=${this.$route.params.id}`)
                .then(response => {
                    this.tattoos = response.data;
                });
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    },
};
</script>