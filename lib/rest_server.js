(function( exports ) {
   'use strict';

   var _app;
   var _db;

   exports.init = function( app, db ) {

      _app = app;
      _db = db;

      app.get( '/api', getApi );
      app.get( '/api/users', getUsers );
      app.get( '/api/users/:userName', getUser );

   };

   function getApi( req, res ) {
      res.json( {
                   users: {
                      selfLink: '/api/users'
                   }
                } );
   }

   function getUsers( req, res ) {
      _db.User.find( { deleted: { $eq: false } } ).all( function( users ) {
         res.json( users );
      } );
   }

   function getUser( req, res ) {
      var userName = req.params.userName;

      _db.User.find( { name: { $eq: userName } } ).all( function( users ) {
         if( users.length ) {
            res.json( users[ 0 ] );
         }
         else {
            res.status( 404 );
         }
      } );
   }

})( exports );
