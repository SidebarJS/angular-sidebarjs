import {SidebarService} from 'sidebarjs';

class SidebarJSCtrl {
  /* @ngInject */
  constructor($scope, $element, SidebarJS) {
    this.$scope = $scope;
    this.SidebarJS = SidebarJS;
    this.elem = $element[0];
  }

  $onInit() {
    this.sidebarjsName = this.sidebarjsName || '';
    this.elem.setAttribute('sidebarjs', this.sidebarjsName);
  }

  $postLink() {
    const container = this.elem.children[0];
    const background = this.elem.children[1];
    const config = {...this.sidebarjsConfig, component: this.elem, container, background};
    this.SidebarJS.create(config);
    this.addTransitionListener(container);
  }

  $onDestroy() {
    this.SidebarJS.destroy(this.sidebarjsName);
  }

  addTransitionListener(container) {
    let wasVisible = false;
    container.addEventListener('transitionend', () => {
      const isVisible = this.SidebarJS.isVisible(this.sidebarjsName);
      if (this.onOpen && isVisible && !wasVisible) {
        wasVisible = true;
        this.onOpen();
      } else if (this.onClose && !isVisible && wasVisible) {
        wasVisible = false;
        this.onClose();
      }
      this.$scope.$applyAsync();
    }, false);
  }
}

function SidebarJSDirective(action) {
  return {
    /* @ngInject */
    controller(SidebarJS) {
      this.SidebarJS = SidebarJS;
    },
    link(scope, elem, attrs, ctrl) {
      if (!ctrl.SidebarJS.elemHasListener(elem[0])) {
        const sidebarName = attrs[`sidebarjs${action.charAt(0).toUpperCase() + action.slice(1)}`];
        elem[0].addEventListener('click', () => ctrl.SidebarJS[action](sidebarName));
        ctrl.SidebarJS.elemHasListener(elem[0], true);
      }
    },
  };
}

angular
  .module('ngSidebarJS', [])
  .service('SidebarJS', SidebarService)
  .component('sidebarjs', {
    template: '<div sidebarjs-container ng-transclude></div><div sidebarjs-background></div>',
    transclude: true,
    controller: SidebarJSCtrl,
    bindings: {
      onOpen: '&?',
      onClose: '&?',
      sidebarjsConfig: '<?',
      sidebarjsName: '@?',
    },
  })
  .directive('sidebarjsOpen', SidebarJSDirective.bind(null, 'open'))
  .directive('sidebarjsClose', SidebarJSDirective.bind(null, 'close'))
  .directive('sidebarjsToggle', SidebarJSDirective.bind(null, 'toggle'));
