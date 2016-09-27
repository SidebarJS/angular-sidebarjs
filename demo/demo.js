'use strict';

angular
.module('Demo', [
  'angular-sidebarjs'
])
.component('app', {
  controller: function() {
    this.showElem = () => this.elemIsVisible = !this.elemIsVisible;
  },
  template: `
    <button sidebarjs-toggle>toggle sidebarjs</button>
    <sidebarjs>
      <div ng-click="$ctrl.showElem()">Toggle my element</div>
    </sidebarjs>

    <div ng-if="$ctrl.elemIsVisible">My Element</div>
  `
});
