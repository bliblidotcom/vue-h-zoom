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
    <div :style="containerStyle"
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
</style>

<script src="./vue-h-zoom.js"></script>
