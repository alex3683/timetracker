(function( exports ) {
   'use strict';

   var Alfred = require( 'alfred' );
   var Q = require( 'Q' );

   exports.init = function( dbDir ) {
      var deferred = Q.defer();

      Alfred.open( dbDir, function( err, db ) {
         if( err ) {
            throw err;
         }

         if( !db.User ) {
            defineUser( db );
         }

         if( !db.TrackedTime ) {
            defineTrackedTime( db );
         }

         deferred.resolve( db );

      } );

      return deferred.promise;
   };

   function defineUser( db ) {
      var User = db.define( 'User' );
      User.property( 'name', 'string', {
         minLength: 3,
         maxLength: 20
      } );
      User.property( 'deleted', 'boolean', {
         optional: false
      } );

      User.index( 'deleted', function( user ) {
         return user.deleted;
      } );
      User.index( 'name', function( user ) {
         return user.name;
      } );
   }

   function defineTrackedTime( db ) {
      var TrackedTime = db.define( 'TrackedTime' );
      TrackedTime.property( 'comment', 'string' );
      TrackedTime.property( 'startTime', 'number', {
         optional: false
      } );
      TrackedTime.property( 'endTime', 'number', {
         optional: false
      } );
      TrackedTime.property( 'userName', 'string', {
         optional: false
      } );
      TrackedTime.property( 'deleted', 'boolean', {
         optional: false
      } );

      TrackedTime.index( 'userName', function( trackedTime ) {
         return trackedTime.userName;
      } );
   }

})( exports );
