import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import AppSongItem from '@/components/AppSongItem.vue'

describe('AppSongItem', () => {
  it('render router link', () => {
    const song = {
      docID: 'abc',
     
    }

    const wrapper = shallowMount(AppSongItem, {
      props: { song },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

   

    expect(wrapper.findAllComponents(RouterLinkStub).at(1).props().to).toEqual(
      { name: 'song', params: { id: song.docID }, hash:'#comments' }
      
    );

   
  });
});
