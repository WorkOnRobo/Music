import { defineStore } from 'pinia'

export default defineStore('Modal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    hiddenClass(state){
return !state.isOpen ? "hidden" : "";
    }
  },
});
