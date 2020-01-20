var app = angular.module('angularExample');

app.controller('EventsCtrl', ['$scope', 'Event', function($scope, Event) {
  $scope.events = Event.query();
  $scope.editing = {};
  $scope.sorting = {
    sort_by: 'name',
    order: 'asc'
  }

  $scope.addEvent = function() {
    if (!valid()) { return false; }

    Event.save($scope.event,
      function(response, _headers) {
        $scope.events.push(response);
      },
      function(response) {
        alert('Errors: ' + response.data.errors.join('. '));
      }
    );

    $scope.event = {};
  };

  $scope.filterEvents = function() {
    Event.search({query: $scope.search},
      function(response, _headers) {
        $scope.events = response;
      }
    );
  };

  $scope.toggleForm = function(event) {
    if (event.id === $scope.editing.id) {
      return 'form';
    }
    else {
      return 'row';
    }
  };

  $scope.editEvent = function(event) {
    $scope.editing = angular.copy(event);
  };

  $scope.updateEvent = function(index) {
    Event.update($scope.editing,
      function(response, _headers) {
        $scope.events[index] = angular.copy($scope.editing);
        $scope.hideForm();
      },
      function(response) {
        alert('Errors: ' + reponse.data.errors.join('. '));
      }
    );
  };

  $scope.hideForm = function() {
    $scope.editing = {};
  };

  $scope.destroyEvent = function(event, index) {
    Event.delete(event,
      function(response, _headers) {
        $scope.events.splice(index, 1);
      }
    );
  };

  $scope.sortEvents = function(sort_by, order) {
    if ($scope.sorting.sort_by == sort_by) {
      order = (order == 'asc' ? 'desc' : 'asc');
    } else if ($scope.sorting.sort_by != sort_by) {
      order = 'asc';
    }
    Event.sort({ sort_by: sort_by, order: order },
      function(response, _headers) {
        $scope.events = response;
        $scope.sorting = {
          sort_by: sort_by,
          order: order
        }
      }
    );
  };

  $scope.updateArrowOrder = function() {
    $scope.order = $scope.sorting.order == 'asc' ? 'up' : 'down';
  };

  $scope.updateArrowOrder();

  $scope.$watch('sorting.order', function(oldVal, newVal) {
    $scope.updateArrowOrder();
  });

  valid = function() {
    return !!$scope.event &&
      !!$scope.event.name && !!$scope.event.event_date &&
      !!$scope.event.description && !!$scope.event.place;
  }
  
}]);


