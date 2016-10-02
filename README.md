# Angular SidebarJS
Create mobile sidebar/sidenav experiance in angular.

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
