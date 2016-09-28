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
  var isVisible = sidebarjs + '--is-visible';
  var isMoving = sidebarjs + '--is-moving';

  return function () {
    function SidebarJS() {
      _classCallCheck(this, SidebarJS);

      this.component = document.querySelector('[' + sidebarjs + ']');
      this.container = SidebarJS.create(sidebarjs + '-container');
      this.background = SidebarJS.create(sidebarjs + '-background');

      this.container.innerHTML = this.component.innerHTML;
      this.component.innerHTML = '';
      this.component.appendChild(this.container);
      this.component.appendChild(this.background);

      var _actions = ['toggle', 'open', 'close'];
      for (var i = 0; i < _actions.length; i++) {
        var _elements = document.querySelectorAll('[' + sidebarjs + '-' + _actions[i] + ']');
        for (var j = 0; j < _elements.length; j++) {
          _elements[j].addEventListener('click', this[_actions[i]].bind(this));
        }
      }

      this.component.addEventListener('touchstart', this.onTouchStart.bind(this));
      this.component.addEventListener('touchmove', this.onTouchMove.bind(this));
      this.component.addEventListener('touchend', this.onTouchEnd.bind(this));
      this.background.addEventListener('click', this.close.bind(this));
    }

    _createClass(SidebarJS, [{
      key: 'toggle',
      value: function toggle() {
        this.component.classList.contains(isVisible) ? this.close() : this.open();
      }
    }, {
      key: 'open',
      value: function open() {
        this.component.classList.add(isVisible);
      }
    }, {
      key: 'close',
      value: function close() {
        this.component.classList.remove(isVisible);
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
        if (this.container.touchMove > 0) {
          this.component.classList.add(isMoving);
          SidebarJS.vendorify(this.container, 'transform', 'translate(' + -this.container.touchMove + 'px, 0)');
          var opacity = 0.3 - this.container.touchMove / (this.container.clientWidth * 3.5);
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
      key: 'version',
      get: function get() {
        return '1.5.0';
      }
    }]);

    return SidebarJS;
  }();
}());
},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

  /* @ngInject */
  var SidebarCtrl = function () {
    /* @ngInject */
    SidebarCtrl.$inject = ["$transclude", "$element", "SidebarJS"];
    function SidebarCtrl($transclude, $element, SidebarJS) {
      _classCallCheck(this, SidebarCtrl);

      this.elem = $element[0];
      this.transclude = $transclude;
      this.SidebarJS = SidebarJS;
      this.transcludedContent;
      this.transcludedScope;
    }

    _createClass(SidebarCtrl, [{
      key: '$onInit',
      value: function $onInit() {
        this.elem.setAttribute('sidebarjs', '');
        this.SidebarJS.init();
      }
    }, {
      key: '$postLink',
      value: function $postLink() {
        var _this = this;

        this.transclude(function (clone, scope) {
          for (var i = 0; i < clone.length; i++) {
            _this.elem.children[0].appendChild(clone[i]);
          }
          _this.transcludedContent = clone;
          _this.transcludedScope = scope;
        });
      }
    }, {
      key: '$onDestroy',
      value: function $onDestroy() {
        this.transcludedScope.$destroy();
        this.transcludedScope = this.transcludedContent = null;
      }
    }]);

    return SidebarCtrl;
  }();

  /* @ngInject */


  function SidebarJS() {
    var instance = void 0;

    return Object.create({ init: init }, {
      open: { writable: false, configurable: false, enumerable: false, value: open },
      close: { writable: false, configurable: false, enumerable: false, value: close },
      toggle: { writable: false, configurable: false, enumerable: false, value: toggle }
    });

    function init() {
      var SIDEBAR_JS = window.SidebarJS || require('sidebarjs');
      instance = new SIDEBAR_JS();
      SIDEBAR_JS = null;
    }

    function open() {
      instance.open();
    }

    function close() {
      instance.close();
    }

    function toggle() {
      instance.toggle();
    }
  }

  angular.module('angular-sidebarjs', []).component('sidebarjs', { transclude: true, controller: SidebarCtrl }).factory('SidebarJS', SidebarJS);
})();

},{"sidebarjs":1}]},{},[2]);
