function AppCtrl(SidebarJS) {
  this.toggleSidebarJS = toggleSidebarJS;
  this.sidebarIsVisible = isVisibleSidebarJS;
  this.onSidebarOpen = onSidebarOpen;
  this.onSidebarClose = onSidebarClose;
  this.changePosition = changePosition;

  function toggleSidebarJS(sidebarName) {
    SidebarJS.toggle(sidebarName);
  }

  function isVisibleSidebarJS(sidebarName) {
    return SidebarJS.isVisible(sidebarName);
  }

  function onSidebarOpen() {
    console.log('is open!');
  }

  function onSidebarClose() {
    console.log('is close!');
  }

  function changePosition(newPosition) {
    SidebarJS.setPosition(newPosition);
  }
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
