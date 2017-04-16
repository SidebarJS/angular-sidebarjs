function AppCtrl(SidebarJS) {
  this.toggleSidebarJS = SidebarJS.toggle;
  this.sidebarIsVisible = SidebarJS.isVisible;
  this.onSidebarOpen = onSidebarOpen;
  this.onSidebarClose = onSidebarClose;
  this.changePosition = changePosition;

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
