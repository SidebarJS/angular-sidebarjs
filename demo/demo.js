function AppCtrl(SidebarJS) {
  this.toggleSidebarJS = function toggleSidebarJS(sidebarName) {
    SidebarJS.toggle(sidebarName);
  };

  this.isVisibleSidebarJS = function isVisibleSidebarJS(sidebarName) {
    return SidebarJS.isVisible(sidebarName);
  };

  this.onSidebarOpen = function onSidebarOpen() {
    console.log('is open!');
  };

  this.onSidebarClose = function onSidebarClose() {
    console.log('is close!');
  };

  this.onSidebarChangeVisibility = function onSidebarChangeVisibility(event) {
    console.log(event);
  };
}

angular
  .module('Demo', ['ngSidebarJS'])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .component('app', {
    controller: ['SidebarJS', AppCtrl],
    controllerAs: 'app',
    templateUrl: './app.template.html',
  });
