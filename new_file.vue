<template>
  <div
    class="draggable-slider"
    @touchstart="startDragTouch"
    @touchmove="handleDragTouch"
    @touchend="stopDragTouch"
  >
    <div class="slider" ref="slider">
      <div
        class="slider-thumb"
        :style="{ left: thumbPosition + 'px' }"
        @touchstart.stop="startDragTouch"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      isDragging: false,
      startX: 0
    };
  },
  computed: {
    thumbPosition() {
      const percentage = (this.value - this.min) / (this.max - this.min);
      return percentage * (this.$refs.slider.clientWidth - 20);
    }
  },
  methods: {
    startDragTouch(event) {
      this.isDragging = true;
      this.startX = event.touches[0].clientX;
      document.addEventListener('touchmove', this.handleDragTouch);
      document.addEventListener('touchend', this.stopDragTouch);
    },
    handleDragTouch(event) {
      if (this.isDragging) {
        const diffX = event.touches[0].clientX - this.startX;
        const percentage = diffX / (this.$refs.slider.clientWidth - 20);
        this.value = Math.max(
          this.min,
          Math.min(this.max, this.value + percentage * (this.max - this.min))
        );
        this.startX = event.touches[0].clientX;
      }
    },
    stopDragTouch() {
      this.isDragging = false;
      document.removeEventListener('touchmove', this.handleDragTouch);
      document.removeEventListener('touchend', this.stopDragTouch);
    }
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>

<style scoped>
.draggable-slider {
  text-align: center;
  margin-top: 50px;
}

.slider {
  width: 300px;
  position: relative;
  background-color: #ddd;
  height: 10px;
  margin: 10px auto;
}

.slider-thumb {
  width: 20px;
  height: 20px;
  background-color: #007BFF;
  position: absolute;
  top: -5px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}
</style>
