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
    },
    delete: {
      action: 'destroy',
      method: 'DELETE',
      url: '/api/events/:id.json',
      params: {
        id: '@id'
      }
    },
    sort: {
      action: 'index',
      method: 'GET',
      isArray: true,
      url: '/api/events.json',
      params: {
        sort_by: '@sort_by',
        order: '@order'
      }
    }
  });
}]);
