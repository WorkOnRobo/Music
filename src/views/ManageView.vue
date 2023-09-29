<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            
           <AppCompositionItem v-for="song in songs" :key="song.docID" :songs="song"/>


          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from '@/components/AppUpload.vue'
import { auth, songsCollection } from '@/includes/firebase'
import AppCompositionItem from '../components/AppCompositionItem.vue'

// import useUserStore from '@/stores/user'

export default {
  name: 'ManageView',
  components: {
    AppUpload,
    AppCompositionItem
},
  data() {
    return {
      songs: []
    }
  },

  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docID: document.id
      }

      this.songs.push(song)
    })
  }

  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore()

  //   if (store.isLogin) {

  //     next()

  //   } else {

  //     next({ name: 'home' })

  //   }
  // }
}
</script>
