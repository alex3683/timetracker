(function() {
   'use strict';

   var winston = require( 'winston' );
   var express = require( 'express' );

   var logger = new (winston.Logger)( {
      transports: [
         new winston.transports.File( { filename: 'var/server.log', maxSize: 1024 * 1024 } ),
         new winston.transports.Console()
      ]/*,
      exceptionHandlers: [
         new winston.transports.File( { filename: 'var/exceptions.log', maxSize: 1024 * 1024 } ),
         new winston.transports.Console()
      ]*/
   } );
   logger.exitOnError = true;

   logger.info( 'Starting timetracker' );

   var app = express();

   app.set( 'port', 8080 );
   app.use( express.static( __dirname + '/web' ) );

   app.listen( app.get( 'port' ) );

   var store = require( './lib/store' );
   store.init( __dirname + '/db/timetracker', logger ).then( function( db ) {

      var u = db.users.save( 'Peter', { name: 'Peter2', deleted: false }, function( err, key ) {
         if( err ) {
            logger.error( err );
            return;
         }
         logger.info( 'created user' );
      } );

      require( './lib/rest_api/api' ).init( app, db, logger );

   },function( e ) {

      logger.error( 'Error: ', e );

   } ).fail( function( e ) {
         logger.error( e );
      } );

})();
