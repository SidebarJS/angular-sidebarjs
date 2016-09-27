'use strict';

(function() {

  /* @ngInject */
  function SidebarCtrl($transclude, $element) {
    let transcludedContent;
    let transcludedScope;
    this.$onInit = onInit;
    this.$postLink = postLink;
    this.$onDestroy = onDestroy;

    function onInit() {
      $element[0].setAttribute('sidebarjs', '');
      let SidebarJS = require('SidebarJS');
      new SidebarJS();
    }

    function postLink() {
      $transclude((clone, scope) => {
        for(let i = 0; i < clone.length; i++) {
          $element[0].children[0].appendChild(clone[i]);
        }
        transcludedContent = clone;
        transcludedScope = scope;
        console.log(clone);
      });
    }

    function onDestroy() {
      transcludedScope.$destroy();
      transcludedScope = null;
    }
  }

  angular
    .module('angular-sidebarjs', [])
    .component('sidebarjs', {
      transclude: true,
      controller: SidebarCtrl
    });
})();
