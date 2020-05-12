<template>
  <v-row>
    <v-autocomplete v-model="selectedTag" :items="tags"></v-autocomplete>
    <v-btn @click="save">Save</v-btn>
    <v-btn @click="remove">Delete</v-btn>
  </v-row>
</template>

<script>
import { deleteBoundingBox, loadTags, saveBoundingBox } from '@/api/api';

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
      tags: [],
      selectedTag: null,
    };
  },
  mounted() {
    this.loadTags();
  },
  methods: {
    loadTags() {
      this.tags = loadTags();
    },
    save() {
      saveBoundingBox(this.box, this.selectedTag);
    },
    remove() {
      deleteBoundingBox(this.box);
    },
  },
};
</script>
