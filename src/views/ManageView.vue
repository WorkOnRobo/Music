<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{$t("Manage.Songs")}}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->

            <AppCompositionItem
              v-for="(song, i) in songs"
              :key="song.docID"
              :songs="song"
              :updateSongs="updateSongs"
              :index="i"
              :removeSong="removeSong"
              :unsavedfunction="unsavedfunction"

            />
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
      songs: [],
      unsaved: false
    }
  },

  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  },

  methods: {
    updateSongs(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id
      }

      this.songs.push(song)
    },
    unsavedfunction(value) {
      this.unsaved = value
    }
  },
  beforeRouteLeave (to, from, next) {
  if(!this.unsaved)
  {
    next()
  }
  else {
    const leave = confirm('You didnt save you modification , Do you really wanna leave ?')
    next(leave)
  }
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
