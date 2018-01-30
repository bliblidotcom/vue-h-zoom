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
    }
  },
  data () {
    return {
      visibleZoom: true,
      pointer: {
        x: 0,
        y: 0
      },
      thumbnailPos: {}
    }
  },
  mounted () {
    this.updateThumbnailPos()
    window.addEventListener('resize', this.updateThumbnailPos)
    // second call to make sure the location is updated
    // one thousan ms is just a guess for safety
    setTimeout(() => {
      this.updateThumbnailPos()
    }, 1000)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.updateThumbnailPos)
  },
  methods: {
    toPx: function (v) {
      return v + 'px'
    },
    mouseEnter: function () {
      this.visibleZoom = true
    },
    mouseLeave: function () {
      this.visibleZoom = false
    },
    followMouse: function (e) {
      this.pointer = {
        x: e.pageX,
        y: e.pageY
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
    thumbnailStyle: function () {
      return {
        'background-image': `url(${this.image})`,
        'background-size': 'cover',
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
        overflow: 'hidden'
      }
    },
    zoomStyle: function () {
      const xPad = this.width / 2
      const yPad = this.height / 2
      const posX = -(this.pointer.x - this.thumbnailPos.left - xPad) * this.zoomWindowSize
      const posY = -(this.pointer.y - this.thumbnailPos.top - yPad) * this.zoomWindowSize
      return {
        'background-image': `url(${this.largeImage})`,
        'background-repeat': 'no-repeat',
        'background-position': this.toPx(posX) + ' ' + this.toPx(posY),
        'background-size': 'cover',
        width: '100%',
        height: '100%',
        '-webkit-transform': `scale(${this.zoomLevel})`,
        transform: `scale(${this.zoomLevel})`
      }
    },
    pointerBoxStyle: function () {
      const width = this.width / this.zoomLevel
      const height = this.height / this.zoomLevel
      const top = this.pointer.y - (height / 2) - this.thumbnailPos.top
      const left = this.pointer.x - (width / 2) - this.thumbnailPos.left
      return {
        position: 'absolute',
        'z-index': '999',
        transform: 'translateZ(0px)',
        top: this.toPx(top),
        left: this.toPx(left),
        width: this.toPx(width),
        height: this.toPx(height),
        background: 'gray',
        opacity: 0.3,
        border: '1px solid white',
        cursor: 'crosshair'
      }
    },
    largeImage: function () {
      return this.imageFull || this.image
    }
  }
}
