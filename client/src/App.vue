<template>
  <v-app>
    <v-snackbar left dark v-model="showSnackbar">
      {{ toastMessage }}
    </v-snackbar>

    <v-content>
      <app-description></app-description>
      <image-container @select="setSelectedBoundingBox"></image-container>
      <image-actions
        v-if="selectedBoundingBox"
        :box="selectedBoundingBox"
        @toast="handleToast"
      ></image-actions>
    </v-content>
  </v-app>
</template>

<script>
import AppDescription from '@/components/AppDescription.vue';
import ImageContainer from '@/components/ImageContainer.vue';
import ImageActions from '@/components/ImageActions.vue';

export default {
  name: 'App',
  components: { AppDescription, ImageContainer, ImageActions },
  data() {
    return {
      showSnackbar: false,
      toastMessage: null,
      selectedBoundingBox: null,
    };
  },
  methods: {
    handleToast(message) {
      this.showSnackbar = true;
      this.toastMessage = message;
    },
    setSelectedBoundingBox(boundingBox) {
      this.selectedBoundingBox = boundingBox;
    },
  },
};
</script>
