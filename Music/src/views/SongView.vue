<template>
  <main>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
      @click.prevent="newsong(song)"
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
      >
        <i class="fas" :class="{ 'fa-play': !playing, 'fa-pause': playing }"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modified_name }}</div>
        <div>{{ song.genre }}</div>
        <div class="song-price"> {{ $n(12, "currency") }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6" id="comments">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title"> {{ $tc("Song.comment_count",song.comment_count, {count : song.comment_count}) }}</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-if="comment_show_alert"
        :class="comment_alert_variant"
      >
        {{ comment_alert_msg }}
      </div>
      <div class="p-6">
        <vee-form :validation-schema="schema" @submit="commenter" v-if="userStore.isLogin">
          <div></div>
          <vee-field
            as="textarea"
            name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          />
          <ErrorMessage class="text-red-600" name="comment" />

          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
            :disabled="comment_in_submittion"
          >
          {{$t("CompositionItem.Submit")}}
          </button>
        </vee-form>
        <!-- Sort Comments -->
        <select
          v-model="sort"
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">{{$t("Song.latest")}}</option>
          <option value="2">{{$t("Song.oldest")}}</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto" v-for="comment in sortedcomment" :key="comment.docID">
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p>
        {{ comment.comment }}
      </p>
    </li>
  </ul>
</main>
</template>

<script>
import { songsCollection, commentsCollection, auth } from '@/includes/firebase'
import { mapStores, mapActions, mapState } from 'pinia'
import useModalStore from '@/stores/Modal'
import useUserStore from '@/stores/user'
import usePlayerStore from '@/stores/Player'

export default {
  name: 'SongView',

  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3'
      },
      comment_in_submittion: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_msg: 'Please wait ! Your comment is being submitting',
      comments: [],
      sort: '1'
    }
  },
  async beforeRouteEnter(to, from ,next) {
    const docSnapshot = await songsCollection.doc(to.params.id).get()


    next((vm) => {
      if (!docSnapshot.exists) {
      vm.$router.push({ name: 'home' })
      return
    }

    const { sort } = vm.$route.query

    vm.sort = sort === '1' || sort === '2' ? sort : '1'

    vm.song = docSnapshot.data()
    vm.getcomment()
    })
  
  },
  computed: {
    ...mapStores(useModalStore, useUserStore , usePlayerStore),
    ...mapState(usePlayerStore, ['playing']),

    sortedcomment() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        }

        return new Date(a.datePosted) - new Date(b.datePosted)
      })
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newsong','toggleaudio']),

    async commenter(values, { resetForm }) {
      //   if (!auth.currentUser) {
      //     // Handle the case when the user is not authenticated
      //     alert('you should be authenticated to continue ')
      //     console.error('User is not authenticated')
      //     return
      //   }
      ;(this.comment_in_submittion = true),
        (this.comment_show_alert = true),
        (this.comment_alert_variant = 'bg-pink-500'),
        (this.comment_alert_msg = 'Please wait ! Your comment is being submitting')

      const comment = {
        comment: values.comment,
        datePosted: new Date().toString(),
        songid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
      }

      await commentsCollection.add(comment)
      this.song.comment_count += 1
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count
      })

      this.getcomment()
      this.comment_in_submittion = false
      this.comment_alert_variant = 'bg-green-600'
      this.comment_alert_msg = 'comment sended !'

      resetForm()
    },
    async getcomment() {
      const snapshot = await commentsCollection.where('songid', '==', this.$route.params.id).get()

      this.comments = []

      snapshot.forEach((doc) => {
        this.comments.push({
          docID: doc.id,
          ...doc.data()
        })
      })
    }
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return
      }
      this.$router.push({
        query: {
          sort: newVal
        }
      })
    }
  }
}
</script>
