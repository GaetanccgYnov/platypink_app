<template>
  <Transition name="modal">
    <div v-if="show"
         class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <div class="text-center mb-6">
            <h1 class="text-4xl font-bold font-bangers">Inscription</h1>
          </div>
        </div>

        <div class="modal-body">
          <div v-if="errors"
               class="text-red-600">
            <span>Email ou mot de passe incorrect</span>
          </div>
          <form>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input v-model="email"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="email"
                     type="text"
                     placeholder="Value">
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                     for="password">
                Password
              </label>
              <input v-model="password"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="password"
                     type="password"
                     placeholder="Value">
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="flex items-center justify-center space-x-4">
              <button class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      @click="submit">
                Submit
              </button>
              <button class="bg-black text-white font-bold p-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      @click="$emit('close')">
                Close
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      email: '',
      password: '',
      errors: false,
    };
  },
  methods: {
    async submit() {
      const toast = useToast();
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        toast.add({title: 'Connexion réussie'});
        this.$emit('close');
      } catch (error) {
        this.errors = true;
        toast.add({title: "Une erreur est survenue", color: 'red'});
      }
    },
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>