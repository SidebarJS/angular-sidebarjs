/* eslint import/no-unresolved: 0 */
import {SidebarService} from 'sidebarjs';
import '~core/sidebarjs.css';

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
    const userConfig = this.sidebarjsConfig || {};
    const onChangeVisibility = this.onChangeVisibility || userConfig.onChangeVisibility;
    const config = {
      ...userConfig,
      component: this.elem,
      container: this.elem.children[0],
      backdrop: this.elem.children[1],
      onOpen: this.onOpen || userConfig.onOpen,
      onClose: this.onClose || userConfig.onClose,
      onChangeVisibility: (changes) => {
        if (onChangeVisibility) {
          onChangeVisibility({$event: changes});
        }
        this.$scope.$applyAsync();
      },
    };
    this.SidebarJS.create(config);
  }

  $onDestroy() {
    this.SidebarJS.destroy(this.sidebarjsName);
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
    template: '<div sidebarjs-container ng-transclude></div><div sidebarjs-backdrop></div>',
    transclude: true,
    controller: SidebarJSCtrl,
    bindings: {
      onOpen: '&?',
      onClose: '&?',
      onChangeVisibility: '&?',
      sidebarjsConfig: '<?',
      sidebarjsName: '@?',
    },
  })
  .directive('sidebarjsOpen', SidebarJSDirective.bind(null, 'open'))
  .directive('sidebarjsClose', SidebarJSDirective.bind(null, 'close'))
  .directive('sidebarjsToggle', SidebarJSDirective.bind(null, 'toggle'));
