<template>
  <div>
    <header id="header" class="bg-gray-700">
      <nav class="container mx-auto flex justify-start items-center py-5 px-4">
        <!-- App Name -->
        <router-link
          class="text-white font-bold uppercase text-2xl mr-4"
          :to="{ name: 'home' }"
          active-class="no-active"
          >{{ $t('Header.Music') }}</router-link
        >

        <div class="flex flex-grow items-center">
          <!-- Primary Navigation -->
          <ul class="flex flex-row mt-1">
            <!-- Navigation Links -->
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'about' }">{{
                $t('Header.About')
              }}</router-link>
            </li>
            <li v-if="!userStore.isLogin">
              <a class="px-2 text-white" href="#" @click.prevent="ToogleAuthModal">
                {{ $t('Header.LogReg') }}</a
              >
            </li>

            <template v-else>
              <li>
                <router-link
                  class="px-2 text-white"
                  :to="{ name: 'home' }"
                  @click.prevent="signOut"
                  >{{ $t('Header.Logout') }}</router-link
                >
              </li>
              <li>
                <router-link class="px-2 text-white" :to="{ name: 'manage' }">{{
                  $t('Header.Manage')
                }}</router-link>
              </li>
            </template>
          </ul>
          <ul class="ml-auto">
            <li>
              <a class="px-2 text-green-500" href="#" @click.prevent="ChangeLan">
                {{ currentLan }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/Modal'
import useUserStore from '@/stores/user'
export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLan() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English'
    }
  },
  methods: {
    ToogleAuthModal() {
      this.ModalStore.isOpen = !this.ModalStore.isOpen
    },
    signOut() {
      this.userStore.Logout()

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' })
      }
    },
    ChangeLan() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr'
    }
  }
}
</script>
