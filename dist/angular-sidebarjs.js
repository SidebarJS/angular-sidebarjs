(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (sidebarjs) {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = sidebarjs;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return sidebarjs;
    });
  } else {
    window.SidebarJS = sidebarjs;
  }
})(function () {
  var sidebarjs = 'sidebarjs';
  var _isVisible = sidebarjs + '--is-visible';
  var isMoving = sidebarjs + '--is-moving';

  return function () {
    function SidebarJS() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SidebarJS);

      this.component = options.component || document.querySelector('[' + sidebarjs + ']');
      this.container = options.container || SidebarJS.create(sidebarjs + '-container');
      this.background = options.background || SidebarJS.create(sidebarjs + '-background');
      this.documentMinSwipeX = options.documentMinSwipeX || 10;
      this.documentSwipeRange = options.documentSwipeRange || 40;
      this.swipeOpen = options.swipeOpen !== false;

      if (!options.component && !options.container && !options.background) {
        this.container.innerHTML = this.component.innerHTML;
        this.component.innerHTML = '';
        this.component.appendChild(this.container);
        this.component.appendChild(this.background);
      }

      if (this.swipeOpen) {
        document.addEventListener('touchstart', this.onDocumentTouchStart.bind(this));
        document.addEventListener('touchmove', this.onDocumentTouchMove.bind(this));
        document.addEventListener('touchend', this.onDocumentTouchEnd.bind(this));
      }

      this.addAttrsEventsListeners();
      this.component.addEventListener('touchstart', this.onTouchStart.bind(this));
      this.component.addEventListener('touchmove', this.onTouchMove.bind(this));
      this.component.addEventListener('touchend', this.onTouchEnd.bind(this));
      this.background.addEventListener('click', this.close.bind(this));
    }

    _createClass(SidebarJS, [{
      key: 'addAttrsEventsListeners',
      value: function addAttrsEventsListeners() {
        var actions = ['toggle', 'open', 'close'];
        for (var i = 0; i < actions.length; i++) {
          var elements = document.querySelectorAll('[' + sidebarjs + '-' + actions[i] + ']');
          for (var j = 0; j < elements.length; j++) {
            if (!SidebarJS.elemHasListener(elements[j])) {
              elements[j].addEventListener('click', this[actions[i]].bind(this));
              SidebarJS.elemHasListener(elements[j], true);
            }
          }
        }
      }
    }, {
      key: 'onDocumentTouchStart',
      value: function onDocumentTouchStart(e) {
        if (e.touches[0].clientX < this.documentSwipeRange) {
          this.initialDocumentTouchX = e.touches[0].clientX;
          this.onTouchStart(e);
        }
      }
    }, {
      key: 'onDocumentTouchMove',
      value: function onDocumentTouchMove(e) {
        if (this.initialDocumentTouchX && !this.isVisible()) {
          var difference = e.touches[0].clientX - this.initialDocumentTouchX;
          if (difference > this.documentMinSwipeX) {
            this.movedDocumentTouchX = true;
            SidebarJS.vendorify(this.component, 'transform', 'translate(0, 0)');
            SidebarJS.vendorify(this.component, 'transition', 'none');
            this.onTouchMove(e);
          }
        }
      }
    }, {
      key: 'onDocumentTouchEnd',
      value: function onDocumentTouchEnd() {
        this.initialDocumentTouchX = 0;
        if (this.movedDocumentTouchX) {
          this.movedDocumentTouchX = 0;
          this.component.removeAttribute('style');
          this.onTouchEnd();
        }
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.component.classList.contains(_isVisible) ? this.close() : this.open();
      }
    }, {
      key: 'open',
      value: function open() {
        this.component.classList.add(_isVisible);
      }
    }, {
      key: 'close',
      value: function close() {
        this.component.classList.remove(_isVisible);
      }
    }, {
      key: 'onTouchStart',
      value: function onTouchStart(e) {
        this.container.touchStart = e.touches[0].pageX;
      }
    }, {
      key: 'onTouchMove',
      value: function onTouchMove(e) {
        this.container.touchMove = this.container.touchStart - e.touches[0].pageX;
        this.container.touchMoveDocument = e.touches[0].pageX - this.container.clientWidth;
        if (this.container.touchMove >= 0 || this.movedDocumentTouchX && this.container.touchMoveDocument <= 0) {
          this.component.classList.add(isMoving);
          var movement = this.movedDocumentTouchX ? this.container.touchMoveDocument : -this.container.touchMove;
          SidebarJS.vendorify(this.container, 'transform', 'translate(' + movement + 'px, 0)');
          var opacity = 0.3 - -movement / (this.container.clientWidth * 3.5);
          this.background.style.opacity = opacity.toString();
        }
      }
    }, {
      key: 'onTouchEnd',
      value: function onTouchEnd() {
        this.component.classList.remove(isMoving);
        this.container.touchMove > this.container.clientWidth / 3.5 ? this.close() : this.open();
        this.container.touchMove = 0;
        this.container.removeAttribute('style');
        this.background.removeAttribute('style');
      }
    }, {
      key: 'isVisible',
      value: function isVisible() {
        return this.component.classList.contains(_isVisible);
      }
    }], [{
      key: 'create',
      value: function create(element) {
        var el = document.createElement('div');
        el.setAttribute(element, '');
        return el;
      }
    }, {
      key: 'vendorify',
      value: function vendorify(el, prop, val) {
        var Prop = prop.charAt(0).toUpperCase() + prop.slice(1);
        var prefs = ['Moz', 'Webkit', 'O', 'ms'];
        el.style[prop] = val;
        for (var i = 0; i < prefs.length; i++) {
          el.style[prefs[i] + Prop] = val;
        }
        return el;
      }
    }, {
      key: 'elemHasListener',
      value: function elemHasListener(elem, value) {
        return elem && value ? elem.sidebarjsListener = value : elem.sidebarjsListener;
      }
    }, {
      key: 'version',
      get: function get() {
        return '1.7.1';
      }
    }]);

    return SidebarJS;
  }();
}());
},{}],2:[function(require,module,exports){
module.exports = require('./dist/sidebarjs.js');

},{"./dist/sidebarjs.js":1}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var SidebarJSCtrl = function () {
    /* @ngInject */
    SidebarJSCtrl.$inject = ["$scope", "$element", "SidebarJS"];
    function SidebarJSCtrl($scope, $element, SidebarJS) {
      _classCallCheck(this, SidebarJSCtrl);

      this._$scope = $scope;
      this._SidebarJS = SidebarJS;
      this.elem = $element[0];
    }

    _createClass(SidebarJSCtrl, [{
      key: '$onInit',
      value: function $onInit() {
        this.elem.setAttribute('sidebarjs', '');
      }
    }, {
      key: '$postLink',
      value: function $postLink() {
        var _this = this;

        var container = this.elem.children[0];
        var background = this.elem.children[1];
        this._SidebarJS.init({
          component: this.elem,
          container: container,
          background: background
        });

        var wasVisible = false;
        container.addEventListener('transitionend', function () {
          var isVisible = _this._SidebarJS.isVisible();
          if (_this.onOpen && isVisible && !wasVisible) {
            wasVisible = true;
            _this.onOpen();
          } else if (_this.onClose && !isVisible && wasVisible) {
            wasVisible = false;
            _this.onClose();
          }
          _this._$scope.$applyAsync();
        }, false);
      }
    }]);

    return SidebarJSCtrl;
  }();

  /* @ngInject */


  function SidebarJSFactory() {
    var _SidebarJS = require('sidebarjs');
    var instance = void 0;
    return {
      init: function init(options) {
        return instance = new _SidebarJS(options);
      },
      open: function open() {
        return instance.open();
      },
      close: function close() {
        return instance.close();
      },
      toggle: function toggle() {
        return instance.toggle();
      },
      isVisible: function isVisible() {
        return instance.isVisible();
      },
      elemHasListener: _SidebarJS.elemHasListener
    };
  }

  function SidebarJSDirective(action) {
    return {
      /* @ngInject */
      controller: ["SidebarJS", function ctrl(SidebarJS) {
        this.SidebarJS = SidebarJS;
      }],
      link: function link(scope, elem, attrs, ctrl) {
        if (!ctrl.SidebarJS.elemHasListener(elem[0])) {
          elem[0].addEventListener('click', ctrl.SidebarJS[action]);
          ctrl.SidebarJS.elemHasListener(elem[0], true);
        }
      }
    };
  }

  angular.module('ngSidebarJS', []).factory('SidebarJS', SidebarJSFactory).component('sidebarjs', {
    template: '<div sidebarjs-container ng-transclude></div><div sidebarjs-background></div>',
    transclude: true,
    controller: SidebarJSCtrl,
    bindings: {
      onOpen: '&?',
      onClose: '&?'
    }
  }).directive('sidebarjsOpen', SidebarJSDirective.bind(null, 'open')).directive('sidebarjsClose', SidebarJSDirective.bind(null, 'close')).directive('sidebarjsToggle', SidebarJSDirective.bind(null, 'toggle'));
})();

},{"sidebarjs":2}]},{},[3]);
