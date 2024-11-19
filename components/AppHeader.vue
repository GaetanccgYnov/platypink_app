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
                <div class="flex items-center border rounded-full px-4">
                    <input v-model="searchQuery"
                           type="text"
                           placeholder="Value"
                           class="outline-none"
                    />
                    <button @click="clearSearch" v-if="searchQuery">✖️</button>
                </div>
            </div>

            <nav class="flex items-center justify-center space-x-4 flex-1">
                <a href="/tattoos" class="text-black">Tattoos</a>
                <a href="/artists" class="text-black">Artistes</a>
            </nav>

            <div class="flex items-center justify-end space-x-4 flex-1">
                <button class="px-4 py-2 border border-gray-400 rounded">Sign in</button>
                <button class="px-4 py-2 bg-black text-white rounded"
                        @click="openRegisterModal = true">
                  Log in
                </button>
            </div>
        </div>
    </header>
  <div
      v-if="openRegisterModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

    <Teleport to="body">
      <login-modal :show="openRegisterModal"
                   @close="openRegisterModal = false">
        <template #header>
          <h3>Custom Header</h3>
        </template>
      </login-modal>
    </Teleport>
  </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            openRegisterModal: false
        };
    },
    methods: {
        clearSearch() {
            this.searchQuery = "";
            },
    },
};
</script>

<style>
.hat-logo {
    width: 80%;
}
</style>
