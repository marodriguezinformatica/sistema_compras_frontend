<template>
  <nav
    v-if="!esLogin"
    class="navbar navbar-expand-lg navbar-dark bg-dark"
  >
    <a class="navbar-brand" href="#">
      <img src="../assets/carrito-icon.png" width="30" height="30" alt="">Compras Udemy
    </a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" @click.prevent="irDashboard">Compras</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="cerrarSesion">Cerrar sesión</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

// Computed que se actualiza automáticamente al cambiar de ruta
const esLogin = computed(() => route.name === 'login');

const irDashboard = () => {
  router.push({ name: 'dashboard' });
};

const cerrarSesion = () => {
  localStorage.removeItem('user');
  router.push({ name: 'login' });
};
</script>

<style scoped>
.nav-link {
  cursor: pointer;
}
</style>