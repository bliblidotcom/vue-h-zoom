const DEFAULT_BACKGROUND_OPTIONS = {
  image: 'none',
  color: '#fff',
  repeat: false,
  size: '100%',
  position: 'top left'
}

export default {
  name: 'vue-h-zoom',
  props: {
    image: {
      type: String,
      required: true
    },
    imageFull: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    zoomLevel: {
      type: Number,
      default: 4
    },
    zoomWindowSize: {
      type: Number,
      default: 2
    },
    zoomWindowX: {
      type: Number,
      default: 300
    },
    zoomWindowY: {
      type: Number,
      default: 10
    },
    backgroundOptions: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      visibleZoom: false,
      pointer: {
        x: 0,
        y: 0
      },
      thumbnailPos: {}
    }
  },
  methods: {
    toPx: function (v) {
      return v + 'px'
    },
    mouseEnter: function () {
      this.updateThumbnailPos()
      this.visibleZoom = true
    },
    mouseLeave: function () {
      this.visibleZoom = false
    },
    followMouse: function (e) {
      this.pointer = {
        x: e.pageX - this.$refs.thumbnail.getBoundingClientRect().left - window.scrollX,
        y: e.pageY - this.$refs.thumbnail.getBoundingClientRect().top - window.scrollY
      }
    },
    updateThumbnailPos: function () {
      const el = this.$refs.thumbnail
      this.thumbnailPos = {
        top: el.offsetTop,
        left: el.offsetLeft
      }
    }
  },
  computed: {
    zoomWidth: function () {
      return this.zoomWindowSize * this.width
    },
    zoomHeight: function () {
      return this.zoomWindowSize * this.height
    },
    mainImgStyle: function () {
      return {
        contain: this.backgroundOptions ? 'contain' : 'cover',
        repeat: 'no-repeat',
        position: '50% 50%'
      }
    },
    customBackgroundOptions: function () {
      return this.backgroundOptions ? this.backgroundOptions : DEFAULT_BACKGROUND_OPTIONS
    },
    customBackgroundStyle: function () {
      return {
        image: this.customBackgroundOptions.image || DEFAULT_BACKGROUND_OPTIONS.image,
        repeat: this.customBackgroundOptions.repeat ? 'repeat' : 'no-repeat',
        color: this.customBackgroundOptions.color || DEFAULT_BACKGROUND_OPTIONS.color,
        size: this.customBackgroundOptions.size || DEFAULT_BACKGROUND_OPTIONS.size,
        position: this.customBackgroundOptions.position || DEFAULT_BACKGROUND_OPTIONS.position
      }
    },
    thumbnailStyle: function () {
      return {
        'background-image': `url("${this.image}"), url("${this.customBackgroundStyle.image}")`,
        'background-size': `${this.mainImgStyle.contain}, ${this.customBackgroundStyle.size}`,
        'background-repeat': `${this.mainImgStyle.repeat}, ${this.customBackgroundStyle.repeat}`,
        'background-position': `${this.mainImgStyle.position}, ${this.customBackgroundStyle.position}`,
        'background-color': this.customBackgroundStyle.color,
        height: this.toPx(this.height),
        width: this.toPx(this.width)
      }
    },
    containerStyle: function () {
      return {
        height: this.toPx(this.zoomHeight),
        width: this.toPx(this.zoomWidth),
        left: this.toPx(this.zoomWindowX),
        top: this.toPx(this.zoomWindowY),
        position: 'absolute',
        overflow: 'hidden',
        border: '1px solid #ccc'
      }
    },
    zoomPosX: function () {
      const xPad = this.width / 2
      const posX = -(this.pointer.x - this.thumbnailPos.left - xPad) * this.zoomWindowSize
      if (posX > this.pointerEdgeX) return this.pointerEdgeX
      if (posX < (this.pointerEdgeX * -1)) return (this.pointerEdgeX * -1)
      return posX
    },
    zoomPosY: function () {
      const yPad = (this.height / 2)
      const posY = -(this.pointer.y - this.thumbnailPos.top - yPad) * this.zoomWindowSize
      if (posY > this.pointerEdgeY) return this.pointerEdgeY
      if (posY < (this.pointerEdgeY * -1)) return (this.pointerEdgeY * -1)
      return posY
    },
    zoomStyle: function () {
      return {
        'background-image': `url("${this.largeImage}"), url("${this.customBackgroundStyle.image}")`,
        'background-size': `${this.mainImgStyle.contain}, ${this.customBackgroundStyle.size}`,
        'background-repeat': `${this.mainImgStyle.repeat}, ${this.customBackgroundStyle.repeat}`,
        'background-position': `${this.mainImgStyle.position}, ${this.customBackgroundStyle.position}`,
        'background-color': this.customBackgroundStyle.color,
        width: '100%',
        height: '100%',
        '-webkit-transform': `scale(${this.zoomLevel})`,
        transform: `
          scale(${this.zoomLevel})
          translate(${this.toPx(this.zoomPosX)}, ${this.toPx(this.zoomPosY)})
        `
      }
    },
    pointerWidth: function () {
      return this.width / this.zoomLevel
    },
    pointerHeight: function () {
      return this.height / this.zoomLevel
    },
    pointerOffsetTop: function () {
      const top = this.pointer.y - (this.pointerHeight / 2) - this.thumbnailPos.top
      if (top < 0) return 0
      if (top > (this.height - this.pointerHeight)) return (this.height - this.pointerHeight)
      return top
    },
    pointerOffsetLeft: function () {
      const left = this.pointer.x - (this.pointerWidth / 2) - this.thumbnailPos.left
      if (left < 0) return 0
      if (left > (this.width - this.pointerWidth)) return (this.width - this.pointerWidth)
      return left
    },
    pointerEdgeX: function () {
      // you have to bound it within the reduced with from pointerwidth multiplied by half zoom window size
      return (this.width - this.pointerWidth) * (this.zoomWindowSize / 2)
    },
    pointerEdgeY: function () {
      return (this.height - this.pointerHeight) * (this.zoomWindowSize / 2)
    },
    pointerBoxStyle: function () {
      return {
        position: 'absolute',
        'z-index': '2',
        transform: 'translateZ(0px)',
        top: this.toPx(this.pointerOffsetTop),
        left: this.toPx(this.pointerOffsetLeft),
        width: this.toPx(this.pointerWidth),
        height: this.toPx(this.pointerHeight),
        background: 'gray',
        opacity: 0.5,
        border: '1px solid white',
        cursor: 'crosshair'
      }
    },
    largeImage: function () {
      return this.imageFull || this.image
    }
  }
}
