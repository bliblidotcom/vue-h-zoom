import Vue from 'vue'
import VueHZoom from '@/libs/VueHZoom.vue'

describe('VueHZoom', () => {
  let vm

  beforeEach(() => {
    vm = new (Vue.extend(VueHZoom))({
      propsData: {
        image: '/abc.jpg'
      }
    })
    vm.$mount()
  })

  describe('image', () => {
    it('should be /abc.jpg', () => {
      assert(vm.image === '/abc.jpg', 'You should be implemented!!')
    })
  })

  describe('imageFull', () => {
    it('should be \'\'', done => {
      nextTick(() => {
        assert(vm.imageFull === '', 'You should be implemented!!')
      }).then(done)
    })

    it('largeImage should be /abc.jpg', done => {
      vm = new (Vue.extend(VueHZoom))({
        propsData: {
          image: '/abc.jpg'
        }
      })

      nextTick(() => {
        assert(vm.largeImage === '/abc.jpg', 'You should be implemented!!')
      }).then(done)
    })

    it('largeImage should be /abc_full.jpg', done => {
      vm = new (Vue.extend(VueHZoom))({
        propsData: {
          image: '/abc.jpg',
          imageFull: '/abc_full.jpg'
        }
      })

      nextTick(() => {
        assert(vm.largeImage === '/abc_full.jpg', 'You should be implemented!!')
      }).then(done)
    })
  })

  describe('toPx', () => {
    it('should add px', () => {
      assert(vm.toPx(123) === '123px')
    })
  })

  describe('mouse Enter / leave', () => {
    it('enter: zoom should be visible', () => {
      vm.visibleZoom = false
      vm.mouseEnter()
      assert(vm.visibleZoom === true)
    })
    it('enter: zoom should be not visible', () => {
      vm.visibleZoom = true
      vm.mouseLeave()
      assert(vm.visibleZoom === false)
    })
  })

  describe('followMouse', () => {
    it('should be obtaining event location in page', () => {
      const loc = {
        pageX: 144,
        pageY: 134
      }
      const expectedLoc = {
        x: 144,
        y: 134
      }
      vm.followMouse(loc)

      assert.deepEqual(vm.pointer, expectedLoc)
    })
  })

  describe('updateThumbnailPos', () => {
    it('should be correct', () => {
      vm.updateThumbnailPos()

      const el = vm.$refs.thumbnail
      const loc = {
        top: el.offsetTop,
        left: el.offsetLeft
      }
      assert.deepEqual(vm.thumbnailPos, loc)
    })
  })

  describe('zoom dimensions', () => {
    it('should multiply thumbnail dimension', () => {
      assert((vm.zoomWindowSize * vm.width) === vm.zoomWidth)
      assert((vm.zoomWindowSize * vm.height) === vm.zoomHeight)
    })
  })

  describe('mainImgStyle', () => {
    it('should have correct values when backgroundOptions is falsy', () => {
      const expected = {
        contain: 'cover',
        repeat: 'no-repeat',
        position: '50% 50%'
      }
      assert.deepEqual(vm.mainImgStyle, expected)
    })

    it('should have correct values when backgroundOptions is truthy', done => {
      vm = new (Vue.extend(VueHZoom))({
        propsData: {
          image: '/abc.jpg',
          backgroundOptions: true
        }
      })
      const expected = {
        contain: 'contain',
        repeat: 'no-repeat',
        position: '50% 50%'
      }
      nextTick(() => {
        assert.deepEqual(vm.mainImgStyle, expected)
      }).then(done)
    })
  })

  describe('customBackgroundOptions', () => {
    it('should have correct values when backgroundOptions is falsy', () => {
      const expected = {
        image: 'none',
        color: '#fff',
        repeat: false,
        size: '100%',
        position: 'top left'
      }
      assert.deepEqual(vm.customBackgroundOptions, expected)
    })

    it('should have correct values when backgroundOptions is truthy', done => {
      vm = new (Vue.extend(VueHZoom))({
        propsData: {
          image: '/abc.jpg',
          backgroundOptions: {
            color: 'blue'
          }
        }
      })
      const expected = {
        color: 'blue'
      }
      nextTick(() => {
        assert.deepEqual(vm.customBackgroundOptions, expected)
      }).then(done)
    })
  })

  describe('customBackgroundStyle', () => {
    it('should have correct values when backgroundOptions prop is truthy but has no properties', () => {
      vm = new (Vue.extend(VueHZoom))({
        propsData: {
          image: '/abc.jpg',
          backgroundOptions: {
            image: '/asd.jpg',
            repeat: true,
            color: 'blue',
            size: '50% 100%',
            position: 'top left'
          }
        }
      })
      const expected = {
        image: '/asd.jpg',
        repeat: 'repeat',
        color: 'blue',
        size: '50% 100%',
        position: 'top left'
      }
      assert.deepEqual(vm.customBackgroundStyle, expected)
    })

    it('should have correct values when backgroundOptions is truthy', done => {
      vm = new (Vue.extend(VueHZoom))({
        propsData: {
          image: '/abc.jpg',
          backgroundOptions: {}
        }
      })
      const expected = {
        image: 'none',
        color: '#fff',
        repeat: 'no-repeat',
        size: '100%',
        position: 'top left'
      }
      nextTick(() => {
        assert.deepEqual(vm.customBackgroundStyle, expected)
      }).then(done)
    })
  })

  describe('thumbnailStyle', () => {
    it('should have correct values', () => {
      vm.height = 1000
      vm.width = 100
      const expected = {
        'background-image': `url("${vm.image}"), url("${vm.customBackgroundStyle.image}")`,
        'background-size': `${vm.mainImgStyle.contain}, ${vm.customBackgroundStyle.size}`,
        'background-repeat': `${vm.mainImgStyle.repeat}, ${vm.customBackgroundStyle.repeat}`,
        'background-position': `${vm.mainImgStyle.position}, ${vm.customBackgroundStyle.position}`,
        'background-color': vm.customBackgroundStyle.color,
        height: vm.toPx(1000),
        width: vm.toPx(100)
      }
      assert.deepEqual(vm.thumbnailStyle, expected)
    })
  })

  describe('containerStyle', () => {
    it('should have correct values', () => {
      const expected = {
        height: vm.toPx(vm.zoomHeight),
        width: vm.toPx(vm.zoomWidth),
        left: vm.toPx(vm.zoomWindowX),
        top: vm.toPx(vm.zoomWindowY),
        position: 'absolute',
        overflow: 'hidden',
        border: '1px solid #ccc'
      }
      assert.deepEqual(vm.containerStyle, expected)
    })
  })

  describe('zoomPosX', () => {
    it('should calculate correctly', () => {
      vm.width = 400
      vm.height = 500
      vm.pointer = {
        x: 200,
        y: 300
      }
      vm.thumbnailPos = {
        left: 50,
        top: 100
      }
      vm.zoomLevel = 2
      vm.zoomWindowSize = 3
      assert.deepEqual(vm.zoomPosX, 150)
    })
  })

  describe('zoomPosY', () => {
    it('should calculate correctly', () => {
      vm.width = 400
      vm.height = 500
      vm.pointer = {
        x: 200,
        y: 300
      }
      vm.thumbnailPos = {
        left: 50,
        top: 100
      }
      vm.zoomLevel = 2
      vm.zoomWindowSize = 3
      assert.deepEqual(vm.zoomPosY, 150)
    })
  })

  describe('pointerWidth', () => {
    it('should calculate correctly', () => {
      vm.width = 400
      vm.zoomLevel = 2
      assert.deepEqual(vm.pointerWidth, 200)
    })
  })

  describe('pointerHeight', () => {
    it('should calculate correctly', () => {
      vm.height = 100
      vm.zoomLevel = 2
      assert.deepEqual(vm.pointerHeight, 50)
    })
  })

  describe('pointerOffsetTop', () => {
    it('should calculate correctly', () => {
      vm.height = 100
      vm.zoomLevel = 2
      vm.pointer = {
        x: 200,
        y: 300
      }
      vm.thumbnailPos = {
        left: 50,
        top: 100
      }
      assert.deepEqual(vm.pointerOffsetTop, 50)
    })
  })

  describe('pointerOffsetLeft', () => {
    it('should calculate correctly', () => {
      vm.height = 100
      vm.zoomLevel = 2
      vm.pointer = {
        x: 200,
        y: 300
      }
      vm.thumbnailPos = {
        left: 50,
        top: 100
      }
      assert.deepEqual(vm.pointerOffsetLeft, 100)
    })
  })

  describe('pointerEdgeX', () => {
    it('should calculate correctly', () => {
      vm.width = 400
      vm.zoomLevel = 2
      assert.deepEqual(vm.pointerEdgeX, 200)
    })
  })

  describe('pointerEdgeY', () => {
    it('should calculate correctly', () => {
      vm.height = 400
      vm.zoomLevel = 2
      assert.deepEqual(vm.pointerEdgeY, 200)
    })
  })

  describe('zoomStyle', () => {
    it('should calculate correctly', () => {
      vm.width = 400
      vm.height = 500
      vm.pointer = {
        x: 200,
        y: 300
      }
      vm.thumbnailPos = {
        left: 50,
        top: 100
      }
      vm.zoomWindowSize = 3
      // the position of mouse, relative to the element, and multiply by window size, because it will be reflected
      // in zoom window
      const posX = -(200 - 50 - 200) * 3
      const posY = -(300 - 100 - 250) * 3

      const expected = {
        'background-image': `url("${vm.largeImage}"), url("${vm.customBackgroundStyle.image}")`,
        'background-size': `${vm.mainImgStyle.contain}, ${vm.customBackgroundStyle.size}`,
        'background-repeat': `${vm.mainImgStyle.repeat}, ${vm.customBackgroundStyle.repeat}`,
        'background-position': `${vm.mainImgStyle.position}, ${vm.customBackgroundStyle.position}`,
        'background-color': vm.customBackgroundStyle.color,
        width: '100%',
        height: '100%',
        '-webkit-transform': `scale(${vm.zoomLevel})`,
        transform: `
          scale(${vm.zoomLevel})
          translate(${vm.toPx(posX)}, ${vm.toPx(posY)})
        `
      }

      assert.deepEqual(vm.zoomStyle, expected)
    })
  })

  describe('pointerBoxStyle', () => {
    it('should calculate correctly', () => {
      vm.width = 600
      vm.height = 800
      vm.zoomLevel = 8
      const width = vm.width / vm.zoomLevel
      const height = vm.height / vm.zoomLevel

      // set zoom lense offset
      vm.pointer = {
        x: 200,
        y: 300
      }
      vm.thumbnailPos = {
        left: 50,
        top: 100
      }

      // position after padding the margin
      const top = 300 - (height / 2) - 100
      const left = 200 - (width / 2) - 50
      const expected = {
        position: 'absolute',
        'z-index': '2',
        transform: 'translateZ(0px)',
        top: vm.toPx(top),
        left: vm.toPx(left),
        width: vm.toPx(width),
        height: vm.toPx(height),
        background: 'gray',
        opacity: 0.5,
        border: '1px solid white',
        cursor: 'crosshair'
      }

      assert.deepEqual(vm.pointerBoxStyle, expected)
    })
  })
})

