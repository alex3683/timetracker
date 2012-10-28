define( [ 'angular',
          './controllers/TimeTrackerController',
          './controllers/TrackerController'
], function( angular ) {
   'use strict';

   return angular.module( 'timetracker', [ 'controllers.TimeTrackerController', 'controllers.TrackerController' ] );

} );