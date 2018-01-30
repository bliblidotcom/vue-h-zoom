# vue-h-zoom


[![codecov](https://codecov.io/gh/hidayat.febiansyah/vue-h-zoom/branch/dev/graph/badge.svg)](https://codecov.io/gh/hidayat.febiansyah/vue-h-zoom)
[![npm](https://img.shields.io/npm/v/vue-h-zoom.svg)](https://www.npmjs.com/package/vue-h-zoom)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Vue Native Zoom images

## Installation

```js
npm i --save-dev vue-h-zoom
```

## About

This plugin is intended to provide native implementation of zooming library. It support thumbnail image and full size
image as parameter. Location of zooming preview is configurable through absolute location.

### Browser

Include the script file, then install the component with `Vue.use(VueHZoom);` e.g.:

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-h-zoom/dist/vue-h-zoom.min.js"></script>
<script type="text/javascript">
  Vue.use(VueHZoom);
</script>
```

### Module

```js
import VueHZoom from 'vue-h-zoom';
```

## Usage

Use in template for example as:

```html
<vue-h-zoom image="/assets/bugatti-chiron-white_01_thumb.jpg"
  image-full="/assets/bugatti-chiron-white_01.jpg"
  :zoom-level="4"></vue-h-zoom>
```

## Parameters

| Attribute        | Type                                            | Default              | Description      |
| :---             | :---:                                           | :---:                | :---             |
| image            | String | - | Image to be displayed in thumbnail. Used also in the zoom if imageFull param is not given (required) |
| image-full       | String                                          | ''       | Large version of image|
| width           | Number                                           | 200 | Width of thumbnail in px|
| height          | Number                                           | 200 | Height of thumbnail in px|
| zoom-level      | Number                                           | 4 | Zoom level |
| -size | Number                                          | 2 | Zoom window size multiplier, relative with thumbnail size |
| zoom-window-x | Number                                        | 300 | Location absolute on x-axis for zoom window |
| zoom-window-y | Number                                        | 300 | Location absolute on y-axis for zoom window |

## image

<p align="center">
  <img src="https://raw.githubusercontent.com/bliblidotcom/vue-h-zoom/master/docs/vue-h-zoom-preview.jpg">
</p>


## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
