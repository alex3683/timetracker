'use strict';

var _ = require( 'underscore' );
var helpers = require( './helpers' );

exports.init = init;

var _app;
var _db;
var _logger;


function init( app, db, logger ) {
   logger.info( 'initializing rest api' );

   helpers.init( app );
   _app = app;
   _db = db;
   _logger = logger;

   app.get( '/api', getApi );

   require( './users' ).init( app, db, logger );
}


function getApi( req, res ) {
   helpers.sendResponse( req, res, {
      links: [
         helpers.createLink( helpers.uriFromHere( req, 'users' ), 'users', 'Lists all users' )
      ]
   } );
}
