<template>
  <div class="vue-h-zoom">
    <div class="thumbnail-area"
         ref="thumbnail"
         :style="thumbnailStyle"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave"
         @mousemove.self="followMouse">
      <div :style="pointerBoxStyle"
           @mouseenter="mouseEnter"
           @mousemove.self = "followMouse"
           v-if="visibleZoom"></div>
    </div>
    <div :style="containerStyle" class="img-zoom-container"
         v-if="visibleZoom">
      <div :style="zoomStyle"></div>
    </div>
  </div>
</template>

<style scoped>
  .thumbnail-area {
    overflow: hidden;
    position: relative;
  }
  .img-zoom-container {
    -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
    z-index: 999;
  }
</style>

<script src="./vue-h-zoom.js"></script>
