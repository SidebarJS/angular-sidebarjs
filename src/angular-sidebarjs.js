'use strict';

(function() {

  /* @ngInject */
  class SidebarCtrl {
    /* @ngInject */
    constructor($transclude, $element, SidebarJS) {
      this.elem = $element[0];
      this.transclude = $transclude;
      this.SidebarJS = SidebarJS;
      this.transcludedContent;
      this.transcludedScope;
    }

    $onInit() {
      this.elem.setAttribute('sidebarjs', '');
      this.SidebarJS.init();
    }

    $postLink() {
      this.transclude((clone, scope) => {
        for(let i = 0; i < clone.length; i++) {
          this.elem.children[0].appendChild(clone[i]);
        }
        this.transcludedContent = clone;
        this.transcludedScope = scope;
      });
    }

    $onDestroy() {
      this.transcludedScope.$destroy();
      this.transcludedScope = this.transcludedContent = null;
    }
  }

  /* @ngInject */
  function SidebarJS() {
    let instance;

    return Object.create({init}, {
      open: {writable: false, configurable: false, enumerable: false, value: open},
      close: {writable: false, configurable: false, enumerable: false, value: close},
      toggle: {writable: false, configurable: false, enumerable: false, value: toggle}
    });

    function init() {
      let SIDEBAR_JS = window.SidebarJS || require('sidebarjs');
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

  angular
    .module('angular-sidebarjs', [])
    .component('sidebarjs', {transclude: true,controller: SidebarCtrl})
    .factory('SidebarJS', SidebarJS);
})();
