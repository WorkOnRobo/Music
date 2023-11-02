import { setActivePinia , createPinia } from "pinia";
import useUserStore from '@/stores/user'
import { beforeEach, expect } from "vitest";

vi.mock('@/includes/firebase',() => ({
auth :{
    signInWithEmailAndPassword : () => Promise.resolve()
} 

} ))

describe("stores" , () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("authenticate user" , async() => {

        const store = useUserStore()

        expect(store.isLogin).not.toBe(true)
       await store.authenticate({})
        expect(store.isLogin).toBe(true)


    } )
} )