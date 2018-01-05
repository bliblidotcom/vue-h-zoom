# Installation

### Direct Download / CDN

https://unpkg.com/vue-h-zoom/dist/vue-h-zoom

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-h-zoom@0.0.0/dist/vue-h-zoom.js
 
Include vue-h-zoom after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-h-zoom/dist/vue-h-zoom.js"></script>
```

### NPM

    $ npm install vue-h-zoom

### Yarn

    $ yarn add vue-h-zoom

When used with a module system, you must explicitly install the `vue-h-zoom` via `Vue.use()`:

```javascript
import Vue from 'vue'
import VueHZoom from 'vue-h-zoom'

Vue.use(VueHZoom)
```

You don't need to do this when using global script tags.

### Dev Build

You will have to clone directly from GitHub and build `vue-h-zoom` yourself if
you want to use the latest dev build.

    $ git clone https://github.com/hidayat.febiansyah/vue-h-zoom.git node_modules/vue-h-zoom
    $ cd node_modules/vue-h-zoom
    $ npm install
    $ npm run build
