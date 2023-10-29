import HomeView from '@/views/HomeView.vue'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'vitest'
import AppSongItem from '@/components/AppSongItem.vue'



describe('HomeView.vue', () => {
  test('renders list of songs', () => {

const songs = [
    {}, {}, {}
]

const component = shallowMount(HomeView , {
    data() {
        return {
            songs,
        }
    }
})

const items= component.findAllComponents(AppSongItem)

    expect(items).toHaveLength(songs.length)
  })
})
