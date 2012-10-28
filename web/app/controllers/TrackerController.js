define( [ 'angular' ], function( angular ) {
   'use strict';

   var module = angular.module( 'controllers.TrackerController', [] );

   module.controller( 'TrackerController', [ '$scope', function( $scope ) {

      $scope.runningTimer = null;


      $scope.showModal = false;

      $scope.modalDialogOptions = {
         backdrop: 'static',
         escape: false
      };

      $scope.startTracker = function() {
         $scope.runningTimer = {
            'dateFrom': new Date(),
            'dateTo': null,
            'duration': null,
            'comment': ''
         };

         $scope.showModal = true;
      };

      $scope.discard = function() {
         $scope.runningTimer = null;
         $scope.showModal = false;
      };

      $scope.save = function() {
         var time = $scope.runningTimer;
         $scope.runningTimer = null;

         time.dateTo = new Date();
         time.duration = calculateDuration( time.dateFrom, time.dateTo );

         $scope.$emit( 'timeTracked', time );
         $scope.discard();
      };

      var MINUTE_SECONDS = 60;
      var HOUR_SECONDS = MINUTE_SECONDS * 60;
      var DAY_SECONDS = HOUR_SECONDS * 24;

      function calculateDuration( dateFrom, dateTo ) {
         var diff = dateTo.getTime() - dateFrom.getTime();
         diff = Math.round( diff / 1000 ); // don't care for milliseconds

         var days = diff > DAY_SECONDS ? Math.floor( diff / DAY_SECONDS ) : 0;
         diff -= days * DAY_SECONDS;

         var hours = diff > HOUR_SECONDS ? Math.floor( diff / HOUR_SECONDS ) : 0;
         diff -= hours * HOUR_SECONDS;

         var minutes = diff > MINUTE_SECONDS ? Math.floor( diff / MINUTE_SECONDS ) : 0;

         var seconds = diff - minutes * MINUTE_SECONDS;

         return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
         };
      }

   } ] );

   return module;

} );