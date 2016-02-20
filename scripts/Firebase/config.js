angular.module('cmsApp.config', [])
  .constant('FBURL', 'https://krono-dev.firebaseio.com/v1/')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password', 'anonymous', 'facebook', 'google', 'twitter', 'github'])
  .constant('AuthToken', 'ugORSfXSSwQ4QNkXPIjyPomD9wXnpcxZSZdKEHhO')
  .constant('loginRedirectPath', '/login');
