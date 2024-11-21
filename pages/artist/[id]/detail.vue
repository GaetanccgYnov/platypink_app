<template>
  <ArtisteDetailCard :artist="artist" />
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            artist: []
        };
    },
    beforeMount() {
        try {
            axios.get(`http://localhost:5000/users/${this.$route.params.id}`)
                .then(response => {
                    this.artist = response.data;
                });
        } catch (error) {
            console.error('Erreur lors de la récupération du tatouage :', error);
        }
    },
};
</script>