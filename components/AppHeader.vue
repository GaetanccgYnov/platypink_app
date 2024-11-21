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
                <a href="/tattoos" class="text-black">Tattoos</a>
                <a href="/artists" class="text-black">Artistes</a>
                <a v-if="userRole === 'admin'" href="/admin/AdminDashboard" class="text-black">Panel Admin</a>
                <a v-if="userRole === 'tattoo_artist'" href="/artist/ManageTattoos" class="text-black">Gestion des flashs</a>
            </nav>

            <div v-if="userRole === ''"
                 class="flex items-center justify-end space-x-4 flex-1">
                <button class="px-4 py-2 border border-gray-400 rounded"
                        @click="openSigninModal = true">
                    Créer un compte
                </button>
                <button class="px-4 py-2 bg-black text-white rounded"
                        @click="openLoginModal = true">
                    Se connecter
                </button>
            </div>
            <div v-else
                 class="flex items-center justify-end space-x-4 flex-1">
                <button class="px-4 py-2 bg-black text-white rounded"
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
            userRole: ''
        };
    },
    mounted() {
        this.userRole = localStorage.getItem('role') || '';
    },
    methods: {
        updateUserRole(role) {
            this.userRole = role;
            localStorage.setItem('role', role);
        },
        logOut() {
            const toast = useToast();
            localStorage.clear();
            this.userRole = '';
            toast.add({title: 'Déconnexion réussie'});
        }
    }
};
</script>

<style>
.hat-logo{
    width: 80%;
}
</style>
