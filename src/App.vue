<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Vue Image Tagger
      </div>
    </v-app-bar>

    <v-content>
      <image-container @select="setSelectedBoundingBox"></image-container>
      <image-actions v-if="selectedBoundingBox" :box="selectedBoundingBox"></image-actions>
    </v-content>
  </v-app>
</template>

<script>
import ImageContainer from '@/components/ImageContainer.vue';
import ImageActions from '@/components/ImageActions.vue';

export default {
  name: 'App',
  components: { ImageContainer, ImageActions },
  data() {
    return {
      selectedBoundingBox: null,
    };
  },
  methods: {
    setSelectedBoundingBox(boundingBox) {
      this.selectedBoundingBox = boundingBox;
    },
  },
};
</script>
