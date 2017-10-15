'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/wx', 'home.match');
  app.get('/test', 'home.test');
  app.get('/kf', 'home.kf');
  app.get('/access_token', 'home.access_token');
  app.get('/menu', 'home.menu');  
  app.get('Handle', 'home.match');
  app.post('/wx', 'home.post');
};


