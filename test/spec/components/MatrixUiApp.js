'use strict';

describe('MatrixUiApp', () => {
  let React = require('react/addons');
  let MatrixUiApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MatrixUiApp = require('components/MatrixUiApp.js');
    component = React.createElement(MatrixUiApp);
  });

  it('should create a new instance of MatrixUiApp', () => {
    expect(component).toBeDefined();
  });
});
