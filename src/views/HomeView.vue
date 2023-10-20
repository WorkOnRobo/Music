<template>
  <main>
  <!-- Introduction  -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg z-0"
      style="background-image: url('/assets/img/header.png')"
    ></div>

    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue
          augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
          sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="/assets/img/introduction-music.png"
    />
  </section>
  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 relative z-10">
        <span class="card-title"> Songs</span>
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <ol id="playlist">
        <AppSongItem v-for="song in songs" :key="song.docID" :song="song" />
        <!-- Repeat for other songs -->
      </ol>
    </div>
  </section>
</main>
</template>

<script>
import AppSongItem from '../components/AppSongItem.vue'
import { songsCollection } from '@/includes/firebase'
export default {
  name: 'HomeView',
  data() {
    return {
      songs: [],
      pendingRequest: false
    }
  },
  components: {
    AppSongItem
  },

  async created() {
    this.CreateSongs()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const ButtomOfwindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (ButtomOfwindow) {
        this.CreateSongs()
      }
    },
    async CreateSongs() {
      let snapshot
      const lastSong = this.songs[this.songs.length - 1]

      if (this.pendingRequest) {
        return
      }

      this.pendingRequest =true

      if (this.songs.length) {
        const lastSongId = lastSong.docID
        snapshot = await songsCollection.orderBy('genre').startAfter(lastSongId).limit(25).get()
      } else {
        snapshot = await songsCollection.orderBy('genre').limit(25).get()
      }

      snapshot.forEach((document) => {
        const song = {
          docID: document.id,
          ...document.data()
        }

        this.songs.push(song)
      })

      this.pendingRequest=false
    }
  }
}
// Other component properties and methods
</script>

<style scoped>
/* Your existing CSS styles here */
.z-0 {
  z-index: 0;
}

.relative {
  position: relative;
}

.z-10 {
  z-index: 10;
}
</style>
