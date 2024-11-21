<template>
    <footer v-if="shouldDisplayFooter" class="footer font-montserrat">
        <div class="footer-columns">
            <div class="footer-column social-icons icon">
                <font-awesome icon="fa-brands fa-twitter" fa-link="https://facebook.com" />
                <font-awesome icon="fa-brands fa-facebook" />
                <font-awesome icon="fa-brands fa-instagram" />
                <font-awesome icon="fa-brands fa-linkedin" />
            </div>
            <div class="footer-column">
                <h3>Use cases</h3>
                <ul>
                    <li>UI design</li>
                    <li>UX design</li>
                    <li>Wireframing</li>
                    <li>Diagramming</li>
                    <li>Brainstorming</li>
                    <li>Online whiteboard</li>
                    <li>Team collaboration</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Explore</h3>
                <ul>
                    <li>Design</li>
                    <li>Prototyping</li>
                    <li>Development features</li>
                    <li>Design systems</li>
                    <li>Collaboration features</li>
                    <li>Design process</li>
                    <li>FigJam</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Resources</h3>
                <ul>
                    <li>Blog</li>
                    <li>Best practices</li>
                    <li>Colors</li>
                    <li>Color wheel</li>
                    <li>Support</li>
                    <li>Developers</li>
                    <li>Resource library</li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

// Calcul pour déterminer si le footer doit être affiché
const shouldDisplayFooter = computed(() => route.path !== '/admin/AdminDashboard');
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.social-icons{
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
}

.icon{
    font-size: 35px;
    /* Add appropriate font icons or SVGs */
}

.footer-columns{
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.footer-column{
    flex: 1;
    padding: 10px;
}

.footer-column h3{
    font-weight: bold;
    margin-bottom: 10px;
}

.footer-column ul{
    list-style: none;
    padding: 0;
}

.footer-column li{
    margin-bottom: 5px;
}
</style>
