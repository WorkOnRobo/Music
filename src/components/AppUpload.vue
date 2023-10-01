<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-blue-400 border-blue-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="button" @submit="canceled" />
      <input type="file" multiple @change="upload($event)" />
      <input type="button" @submit="canceled" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase'

export default {
  name: 'AppUpload',

  data() {
    return {
      is_dragover: false,
      uploads: []
    }
  },
  props: ['addSong'],
 
  methods: {
    beforeUnmount() {
      this.uploads.forEach((upload) => {
        upload.storeg.cancel()
      })
    },
    upload($event) {
      this.is_dragover = false

      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return
        }

        const storageRef = storage.ref()
        const storchild = storageRef.child(`songs/${file.name}`)
        const storeg = storchild.put(file)

        const uploadindex =
          this.uploads.push({
            storeg,
            current_progress: 0,
            name: file.name,
            icon: 'fas fa-spinner fa-spin',
            text_class: '',
            variant: 'bg-green-600'
          }) - 1

        storeg.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

            this.uploads[uploadindex].current_progress = progress
          },
          (error) => {
            this.uploads[uploadindex].variant = 'bg-red-500'
            this.uploads[uploadindex].icon = 'fas fa-times'
            this.uploads[uploadindex].text_class = 'text-red-500'
            console.log(error)
          },
          async () => {
            const songs = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: storeg.snapshot.ref.name,
              modified_name: storeg.snapshot.ref.name,
              genre: '',
              comment_count: 0
            }

            songs.url = await storeg.snapshot.ref.getDownloadURL()
            const songref = await songsCollection.add(songs)
            const songSnapshot = await songref.get()

            this.addSong(songSnapshot)

            this.uploads[uploadindex].variant = 'bg-green-500'
            this.uploads[uploadindex].icon = 'fas fa-check'
            this.uploads[uploadindex].text_class = 'text-green-500'
          }
        )
      })
    }
  }
}
</script>

