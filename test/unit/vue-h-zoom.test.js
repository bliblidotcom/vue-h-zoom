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
})

