<template>
  <v-row>
    <v-col cols="12" align="center">
      <canvas
        id="canvas"
        width="1280"
        height="720"
      ></canvas>
    </v-col>
  </v-row>
</template>

<script>
import { fabric } from 'fabric';

import { IMAGE_URL } from '@/util/constants';

export default {
  name: 'ImageContainer',
  data() {
    return {
      boundingBoxes: [],
      isMouseDown: false,
      startX: 0,
      startY: 0,
    };
  },
  async mounted() {
    await this.loadBoundingBoxes();
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = new fabric.Canvas('canvas');
      canvas.setBackgroundImage(IMAGE_URL, canvas.renderAll.bind(canvas));

      this.addMouseDownHandler(canvas);
      this.addMouseMoveHandler(canvas);
      this.addMouseUpHandler(canvas);
      this.addObjectMoveHandler(canvas);

      this.drawExistingBoundingBoxes(canvas);
    },
    async loadBoundingBoxes() {
      this.boundingBoxes = await this.$store.dispatch('loadBoundingBoxes');
    },
    addMouseDownHandler(canvas) {
      canvas.on('mouse:down', (options) => {
        this.isMouseDown = true;
        this.$emit('select', null);

        const pointer = canvas.getPointer(options.e);
        this.startX = pointer.x;
        this.startY = pointer.y;

        const rectangle = this.createRectangle({
          canvas,
          top: this.startY,
          left: this.startX,
          width: pointer.x - this.startX,
          height: pointer.y - this.startY,
        });

        canvas.setActiveObject(rectangle);
      });
    },
    addMouseMoveHandler(canvas) {
      canvas.on('mouse:move', (options) => {
        if (!this.isMouseDown) {
          return;
        }

        const pointer = canvas.getPointer(options.e);
        const rectangle = canvas.getActiveObject();

        if (this.startX > pointer.x) {
          rectangle.set({ left: Math.abs(pointer.x) });
        }

        if (this.startY > pointer.y) {
          rectangle.set({ top: Math.abs(pointer.y) });
        }

        rectangle.set({ width: Math.abs(this.startX - pointer.x) });
        rectangle.set({ height: Math.abs(this.startY - pointer.y) });

        rectangle.setCoords();
        canvas.renderAll();
      });
    },
    addMouseUpHandler(canvas) {
      canvas.on('mouse:up', () => {
        this.isMouseDown = false;

        const rectangle = canvas.getActiveObject();
        if (rectangle.height && rectangle.width) {
          const boundingBox = this.constructBoundingBox(rectangle);
          this.boundingBoxes.push(boundingBox);
          this.$emit('select', boundingBox);
        }
      });
    },
    addObjectMoveHandler(canvas) {
      canvas.on('object:moving', () => {
        this.isMouseDown = false;
      });
    },
    constructBoundingBox(rectangle) {
      return {
        top: rectangle.top,
        left: rectangle.left,
        height: rectangle.height,
        width: rectangle.width,
      };
    },
    drawExistingBoundingBoxes(canvas) {
      this.boundingBoxes.forEach((box) => {
        this.createRectangle({
          canvas,
          top: box.top,
          left: box.left,
          width: box.width,
          height: box.height,
        });
      });

      canvas.renderAll();
    },
    createRectangle({
      canvas, top, left, width, height,
    }) {
      const rectangle = new fabric.Rect({
        top,
        left,
        width,
        height,
        originX: 'left',
        originY: 'top',
        angle: 0,
        hasBorders: false,
        hasControls: false,
        transparentCorners: false,
      });

      rectangle.stroke = 'red';
      rectangle.strokeWidth = 5;
      rectangle.fill = 'transparent';

      canvas.add(rectangle);

      rectangle.on('mousedown', () => {
        canvas.setActiveObject(rectangle);
        this.$emit('select', rectangle);
      });

      rectangle.on('selected', () => {
        rectangle.set({ stroke: 'green' });
      });

      rectangle.on('deselected', () => {
        rectangle.set({ stroke: 'red' });
      });

      return rectangle;
    },
  },
};
</script>
