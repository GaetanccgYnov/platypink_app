<template>
    <header class="flex items-center justify-between p-2 border-b font-montserrat">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
        <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <div class="flex items-center justify-between w-full px-4">
            <div class="flex items-center flex-1 space-x-4">
                <a href="/">
                    <img class="hat-logo" src="~/assets/img/hat_logo.png" alt="Logo">
                </a>
            </div>

            <nav class="flex items-center justify-center space-x-4 flex-1">
                <a
                    href="/tattoos"
                    :class="{ 'active': currentPage === '/tattoos' }"
                    @click="setCurrentPage('/tattoos')">
                    Tattoos
                </a>
                <a
                    href="/artists"
                    :class="{ 'active': currentPage === '/artists' }"
                    @click="setCurrentPage('/artists')">
                    Artistes
                </a>
                <a
                    v-if="userRole === 'admin'"
                    href="/admin/AdminDashboard"
                    :class="{ 'active': currentPage === '/admin/AdminDashboard' }"
                    @click="setCurrentPage('/admin/AdminDashboard')">
                    Panel Admin
                </a>
                <a
                    v-if="userRole === 'tattoo_artist'"
                    href="/artist/ManageTattoos"
                    :class="{ 'active': currentPage === '/artist/ManageTattoos' }"
                    @click="setCurrentPage('/artist/ManageTattoos')">
                    Gestion des flashs
                </a>
            </nav>

            <div v-if="userRole === ''"
                 class="flex items-center justify-end space-x-4 flex-1">
                <button class="px-4 py-2 border border-gray-400 rounded text-white login-button bg-tertiary"
                        @click="openSigninModal = true">
                    Créer un compte
                </button>
                <button class="px-4 py-2 text-white rounded login-button bg-secondary"
                        @click="openLoginModal = true">
                    Se connecter
                </button>
            </div>
            <div v-else
                 class="flex items-center justify-end space-x-4 flex-1">
                <button class="px-4 py-2 text-white rounded login-button bg-secondary"
                        @click="logOut()">
                    Se déconnecter
                </button>
            </div>
        </div>
    </header>
    <div v-if="openLoginModal"
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Teleport to="body">
            <login-modal :show="openLoginModal"
                         @close="openLoginModal = false"
                         @updateUserRole="updateUserRole($event)">
            </login-modal>
        </Teleport>
    </div>
    <div v-if="openSigninModal"
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Teleport to="body">
            <signin-modal :show="openSigninModal"
                          @close="openSigninModal = false"
                          @updateUserRole="updateUserRole($event)">
            </signin-modal>
        </Teleport>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            openLoginModal: false,
            openSigninModal: false,
            userRole: '',
            currentPage: ''
        };
    },
    mounted() {
        this.userRole = localStorage.getItem('role') || '';
        this.currentPage = window.location.pathname;
    },
    methods: {
        updateUserRole(role) {
            this.userRole = role;
            localStorage.setItem('role', role);
            this.$router.push('/');
        },
        logOut() {
            const toast = useToast();
            localStorage.clear();
            this.userRole = '';
            toast.add({title: 'Déconnexion réussie'});
        },
        setCurrentPage(page) {
            this.currentPage = page; // Met à jour la page active
        }
    }
};
</script>

<style scoped>
/* Logo */
.hat-logo{
    width: 80%;
    transition: transform 0.3s ease;
}

.hat-logo:hover{
    transform: scale(1.1); /* Effet de zoom au survol */
}

/* Navigation Links - Default Style */
nav a{
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s, text-shadow 0.3s ease-in-out;
    font-size: 16px;
    font-weight: 500;
    color: #555; /* Couleur par défaut */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

/* Hover Effect for Navigation Links */
nav a:hover{
    background-color: #e0e0e0;
    color: #222; /* Couleur plus sombre au survol */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée */
    transform: translateY(-2px); /* Légère montée au survol */
    font-weight: bold; /* Accentuation du texte */
}

/* Active Link */
nav a.active{
    background-color: #333;
    color: #fff;
    font-weight: bold;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Ombre intense */
    border: 1px solid #444; /* Ajout d'une bordure légère */
}

/* Login and Signup Buttons */
.login-button{
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.login-button:hover{
    cursor: pointer;
    background-color: #444;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

/* Header Container */
header{
    background-color: #f8f8f8;
    border-bottom: 2px solid #ddd;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

header:hover{
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Accentuation au survol */
}
</style>

