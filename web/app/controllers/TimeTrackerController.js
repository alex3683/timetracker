( function( timetracker ) {
    'use strict';
    
    var CURRENT_DATA_VERSION = 1;
    
    timetracker.controller( 'TimeTrackerController', function( $scope ) {
        
        $scope.undoStack = [];
        
        $scope.times = [];
        $scope.runningTimer = null;
        
        $scope.times = JSON.parse( window.localStorage.times || '[]', function ( key, value ) {
            if( key === 'dateFrom' || key === 'dateTo' ) {
                return new Date(value);
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
        
        $scope.startTimeTracker = function() {
            $scope.runningTimer = {
                'dateFrom': new Date(),
                'dateTo': null,
                'duration': null,
                'comment': ''
            };
        };
        
        $scope.stopTimeTracker = function() {
            var time = $scope.runningTimer;
            $scope.runningTimer = null;
            
            time.dateTo = new Date();
            time.duration = calculateDuration(time.dateFrom, time.dateTo);
            
            addTime(time);
        };
        
        $scope.deleteTime = function(time) {
            var index = $scope.times.indexOf(time);
            // TODO: set a limit for the undo stack to prevent leaking memory
            // when the app is never reopened / refreshed.
            $scope.undoStack.push( $scope.times[ index ] );
            $scope.times.splice( index, 1 );
            
            window.localStorage.times = JSON.stringify( $scope.times );
        };
        
        $scope.undo = function() {
            addTime( $scope.undoStack.pop() );
        };
        
        function addTime(time) {
            $scope.times.push( time );
            window.localStorage.times = JSON.stringify( $scope.times );
        }
        
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
        
    } );
    
} )( window.timetracker );