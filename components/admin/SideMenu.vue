<template>
    <div class="side-menu">
        <ul>
            <li v-for="item in menuItems" :key="item.key" @click="navigate(item.key)">
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

const menuItems = [
    {
        key: 'users',
        label: 'Utilisateurs'
    },
    {
        key: 'tattoos',
        label: 'Tattoos'
    },
    {
        key: 'bookings',
        label: 'Réservations'
    },
    {
        key: 'others',
        label: 'Autres'
    }
];

const emit = defineEmits(['navigate']);

function navigate(section) {
    emit('navigate', section);
}
</script>

<style scoped>
.side-menu{
    width: 200px;
    background: #333;
    color: #fff;
    padding: 20px;
}

.side-menu ul{
    list-style: none;
    padding: 0;
}

.side-menu li{
    margin: 10px 0;
    cursor: pointer;
}

.side-menu li:hover{
    color: #00d1b2;
}
</style>
