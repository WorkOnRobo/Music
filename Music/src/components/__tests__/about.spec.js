import AboutView from '@/views/AboutView.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('AboutView.vue', () => {
  test('renders inner text', () => {
    const wrapper = mount(AboutView, {
      global: {
        mocks: {
          $t: (message) => message
        }
      }
    })

    // Check if the text content contains 'about'
    expect(wrapper.text()).toContain('about')
  })
})
