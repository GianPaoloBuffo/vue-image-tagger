import Vue from 'vue';
import Vuetify from 'vuetify';

import ImageActions from '@/components/ImageActions.vue';

import { shallowMount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();

// eslint-disable-next-line no-undef
describe('ImageActions.vue', () => {
  let vuetify;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  // eslint-disable-next-line no-undef
  it('returns a unique list of selectable tags', () => {
    const allTags = [
      { id: 1, label: 'dog' },
      { id: 2, label: 'eye' },
    ];

    const wrapper = shallowMount(ImageActions, {
      localVue,
      vuetify,
      propsData: { box: { tags: [] } },
    });

    wrapper.setData({
      initialTags: [allTags[0]],
    });


    // eslint-disable-next-line no-undef
    expect(wrapper.vm.selectableTags).toEqual(allTags);
  });
});
