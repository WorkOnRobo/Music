import AppSongItem from '@/components/AppSongItem.vue';
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { expect } from 'vitest';

describe('AppSongItem', () => {
  test("render song.display_name", () => {
    const song = {
      display_name: "Test" // Provide a string value for display_name
    }

    const wrapper = shallowMount(AppSongItem, {
      props: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
const compositionAuthor = wrapper.find('.text-sm')
    expect(compositionAuthor.text()).toBe(song.display_name); // Fix the syntax here
  })
})
