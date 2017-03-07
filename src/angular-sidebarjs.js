(function () {

  class SidebarJSCtrl {
    /* @ngInject */
    constructor($scope, $element, SidebarJS) {
      this._$scope = $scope;
      this._SidebarJS = SidebarJS;
      this.elem = $element[0];
    }

    $onInit() {
      this.elem.setAttribute('sidebarjs', '');
    }

    $postLink() {
      const [container, background] = this.elem.children;
      this._SidebarJS.init({
        component: this.elem,
        container,
        background,
      });

      let wasVisible = false;
      container.addEventListener('transitionend', () => {
        const isVisible = this._SidebarJS.isVisible();
        if (this.onOpen && isVisible && !wasVisible) {
          wasVisible = true;
          this.onOpen();
        } else if (this.onClose && !isVisible && wasVisible) {
          wasVisible = false;
          this.onClose();
        }
        this._$scope.$applyAsync();
      }, false);
    }
  }

  /* @ngInject */
  function SidebarJSFactory() {
    const _SidebarJS = require('sidebarjs');
    let instance;
    return {
      init: options => instance = new _SidebarJS(options),
      open: () => instance.open(),
      close: () => instance.close(),
      toggle: () => instance.toggle(),
      isVisible: () => instance.isVisible(),
      elemHasListener: _SidebarJS.elemHasListener,
    };
  }

  function SidebarJSDirective(action) {
    return {
      /* @ngInject */
      controller: function ctrl(SidebarJS) {
        this.SidebarJS = SidebarJS;
      },
      link: function link(scope, elem, attrs, ctrl) {
        if (!ctrl.SidebarJS.elemHasListener(elem[0])) {
          elem[0].addEventListener('click', ctrl.SidebarJS[action]);
          ctrl.SidebarJS.elemHasListener(elem[0], true);
        }
      },
    };
  }

  angular
  .module('ngSidebarJS', [])
  .factory('SidebarJS', SidebarJSFactory)
  .component('sidebarjs', {
    template: '<div sidebarjs-container ng-transclude></div><div sidebarjs-background></div>',
    transclude: true,
    controller: SidebarJSCtrl,
    bindings: {
      onOpen: '&?',
      onClose: '&?',
    },
  })
  .directive('sidebarjsOpen', SidebarJSDirective.bind(null, 'open'))
  .directive('sidebarjsClose', SidebarJSDirective.bind(null, 'close'))
  .directive('sidebarjsToggle', SidebarJSDirective.bind(null, 'toggle'));
})();
