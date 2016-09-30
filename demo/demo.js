'use strict';

angular
.module('Demo', [
  'ui.router',
  'angular-sidebarjs'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      template: '<home></home>'
    })
    .state('about', {
      url: '/about',
      template: '<about></about>'
    });
})
.component('app', {
  controller: function(SidebarJS) {
    this.clickLink = function() {
      SidebarJS.close();
    };
  },
  template: `
    <button sidebarjs-toggle>toggle sidebarjs</button>
    <sidebarjs>
      <button sidebarjs-toggle>toggle again</button>
      <nav>
        <a ui-sref="home" ng-click="$ctrl.clickLink()">Home</a>
        <a ui-sref="about" ng-click="$ctrl.clickLink()">About</a>
      </nav>
    </sidebarjs>
    <div ui-view></div>
  `
})
.component('home', {
  controller: function() {
    this.title = 'Home Page';
  },
  template: `
    <h1>{{$ctrl.title}}</h1>
    <button sidebarjs-toggle>toggle view</button>
  `
})
.component('about', {
  controller: function() {
    this.title = 'About Page';
  },
  template: `
    <h1>{{$ctrl.title}}</h1>
    <button sidebarjs-toggle>toggle view</button>
  `
});
