<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!appear">
      <h4 class="inline-block text-2xl font-bold">{{ songs.original_name }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
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
      <vee-form :validation-schema="schema" :initial-values="songs" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="original_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-700" name="original_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-700" name="genre" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">Submit</button>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-gray-600">Go Back</button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { ErrorMessage } from 'vee-validate'

export default {
  name: 'AppCompositionItem',
  props: {
    songs: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      appear: false,
      schema: {
        original_name: 'required',
        genre: 'alpha'
      }
    }
  },
  methods: {
    edit(){
console.log('song is edited')
    },
  },
  components: { ErrorMessage } ,

}
</script>
