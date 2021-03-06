define( [ 'angular' ], function( angular ) {
   'use strict';

   var CURRENT_DATA_VERSION = 1;

   var module = angular.module( 'controllers.TimeTrackerController', [] );

   module.controller( 'TimeTrackerController', [ '$scope', function( $scope ) {

      $scope.undoStack = [];


      $scope.startTracker = function() {

         $scope.showModal = true;
      };

      $scope.times = [];

      $scope.times = JSON.parse( window.localStorage.times || '[]', function( key, value ) {
         if( key === 'dateFrom' || key === 'dateTo' ) {
            return new Date( value );
         }
         return value;
      } );

      console.log( $scope.times );

      if( !window.localStorage.dataVersion ) {
         window.localStorage.dataVersion = CURRENT_DATA_VERSION;
      }

      if( window.localStorage.dataVersion != CURRENT_DATA_VERSION ) {
         console.warn( "Implement updating old data version to new" );
      }

      $scope.$on( 'timeTracked', function( event, time ) {
         $scope.times.push( time );
         window.localStorage.times = JSON.stringify( $scope.times );
      } );

      $scope.deleteTime = function( time ) {
         var index = $scope.times.indexOf( time );
         // TODO: set a limit for the undo stack to prevent leaking memory
         // when the app is never reopened / refreshed.
         $scope.undoStack.push( $scope.times[ index ] );
         $scope.times.splice( index, 1 );

         window.localStorage.times = JSON.stringify( $scope.times );
      };

      $scope.undo = function() {
         $scope.times.push( $scope.undoStack.pop() );
         window.localStorage.times = JSON.stringify( $scope.times );
      };

   } ] );

   return module;

} );