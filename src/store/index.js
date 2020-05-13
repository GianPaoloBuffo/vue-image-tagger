import Vue from 'vue';
import Vuex from 'vuex';

import {
  deleteBoundingBox, loadBoundingBoxes, loadTags, saveBoundingBox,
} from '@/api/api';

Vue.use(Vuex);

const filterBoundingBoxes = (boundingBoxes, deletedBoundingBox) => boundingBoxes.filter(
  (box) => box.id !== deletedBoundingBox.id,
);

const dummyTags = [{ id: 1, text: 'dog' }];

const dummyBoundingBoxes = [{
  id: 1,
  top: 100,
  left: 100,
  height: 50,
  width: 50,
}];

export default new Vuex.Store({
  state: {
    tags: dummyTags,
    boundingBoxes: dummyBoundingBoxes,
  },
  mutations: {
    setTags(state, tags) {
      state.tags = [...tags];
    },
    setBoundingBoxes(state, boundingBoxes) {
      state.boundingBoxes = [...boundingBoxes];
    },
  },
  actions: {
    async loadTags({ commit }) {
      const tags = await loadTags();
      commit('setTags', tags);

      return tags;
    },
    async loadBoundingBoxes({ commit }) {
      const boundingBoxes = await loadBoundingBoxes();
      commit('setBoundingBoxes', boundingBoxes);

      return boundingBoxes;
    },
    async saveBoundingBox({ state, commit }, { boundingBox, tag }) {
      const updatedBoundingBox = await saveBoundingBox(boundingBox, tag);
      const updatedBoundingBoxes = { updatedBoundingBox, ...state.boundingBoxes };
      commit('setBoundingBoxes', updatedBoundingBoxes);

      return updatedBoundingBox;
    },
    async deleteBoundingBox({ state, commit }, boundingBox) {
      const deletedBoundingBox = await deleteBoundingBox(boundingBox);
      const updatedBoundingBoxes = filterBoundingBoxes(state.boundingBoxes, deletedBoundingBox);
      commit('setBoundingBoxes', updatedBoundingBoxes);

      return deletedBoundingBox;
    },
  },
});