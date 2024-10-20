<template>
  <div class="screen-wrapper" ref="screenWrapper" :style="wrapperStyle">
    <slot></slot>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: "VScaleScreen",
  props: {
    width: {
      type: [String, Number],
      default: 1920,
    },
    height: {
      type: [String, Number],
      default: 1080,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    autoScale: {
      type: [Object, Boolean],
      default: true,
    },
    selfAdaption: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 500,
    },
    boxStyle: {
      type: Object,
      default: () => ({}),
    },
    wrapperStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentWidth: 0,
      currentHeight: 0,
      originalWidth: 0,
      originalHeight: 0,
      onResize: null,
      observer: null,
    };
  },
  watch: {
    selfAdaption(val) {
      val ? (this.resize(), this.addListener()) : (this.clearListener(), this.clearStyle());
    },
  },
  computed: {
    screenWrapper() {
      return this.$refs["screenWrapper"];
    },
  },
  methods: {
    initSize() {
      return new Promise((resolve) => {
        this.screenWrapper.parentNode.style.overflow = "hidden";
        this.screenWrapper.parentNode.scrollLeft = 0;
        this.screenWrapper.parentNode.scrollTop = 0;

        this.$nextTick(() => {
          this.currentWidth = this.width || this.screenWrapper.clientWidth;
          this.currentHeight = this.height || this.screenWrapper.clientHeight;
          if (!this.originalHeight || !this.originalWidth) {
            this.originalWidth = window.screen.width;
            this.originalHeight = window.screen.height;
          }
          resolve();
        });
      });
    },
    updateSize() {
      this.screenWrapper.style.width = `${this.currentWidth || this.originalWidth}px`;
      this.screenWrapper.style.height = `${this.currentHeight || this.originalHeight}px`;
    },
    handleAutoScale(scale) {
      if (!this.autoScale) return;
      const screenWrapper = this.screenWrapper;
      const domWidth = screenWrapper.clientWidth;
      const domHeight = screenWrapper.clientHeight;
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      screenWrapper.style.transform = `scale(${scale},${scale}) `;
      let mx = Math.max((currentWidth - domWidth * scale) / 2, 0);
      let my = Math.max((currentHeight - domHeight * scale) / 2, 0);
      if (typeof this.autoScale === "object") {
        !this.autoScale.x && (mx = 0);
        !this.autoScale.y && (my = 0);
      }
      this.screenWrapper.style.margin = `${my}px ${mx}px`;
    },
    updateScale() {
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      const realWidth = this.currentWidth || this.originalWidth;
      const realHeight = this.currentHeight || this.originalHeight;
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;

      if (this.fullScreen) {
        this.screenWrapper.style.transform = `scale(${widthScale},${heightScale})`;
      } else {
        const scale = Math.min(widthScale, heightScale);
        this.handleAutoScale(scale);
      }
    },
    initMutationObserver() {
      const observer = (this.observer = new MutationObserver(() => {
        this.onResize();
      }));
      observer.observe(this.screenWrapper, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });
    },
    clearListener() {
      window.removeEventListener("resize", this.onResize);
    },
    addListener() {
      window.addEventListener("resize", this.onResize);
    },
    clearStyle() {
      this.screenWrapper.parentNode.style.overflow = "auto";
      this.screenWrapper.style = "";
    },
    async resize() {
      if (!this.selfAdaption) return;
      await this.initSize();
      this.updateSize();
      this.updateScale();
    },
  },
  mounted() {
    this.onResize = debounce(() => this.resize(), this.delay);
    this.$nextTick(() => {
      if (this.selfAdaption) {
        this.resize();
        this.addListener();
      }
    });
  },
  beforeDestroy() {
    this.clearListener();
  },
};
</script>

<style scoped>
.screen-box {
  overflow: hidden;
  background-size: 100% 100%;
  background: #000;
  width: 100vw;
  height: 100vh;
}

.screen-wrapper {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  position: relative;
  overflow: hidden;
  z-index: 100;
  transform-origin: left top;
}
</style>