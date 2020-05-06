<template>
  <canvas
    id="canvas"
    width="1280"
    height="720"
    @mousedown="handleMouseDown"
  ></canvas>
</template>

<script>
import { IMAGE_URL } from '@/util/constants';

export default {
  name: 'ImageContainer',
  data() {
    return {
      canvas: {
        context: null,
        offsetX: 0,
        offsetY: 0,
        scrollX: 0,
        scrollY: 0,
      },
      startMouseX: 0,
      startMouseY: 0,
      isMouseDown: false,
    };
  },
  mounted() {
    this.initCanvas();
    this.loadImage();
  },
  methods: {
    initCanvas() {
      const canvas = document.getElementById('canvas');

      this.canvas.context = canvas.getContext('2d');
      this.canvas.offsetX = canvas.offsetLeft;
      this.canvas.offsetY = canvas.offsetTop;
      this.canvas.scrollX = canvas.scrollLeft;
      this.canvas.scrollY = canvas.scrollTop;
    },
    loadImage() {
      const image = new Image();
      image.src = IMAGE_URL;
      image.onload = () => {
        this.canvas.context.drawImage(image, 0, 0);
      };
    },
    handleMouseDown() {
      // this.startMouseX = parseInt(event.clientX - offsetX);
      // startY=parseInt(e.clientY-offsetY);
    },
  },
};
</script>

<style scoped>
  #canvas {
    border: 1px solid black;
    cursor: crosshair;
  }
</style>
