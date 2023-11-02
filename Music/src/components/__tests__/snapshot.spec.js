import AppSongItem from '@/components/AppSongItem.vue'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('AppSongItem', () => {
  test('render snaphot to songitem ', () => {
    const song = {
      docID: 'abc',
      display_name: 'Test',
      modified_name: 'test',
      comment_count: 5
    }

    const wrapper = shallowMount(AppSongItem, {
      props: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
