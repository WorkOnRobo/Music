<template>
  <!-- Header -->
  <app-header />

  <!-- Router -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- Player -->
  <App-player />

  <!-- Auth Modal -->
  <App-auth />
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import AppPlayer from './components/AppPlayer.vue'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/user'

import { auth } from '@/includes/firebase'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },

  computed: {
    ...mapWritableState(useUserStore, ['isLogin'])
  },
  created() {
    if (auth.currentUser) {
      this.isLogin = true
    }
  }
}
</script>

<style lang="css">
@import '@/assets/main.css';

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}

</style>
