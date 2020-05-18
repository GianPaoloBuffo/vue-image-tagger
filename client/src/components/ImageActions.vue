<template>
  <v-row align="center">
    <v-col cols="3"></v-col>
    <v-col cols="6" align="center">
      <v-combobox
        v-model="selectedTags"
        item-text="label"
        chips
        clearable
        multiple
        return-object
        label="Select tags or add new ones"
        placeholder="Press Enter to add"
        :items="selectableTags"
        @change="updateSelectableTags"
      ></v-combobox>

      <v-btn
        width="80"
        color="success"
        class="mr-3"
        @click="save"
      >Save</v-btn>
      <v-btn
        width="80"
        color="error"
        @click="remove"
      >Delete</v-btn>

    </v-col>
    <v-col cols="3"></v-col>
  </v-row>
</template>

<script>
import eventBus from '@/store/eventBus';

import {
  deleteBoundingBox, loadTags, createBoundingBox, updateBoundingBox,
} from '@/api/api';

export default {
  name: 'ImageActions',
  props: {
    box: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      initialTags: [],
      selectableTags: [],
      selectedTags: [],
    };
  },
  mounted() {
    this.initSelectedTags();
    this.loadTags();
  },
  watch: {
    box(value) {
      this.selectedTags = [...value.tags];
    },
  },
  methods: {
    initSelectedTags() {
      this.selectedTags = [...this.box.tags];
    },
    async loadTags() {
      this.initialTags = await loadTags();
      this.selectableTags = this.initialTags;
    },
    updateSelectableTags(selectedTags) {
      this.selectableTags = [...new Set(this.initialTags.concat(selectedTags))];
    },
    async save() {
      const tags = this.constructTags();
      const payload = { ...this.box, tags };
      const updatedBoundingBox = await this.createOrUpdate(payload);
      const toastMessage = payload.id ? 'Updated Successfully' : 'Created Successfully';

      this.box.id = updatedBoundingBox.id;
      this.$emit('toast', toastMessage);
      eventBus.$emit('save', { id: updatedBoundingBox.id, tags });
    },
    constructTags() {
      return this.selectedTags.map((tag) => {
        if (typeof tag !== 'object') {
          return { label: tag };
        }
        return tag;
      });
    },
    createOrUpdate(payload) {
      return payload.id ? updateBoundingBox(payload) : createBoundingBox(payload);
    },
    async remove() {
      if (this.box.id) {
        await deleteBoundingBox(this.box);
      }

      this.$emit('toast', 'Deleted Successfully');
      eventBus.$emit('delete');
    },
  },
};
</script>
