import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    isLogin: false
  }),
  actions: {
    async register(values, gender) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        gender: gender,
        age: values.age,
        country: values.country,
        password: values.password
      })
      await userCred.user.updateProfile({
        displayName: values.name
      })

      this.isLogin = true
    },

    async authenticate (values) {

      await auth.signInWithEmailAndPassword(values.email, values.password)

      this.isLogin = true
    },
    async Logout(){
   await auth.signOut() 
   this.isLogin = false
    },
  }
})
