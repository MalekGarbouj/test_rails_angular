var app = angular.module('angularExample');

app.factory('Event', ['$resource', function($resource) {
  return $resource('/api/events/:id.json', { id: '@id' }, {
    update: { method: 'PUT' },
    search: {
      method: 'GET',
      isArray: true,
      url: '/api/events/search.json',
      params: {
        query: '@query'
      }
    }
  });
}]);