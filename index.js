( function () {
   'use strict';

   var express = require( 'express' );
   var app = express();

   app.use( express.static( __dirname + '/web' ) );

   app.listen( 8080 );

   var store = require( './lib/store' );
   store.init( __dirname + '/db/timetracker' ).then( function( db ) {
      require( './lib/rest_server' ).init( app, db );
   } );

} )();
