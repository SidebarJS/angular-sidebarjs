# Angular SidebarJS (AngularJS v1.x)
Create mobile sidebar/sidenav experiance in AngularJS.
> Are you looking for a version with Angular? Try [ng-sidebarjs](https://github.com/SidebarJS/ng-sidebarjs)

```ssh
npm install angular-sidebarjs --save
```

## Demo
*Open the demo on your device and try the touch gestures!*

* [RawGit](https://rawgit.com/SidebarJS/angular-sidebarjs/master/demo/index.html)

## Installation
Classic
```html
<script src="your/path/angular-sidebarjs.js"></script>
```

Require
```js
require('angular-sidebarjs');
```

ES6
```js
import ngSidebarJS from 'angular-sidebarjs';
```

## Options
```html
<sidebarjs
  // Optional | required only for multiple sidebarjs
  sidebarjs-name="mainSidebarJS"
  
  // Optional
  sidebarjs-config="{
      // Minimum swipe in px required to trigger listener: open
      documentMinSwipeX?: 10,
      // Range in px where document is listening for gesture: open
      documentSwipeRange?: 40,
      // Open and close sidebar with swipe gestures
      nativeSwipe?: true,
      // Enable/Disable open on swipe
      nativeSwipeOpen?: true,
      // Sidebar position, accepted values: left|right
      position?: 'left',
      // Backdrop opacity on sidebar open
      backdropOpacity?: 0.3,
  }"
  
  // Optional | Function called after sidebar is open
  on-close="app.onSidebarClose()"
  
  // Optional | Function called after sidebar is close
  on-open="app.onSidebarOpen()"
  
  // Optional | Function called when sidebar change visibility
  on-change-visibility="app.onSidebarChangeVisibility($event)">
</sidebarjs>
```

## Implementation
### Download files
Download and save all files
```ssh
$ npm install angular-sidebarjs --save
```

Insert _angular-sidebarjs.min.css_ and _angular-sidebarjs.min.js_ in your index.html.

```html
<head>

  <link rel="stylesheet" href="your/path/angular-sidebarjs.min.css">

</head>
<body>

  <script src="your/path/angular-sidebarjs.min.js"></script>

</body>
```

### Inject ngSidebarJS
```js
angular
  .module('DemoApp', [
    'ngSidebarJS'
  ])
```

### Create SidebarJS element
Write **sidebarjs** tag and a trigger button with just **[sidebarjs-toggle]** attribute.
```html
<body ng-app="DemoApp">

  <button sidebarjs-toggle>Open/Close</button>

  <sidebarjs>
    <div>Title</div>
    <nav>
      <a href="link">Home</a>
      <a href="link">About</a>
      <a href="link">Contacts</a>
    </nav>
  </sidebarjs>

</body>
```
