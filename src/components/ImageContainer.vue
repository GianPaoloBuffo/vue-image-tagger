<template>
  <canvas id="canvas" width="1280" height="720"></canvas>
</template>

<script>
export default {
  name: "ImageContainer",
  mounted() {
    this.loadImage();
  },
  methods: {
    loadImage() {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const image = new Image();

      image.src = "https://picsum.photos/1280/720";
      image.onload = () => {
        context.drawImage(image, 0, 0);
      };
    }
  }
};
</script>

<style scoped>
#canvas {
  border: 1px solid black;
}
</style>
