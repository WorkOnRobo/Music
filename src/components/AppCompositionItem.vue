<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!appear">
      <h4 class="inline-block text-2xl font-bold">{{ songs.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deletesong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="appear = !appear"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="appear">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-show="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="songs" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
           @input="unsavedfunction(true)"
          />
          <ErrorMessage class="text-red-700" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="unsavedfunction(true)"
          />
          <ErrorMessage class="text-red-700" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submittion"
        >
          Submit
        </button>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submittion"
          @click.prevent="appear = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { ErrorMessage } from 'vee-validate'
import { songsCollection, storage } from '@/includes/firebase'
export default {
  name: 'AppCompositionItem',
  props: {
    songs: {
      type: Object,
      required: true
    },
    updateSongs: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required : true
    },
    unsavedfunction: {
    type: Function
  },
  },
  data() {
    return {
      appear: false,
      in_submittion: false,
      show_alert: false,
      alert_message: 'Please wait ! updating song in progress .',
      alert_variant: 'bg-blue-600',
      schema: {
        modified_name: 'required',
        genre: 'alpha'
      }
    }
  },
  methods: {
    async edit(values) {
      this.in_submittion = true
      this.show_alert = true
      this.alert_message = 'Please wait ! updating song in progress .'
      this.alert_variant = 'bg-blue-600'
      try {
        await songsCollection.doc(this.songs.docID).update(values)
      } catch (error) {
        this.in_submittion = false
        this.alert_variant = 'bg-red-600'
        this.alert_message = 'Something went wrong ! Try again later '
        return
      }
      console.log(this.index)
      console.log(values)

      await this.updateSongs(this.index, values)

      this.in_submittion = false
      this.alert_message = 'Succes'
      this.alert_variant = 'bg-green-600'
    },
    async deletesong(values) {
      const storageref = storage.ref()
      const songref = storageref.child(`songs/${this.songs.original_name}`)

      await songref.delete(values)
      await songsCollection.doc(this.songs.docID).delete(values)


     this.removeSong(this.index)

    }
  },
  components: { ErrorMessage }
}
</script>
