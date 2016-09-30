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
          <a href="https://github.com/SidebarJS/sidebarjs"><div class="img github"></div>Github</a>
          <a href="https://www.npmjs.com/package/sidebarjs"><div class="img npm"></div>npm</a>
          <a href="https://github.com/lorenzodianni"><div class="img author"></div>Author</a>
        </div>
        <div>
          <a href="https://github.com/SidebarJS/sidebarjs/wiki/Setup"><div class="img wiki"></div>Wiki</a>
          <a href="https://github.com/SidebarJS/sidebarjs/issues"><div class="img bugs"></div>Bugs</a>
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
