'use strict';

const App = {
  controller: function(SidebarJS) {
    this.toggleSidebarJS = function() {
      SidebarJS.toggle();
    };
  },
  controllerAs: 'app',
  template: `
    <header>
      <div class="icon hamburger-icon" sidebarjs-toggle></div>
      <h1>Angular SidebarJS</h1>
    </header>

    <sidebarjs>
      <h3>Angular SidebarJS</h3>
      <nav>
        <div>
          <a sidebarjs-toggle href="https://github.com/SidebarJS/angular-sidebarjs" target="_blank"><div class="img github"></div>Github</a>
          <a sidebarjs-toggle href="https://www.npmjs.com/package/angular-sidebarjs" target="_blank"><div class="img npm"></div>npm</a>
          <a sidebarjs-toggle href="https://github.com/lorenzodianni" target="_blank"><div class="img author"></div>Author</a>
        </div>
        <div>
          <a sidebarjs-toggle href="https://github.com/SidebarJS/angular-sidebarjs/blob/master/README.md" target="_blank"><div class="img wiki"></div>Wiki</a>
          <a sidebarjs-toggle href="https://github.com/SidebarJS/angular-sidebarjs/issues" target="_blank"><div class="img bugs"></div>Bugs</a>
        </div>
      </nav>
    </sidebarjs>

    <main>
      <div ng-click="app.toggleSidebarJS()">Toggle via javascript</div>
    </main>
  `
};

angular
.module('Demo', ['angular-sidebarjs'])
.component('app', App);
