<template>
  <v-row>
    <v-autocomplete v-model="selectedTag" :items="tags"></v-autocomplete>
    <v-btn @click="save">Save</v-btn>
    <v-btn @click="remove">Delete</v-btn>
  </v-row>
</template>

<script>
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
    async loadTags() {
      this.tags = await this.$store.dispatch('loadTags');
    },
    save() {
      const payload = { boundingBox: this.box, tag: this.selectedTag };
      this.$store.dispatch('saveBoundingBox', payload);
    },
    remove() {
      // TODO: If not already saved, should just remove from canvas?
      this.$store.dispatch('deleteBoundingBox', this.box);
    },
  },
};
</script>
