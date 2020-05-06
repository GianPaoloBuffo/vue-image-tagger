<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Vue Image Tagger
      </div>
    </v-app-bar>

    <v-content>
      <image-container></image-container>
    </v-content>
  </v-app>
</template>

<script>
import ImageContainer from '@/components/ImageContainer.vue';

export default {
  name: 'App',
  components: { ImageContainer },
};
</script>
