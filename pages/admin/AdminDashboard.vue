<template>
    <div v-if="userRole === 'admin'">
        <div class="admin-dashboard">
            <SideMenu @navigate="handleNavigation" />
            <div class="content">
                <component :is="currentView" />
            </div>
        </div>
    </div>
    <div v-else>
        <h1>Vous n'avez pas les droits pour accéder à cette page</h1>
    </div>
</template>

<script setup>
const isLoading = ref(false);

import {ref} from 'vue';

// Importez vos composants de section
import UsersSection from '@/components/admin/UserManagement.vue';
import TattoosSection from '@/components/admin/TattoosManagement.vue';
import BookingsSection from '@/components/admin/BookingsManagement.vue';
import OthersSection from '@/components/admin/OthersManagement.vue';
import SideMenu from '~/components/admin/SideMenu.vue';

const userRole = ref('');

// Sections disponibles
const sections = {
    users: UsersSection,
    tattoos: TattoosSection,
    bookings: BookingsSection,
    others: OthersSection
};

// Vue actuellement sélectionnée
const currentView = ref(sections.users);

// Gestion de la navigation
function handleNavigation(section) {
    currentView.value = sections[section] || sections.users;
}

onMounted(() => {
    if (localStorage.getItem('role')) {
        userRole.value = localStorage.getItem('role');
    }
    isLoading.value = false;
});
</script>

<style scoped>
.admin-dashboard{
    display: flex;
    height: 100vh;
}

.content{
    flex: 1;
    padding: 20px;
    background: #f9f9f9;
}
</style>
