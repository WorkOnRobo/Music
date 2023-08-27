<template>
  <div
    name="log"
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert_login"
    :class="reg_alert_variant_login"
  >
    {{ reg_alert_msg_login }}
  </div>
  <vee-form name="log" :validation-schema="schema_login" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>

      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        :disabled="reg_in_submission_login"
      >
        Submit
      </button>
    </div>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'AppLogin',
  props: {
    Vis: Function
  },
  data() {
    return {
      schema_login: {
        email: 'required|email',

        password: 'required|min:3|max:10|is_not:password'
      },

      reg_show_alert_login: false,
      reg_in_submission_login: false,
      reg_alert_msg_login: 'Please wait , your account is been created .',
      reg_alert_variant_login: 'bg-blue-500'
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),

    async login(values) {
      this.reg_show_alert_login = true

      this.reg_alert_msg_login = 'Please wait  .'
      this.reg_alert_variant_login = 'bg-green-500'

      try {
        await this.authenticate(values)
      } catch (error) {
        this.reg_in_submission_login = false
        this.reg_alert_variant_login = 'bg-red-500'
        this.reg_alert_msg_login = 'Login details are invalid '
        return
      }

      this.reg_alert_msg_login = 'Login succeded'
      this.reg_alert_variant_login = 'bg-green-500'
      this.reg_in_submission_login = true
      setTimeout(() => {
        this.Vis(false)
      }, 4000)

      window.location.reload()
    }
  }
}
</script>
