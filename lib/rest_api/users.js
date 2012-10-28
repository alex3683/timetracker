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

   app.get( '/api/users', getUsers );
   //      app.post( '/api/users', addUser );

   app.get( '/api/users/:userName', getUser );
   //      app.put( '/api/users/:userName', updateUser );
   //      app.delete( '/api/users/:userName', deleteUser );

}


function getUsers( req, res ) {

   _db.users.find( { deleted: false }, function( err, users ) {
      helpers.sendResponse( req, res, _.map( users, function( user, key ) {
         return makeUserEntity( req, user );
      } ) );
   } );
}


function getUser( req, res ) {
   var userName = req.params.userName;

   _db.users.find( { name: userName, deleted: false }, function( err, users ) {
      if( _.size( users ) > 0 ) {
         var user = users[ _.keys( users )[ 0 ] ];
         helpers.sendResponse( req, res, makeUserEntity( req, user ) );
      }
      else {
         res.status( 404 );
      }
   } );
}


function makeUserEntity( req, user ) {
   return {
      name: user.name,
      links: [
         helpers.createLink( helpers.uriFromHere( req, user.name ), 'self' )
      ]
   };
}