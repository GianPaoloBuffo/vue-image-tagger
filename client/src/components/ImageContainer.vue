<template>
  <v-row>
    <v-col
      cols="12"
      align="center"
      class="pt-0 pb-0"
    >
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

import eventBus from '@/store/eventBus';
import { COLOR } from '@/util/constants';
import canvasImage from '@/assets/pug-to-tag.jpg';
import { loadBoundingBoxes } from '@/api/api';

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
      canvas.setBackgroundImage(canvasImage, canvas.renderAll.bind(canvas));

      this.addMouseDownHandler(canvas);
      this.addMouseMoveHandler(canvas);
      this.addMouseUpHandler(canvas);
      this.addObjectMoveHandler(canvas);

      this.addDeleteEventHandler(canvas);
      this.addSaveEventHandler(canvas);

      this.drawExistingBoundingBoxes(canvas);
    },
    async loadBoundingBoxes() {
      this.boundingBoxes = await loadBoundingBoxes();
    },
    addMouseDownHandler(canvas) {
      canvas.on('mouse:down', (options) => {
        const pointer = canvas.getPointer(options.e);
        const activeRectangle = this.getActiveRectangle(canvas, pointer);

        this.isMouseDown = true;
        this.$emit('select', null);

        canvas.setActiveObject(activeRectangle);
      });
    },
    getActiveRectangle(canvas, pointer) {
      const rectangle = canvas.getActiveObject();

      this.startX = pointer.x;
      this.startY = pointer.y;

      if (rectangle) {
        return rectangle;
      }

      const boundingBox = {
        top: this.startY,
        left: this.startX,
        width: pointer.x - this.startX,
        height: pointer.y - this.startY,
        tags: [],
      };

      return this.createRectangle(canvas, boundingBox);
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
    addDeleteEventHandler(canvas) {
      eventBus.$on('delete', () => {
        canvas.remove(canvas.getActiveObject());
        this.$emit('select', null);
      });
    },
    addSaveEventHandler(canvas) {
      eventBus.$on('save', ({ id, tags }) => {
        const activeBoundingBox = canvas.getActiveObject();
        activeBoundingBox.id = id;
        activeBoundingBox.tags = [...tags];
      });
    },
    constructBoundingBox(rectangle) {
      return {
        id: rectangle.id,
        top: rectangle.top,
        left: rectangle.left,
        height: rectangle.height,
        width: rectangle.width,
        tags: rectangle.tags || [],
      };
    },
    drawExistingBoundingBoxes(canvas) {
      this.boundingBoxes.forEach((box) => {
        this.createRectangle(canvas, box, true);
      });

      canvas.renderAll();
    },
    createRectangle(canvas, boundingBox) {
      const tags = boundingBox.tags.map((tag) => ({ id: tag.id, label: tag.label }));

      const rectangle = new fabric.Rect({
        id: boundingBox.id,
        top: boundingBox.top,
        left: boundingBox.left,
        width: boundingBox.width,
        height: boundingBox.height,
        tags,
        originX: 'left',
        originY: 'top',
        angle: 0,
        hasBorders: false,
        hasControls: false,
        transparentCorners: false,
      });

      rectangle.stroke = COLOR.DESELECTED;
      rectangle.strokeWidth = 5;
      rectangle.fill = 'transparent';

      canvas.add(rectangle);

      rectangle.on('mousedown', () => {
        canvas.setActiveObject(rectangle);
        this.$emit('select', rectangle);
      });

      rectangle.on('selected', () => {
        rectangle.set({ stroke: COLOR.SELECTED });
      });

      rectangle.on('deselected', () => {
        rectangle.set({ stroke: COLOR.DESELECTED });
      });

      return rectangle;
    },
  },
};
</script>
