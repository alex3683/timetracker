'use strict';

var nStore = require( 'nstore' ).extend( require( 'nstore/query' )() );
var Q = require( 'Q' );

exports.init = init;

var _logger;


function init( dbDir, logger ) {
   if( typeof dbDir !== 'string' ) {
      throw new Error( 'dbDir needs to be given as string but was ' + dbDir );
   }
   if( !logger || typeof logger.info !== 'function' ) {
      throw new Error( 'logger needs to be given' );
   }

   logger.info( 'initializing object store' );

   _logger = logger;

   var deferred = Q.defer();
   Q.all( [
      createDataBase( 'db/users.db' ),
      createDataBase( 'db/tasks.db' )
   ] ).then( function( args ) {
         deferred.resolve( {
            users: args[ 0 ],
            tasks: args[ 1 ],
            nStore: nStore
         } );
      } );

   return deferred.promise;
}


function createDataBase( dbName ) {
   var deferred = Q.defer();
   nStore.new( dbName, function( err, db ) {
      if( err ) {
         deferred.reject( err );
         return;
      }

      deferred.resolve( db );
   } );

   return deferred.promise;
}
